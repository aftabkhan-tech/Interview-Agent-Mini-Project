import crypto from "node:crypto";
import redis from "../../../shared/redis/redis.js";
import graph from "../graph/graph.js";
import Interview from "../models/interview.model.js";
import { followUpAgent } from "../agents/followup.agent.js";


export const startInterview = async (req, res) => {
    let generationLockKey;
    let generationLockToken;

    try {
        const userId = req.headers["x-user-id"];
        const { type, role, useResume = false, resume = {} } = req.body;

        if (!type || !role) {
            return res.status(400).json({
                success: false,
                message: "Interview type and role are required",
            });
        }

        const normalizedType = String(type).trim().toLowerCase();
        const normalizedRole = String(role).trim().replace(/\s+/g, " ");

        if (!["hr", "technical"].includes(normalizedType) || !normalizedRole) {
            return res.status(400).json({
                success: false,
                message: "A valid interview type and role are required",
            });
        }

        // Serialize question generation for the same role/type so parallel users
        // cannot both build a set from the same stale question history.
        const roleLockPart = encodeURIComponent(normalizedRole.toLowerCase());
        generationLockKey = `interview-question-generation:${normalizedType}:${roleLockPart}`;
        generationLockToken = crypto.randomUUID();
        const lockAcquired = await redis.set(
            generationLockKey,
            generationLockToken,
            "EX",
            180,
            "NX"
        );

        if (lockAcquired !== "OK") {
            return res.status(409).json({
                success: false,
                message: "Another interview for this role is starting. Please try again in a few seconds.",
            });
        }

        const escapedRole = normalizedRole.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const previousInterviews = await Interview.find({
            type: normalizedType,
            role: { $regex: `^${escapedRole}$`, $options: "i" },
        })
            .sort({ createdAt: -1 })
            .limit(20)
            .select("questions.question")
            .lean();

        let excludedQuestions = previousInterviews.flatMap((item) =>
            (item.questions || []).map((question) => question.question).filter(Boolean)
        );
        const normalizeQuestion = (question) =>
            String(question).trim().replace(/\s+/g, " ").toLowerCase();

        let result;
        let hasUniqueQuestions = false;

        // Retry if the model ignores the blacklist. Never save an exact repeat.
        for (let attempt = 0; attempt < 3; attempt++) {
            result = await graph.invoke({
                action: "start",
                role: normalizedRole,
                type: normalizedType,
                useResume,
                resume,
                excludedQuestions,
            });

            const generatedQuestions = result.questions;
            if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
                break;
            }

            const seenQuestions = new Set(excludedQuestions.map(normalizeQuestion));
            hasUniqueQuestions = generatedQuestions.every((question) => {
                if (!question?.question) return false;
                const normalizedQuestion = normalizeQuestion(question.question);
                if (seenQuestions.has(normalizedQuestion)) return false;
                seenQuestions.add(normalizedQuestion);
                return true;
            });

            if (hasUniqueQuestions) break;
            excludedQuestions = excludedQuestions.concat(
                generatedQuestions.map((question) => question?.question).filter(Boolean)
            );
        }

        const questions = result?.questions;
        if (!hasUniqueQuestions || !questions?.length) {
            return res.status(503).json({
                success: false,
                message: "Could not generate a fresh set of questions. Please try again.",
            });
        }

        const interview = await Interview.create({
            userId,
            type: normalizedType,
            role: normalizedRole,
            useResume,
            questions,
            currentQuestion: 0,
            status: "in-progress",
        });

        await redis.del(`interviews:${userId}`);

        return res.status(200).json({
            success: true,
            interviewId: interview._id,
            currentQuestion: 0,
            totalQuestions: interview.questions.length,
            question: interview.questions[0],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    } finally {
        if (generationLockKey && generationLockToken) {
            try {
                await redis.eval(
                    "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",
                    1,
                    generationLockKey,
                    generationLockToken
                );
            } catch (error) {
                console.error("Could not release interview question generation lock:", error);
            }
        }
    }
}

export const submitAnswer = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const { interviewId, answer } = req.body;

        if (!interviewId || typeof answer !== "string" || !answer.trim()) {
            return res.status(400).json({
                success: false,
                message: "Interview Id and Answer are required",
            });
        }

        const interview = await Interview.findOne({ _id: interviewId, userId });
        if (!interview) {
            return res.status(404).json({ success: false, message: "Interview not found" });
        }
        if (interview.status === "completed") {
            return res.status(400).json({ success: false, message: "Interview already completed" });
        }

        const index = interview.currentQuestion;
        const currentQuestion = interview.questions[index];
        if (!currentQuestion) {
            return res.status(400).json({ success: false, message: "Invalid question index" });
        }

        currentQuestion.userAnswer = answer.trim();

        // Follow-up questions are inserted directly after their main question.
        // Walk back to that main question to evaluate the whole answer thread.
        let mainQuestionIndex = index;
        while (mainQuestionIndex > 0 && interview.questions[mainQuestionIndex].isFollowUp) {
            mainQuestionIndex -= 1;
        }
        const questionThread = interview.questions.slice(mainQuestionIndex, index + 1);
        const followUpCount = questionThread.filter((item) => item.isFollowUp).length;
        const conversation = questionThread.map((item) =>
            `Interviewer: ${item.question}\nCandidate: ${item.userAnswer || "(not answered yet)"}`
        ).join("\n\n");

        let followUpDecision = { askFollowUp: false, question: "" };
        const maxFollowUpsPerQuestion = 4;
        if (followUpCount < maxFollowUpsPerQuestion) {
            followUpDecision = await followUpAgent({
                role: interview.role,
                type: interview.type,
                originalQuestion: interview.questions[mainQuestionIndex].question,
                conversation,
                followUpCount,
            });
        }

        if (followUpDecision.askFollowUp) {
            interview.questions.splice(index + 1, 0, {
                question: followUpDecision.question,
                difficulty: "medium",
                timer: 60,
                isFollowUp: true,
            });
        }

        const nextQuestionIndex = index + 1;
        const completed = nextQuestionIndex >= interview.questions.length;
        const result = await graph.invoke({
            action: "feedback",
            question: currentQuestion.question,
            answer: currentQuestion.userAnswer,
            difficulty: currentQuestion.difficulty,
            completed,
            role: interview.role,
            type: interview.type,
            questions: interview.questions,
        });

        currentQuestion.feedback = result.feedback;
        interview.currentQuestion = nextQuestionIndex;

        if (completed) {
            interview.status = "completed";
            interview.overallScore = result.report.overallScore;
            interview.summary = result.report.summary;
            interview.strengths = result.report.strengths;
            interview.weaknesses = result.report.weaknesses;
            interview.recommendations = result.report.recommendations;
            await interview.save();
            await redis.del(`interviews:${userId}`);

            return res.status(200).json({
                success: true,
                completed: true,
                interview,
                feedback: result.feedback,
                totalQuestions: interview.questions.length,
            });
        }

        await interview.save();
        await redis.del(`interviews:${userId}`);
        const nextQuestion = interview.questions[interview.currentQuestion];

        return res.status(200).json({
            success: true,
            completed: false,
            followUp: nextQuestion.isFollowUp,
            currentQuestion: interview.currentQuestion,
            totalQuestions: interview.questions.length,
            question: nextQuestion,
            feedback: result.feedback,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getInterview = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        const { id } = req.params

        const interview = await Interview.findOne({
            _id: id,
            userId
        })
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        return res.status(200).json({
            success: true,
            interview,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });
    }
}


export const getAllInterviews = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]

        const cache = await redis.get(`interviews:${userId}`)

        if (cache) {
            console.log("âœ… Data served from Redis")
            return res.status(200).json(JSON.parse(cache))
        }

        const interviews = await Interview.find({ userId }).sort({ createdAt: -1 })

        const completed = interviews.filter((item) => item.status === "completed")

        const totalQuestions = interviews.reduce((sum, item) => sum + item.questions.length, 0)

        const averageScore = completed.length > 0 ? Number(
            (completed.reduce((sum, item) => sum + item.overallScore, 0)) / completed.length).toFixed(1) : 0


        const stats = {
            totalInterviews: interviews.length,
            totalQuestions,
            completed: completed.length,
            averageScore
        }


        const getAverageData = (list) => {
            if (!list.length) {
                return [
                    { skill: "Correctness", score: 0 },
                    { skill: "Clarity", score: 0 },
                    { skill: "Relevance", score: 0 },
                    { skill: "Detail", score: 0 },
                    { skill: "Efficiency", score: 0 },
                    { skill: "Communication", score: 0 },
                    { skill: "Problem solving", score: 0 },
                    { skill: "Creativity", score: 0 },
                ];
            }

            const total = {
                correctness: 0,
                clarity: 0,
                relevance: 0,
                detail: 0,
                efficiency: 0,
                communication: 0,
                problemSolving: 0,
                creativity: 0,
            }

            list.forEach((interview) => {
                interview.questions.forEach((q) => {
                    total.correctness += q.feedback?.correctness || 0;
                    total.clarity += q.feedback?.clarity || 0;
                    total.relevance += q.feedback?.relevance || 0;
                    total.detail += q.feedback?.detail || 0;
                    total.efficiency += q.feedback?.efficiency || 0;
                    total.communication += q.feedback?.communication || 0;
                    total.problemSolving += q.feedback?.problemSolving || 0;
                    total.creativity += q.feedback?.creativity || 0;

                })
            })

            const count = list.reduce((sum, item) => sum + item.questions.length, 0)

            if (count === 0) {
                return [
                    { skill: "Correctness", score: 0 },
                    { skill: "Clarity", score: 0 },
                    { skill: "Relevance", score: 0 },
                    { skill: "Detail", score: 0 },
                    { skill: "Efficiency", score: 0 },
                    { skill: "Communication", score: 0 },
                    { skill: "Problem solving", score: 0 },
                    { skill: "Creativity", score: 0 },
                ];
            }


            return [
                {
                    skill: "Correctness",
                    score: Math.round(total.correctness / count)
                },
                {
                    skill: "Clarity",
                    score: Math.round(total.clarity / count),
                },

                {
                    skill: "Relevance",
                    score: Math.round(total.relevance / count),
                },

                {
                    skill: "Detail",
                    score: Math.round(total.detail / count),
                },

                {
                    skill: "Efficiency",
                    score: Math.round(total.efficiency / count),
                },

                {
                    skill: "Communication",
                    score: Math.round(total.communication / count),
                },

                {
                    skill: "Problem solving",
                    score: Math.round(total.problemSolving / count),
                },

                {
                    skill: "Creativity",
                    score: Math.round(total.creativity / count),
                },


            ]
        }

            const technicalInterviews = completed.filter((item) => item.type === "technical")

            const HrInterviews = completed.filter((item) => item.type === "hr")


            const technicalData = getAverageData(technicalInterviews)

            const hrData = getAverageData(HrInterviews)

            const technicalCount = technicalInterviews.length

            const hrCount = HrInterviews.length

            const payload = {
                success: true,
                interviews,
                stats,
                technicalData,
                hrData,
                technicalCount,
                hrCount,
            }

            await redis.set(`interviews:${userId}`, JSON.stringify(payload), "EX", 600)


            return res.status(200).json(payload);

        


    } catch (error) {
        console.log(error)
        return res.status(500).json({

            success: false,

            message: error.message,

        });
    }
}






