import { questionLLM } from "../config/llm.js";

export const followUpAgent = async ({ role, type, originalQuestion, conversation, followUpCount }) => {
    const prompt = `
You are an experienced ${type === "hr" ? "HR" : "technical"} interviewer interviewing a candidate for ${role}.

Main interview question:
${originalQuestion}

Conversation for this question so far:
${conversation}

The candidate has already received ${followUpCount} follow-up question(s) about this main question.

Decide whether the candidate has answered the main question sufficiently. Move on when the answer is clear, relevant, and adequately supported for a real interview. Ask another follow-up only when an important point is unclear, unsupported, incomplete, or needs a specific example. Do not probe just to keep talking.

If you need clarification, write exactly ONE concise follow-up that directly targets the missing or unclear point. Do not repeat any question already asked in this conversation. For technical interviews, probe a relevant concept, trade-off, edge case, or implementation detail. For HR interviews, probe the candidate's actions, reasoning, or outcome.

Return only valid JSON. If the candidate is sufficiently clear, use:
{"askFollowUp":false,"question":""}
If more detail is needed, use:
{"askFollowUp":true,"question":"..."}
`;

    try {
        const response = await questionLLM.invoke(prompt);
        const cleaned = String(response.content)
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();
        const parsed = JSON.parse(cleaned);

        if (typeof parsed.askFollowUp !== "boolean") {
            throw new Error("The model did not decide whether to ask a follow-up");
        }
        if (parsed.askFollowUp && (typeof parsed.question !== "string" || !parsed.question.trim())) {
            throw new Error("The model returned an empty follow-up question");
        }

        return {
            askFollowUp: parsed.askFollowUp,
            question: parsed.askFollowUp ? parsed.question.trim() : "",
        };
    } catch (error) {
        console.error("Follow-up decision failed:", error);
        throw new Error("Failed to evaluate the answer for a follow-up");
    }
};
