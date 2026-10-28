

// pdf  ---->  pdf Storage  ---> text ---> llm ---> agent ---> promt ---> data ---> save mongoDb ---> redis -->pdf delete ---> resume data ( score , missing skills , recommen.)

import redis from "../../../shared/redis/redis.js";
import { resumeAgent } from "../agents/resume.agent.js";
import extractText from "../config/pdf.js";
import Resume from "../models/resume.model.js";
import fs from "fs"

const createFallbackAnalysis = (resumeText) => {
    const text = resumeText.replace(/\s+/g, " ").trim();
    const lines = resumeText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
    const phone = text.match(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3,5}\)?[\s-]?)?\d{5}[\d\s-]{4,}/)?.[0]?.trim() ?? "";
    const skillTerms = [
        "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL", "SQL", "Redis",
        "Python", "Java", "C++", "C#", ".NET", "Spring", "Go", "Rust", "PHP", "Laravel", "Ruby", "HTML", "CSS", "Tailwind", "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP",
        "Figma", "UI/UX", "User Research", "Excel", "Power BI", "Tableau", "Data Analysis", "Machine Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Jest", "Cypress", "Selenium", "Agile", "Scrum",
    ];
    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const skills = skillTerms.filter((skill) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(skill)}($|[^a-z0-9])`, "i").test(text));
    const hasEducation = /\b(education|university|college|b\.?tech|bachelor|master|degree)\b/i.test(text);
    const hasProjects = /\b(project|github|portfolio)\b/i.test(text);
    const hasExperience = /\b(experience|internship|employment history|work history|worked at|work experience)\b/i.test(text);
    const hasSummary = /\b(summary|profile|objective|about)\b/i.test(text);
    const summary = text.match(/(?:professional\s+)?(?:summary|profile|objective)\s*[:\-]?\s*(.{30,500}?)(?=\b(?:experience|education|skills|projects)\b|$)/i)?.[1]?.trim() ?? "";
    const hasMetrics = /(?:\d+(?:\.\d+)?\s?%|\d+\s?(?:x|users?|customers?|clients?|projects?|years?|revenue|sales)\b)/i.test(text);
    const suggestedRole = skills.some((skill) => /react|javascript|typescript|html|css/i.test(skill))
        ? "Frontend Developer"
        : skills.some((skill) => /node|express|mongodb|sql|java|spring/i.test(skill))
            ? "Backend Developer"
            : skills.some((skill) => /python|machine learning|tensorflow|pytorch|pandas/i.test(skill))
                ? "Data / ML Professional"
                : skills.some((skill) => /figma|ui\/ux|user research/i.test(skill))
                    ? "Product Designer"
                    : skills.length ? "Software Developer" : "General Professional";
    const roleSkills = suggestedRole === "Frontend Developer" ? ["TypeScript", "Accessibility", "Jest", "Cypress"]
        : suggestedRole === "Backend Developer" ? ["REST API", "PostgreSQL", "Docker", "Testing"]
            : suggestedRole === "Data / ML Professional" ? ["Python", "SQL", "Machine Learning", "Data visualization"]
                : suggestedRole === "Product Designer" ? ["Figma", "Prototyping", "User Research", "Design systems"]
                    : ["Role-specific skills", "Relevant tools", "Certifications"];
    const missingSkills = roleSkills.filter((skill) => !text.toLowerCase().includes(skill.toLowerCase())).slice(0, 3);
    const recommendations = [
        ...(hasSummary ? ["Tailor your summary to the target role and its key requirements."] : ["Add a short professional summary for your target role."]),
        ...(hasProjects ? (hasMetrics ? [] : ["Add measurable results to your projects and experience."]) : ["Add a relevant project and explain your contribution."]),
        ...(missingSkills.length ? ["For " + suggestedRole + ", consider adding " + missingSkills.slice(0, 2).join(" and ") + "."] : []),
        ...(!email ? ["Add a professional email address to your contact details."] : []),
    ].slice(0, 4);
    const score = Math.min(100, 25 + (email ? 10 : 0) + (phone ? 5 : 0)
        + Math.min(skills.length * 4, 20) + (hasEducation ? 10 : 0)
        + (hasProjects ? 15 : 0) + (hasExperience ? 10 : 0) + (hasSummary ? 5 : 0) + (hasMetrics ? 7 : 0));

    return {
        name: lines.find((line) => line.length >= 3 && line.length <= 55 && /^[\p{L}][\p{L} .'-]+$/u.test(line) && !/@|https?:|www\.|\d{5,}|resume|curriculum vitae|developer|engineer|manager|student|contact|profile/i.test(line)) ?? "Candidate",
        email,
        phone,
        summary,
        skills,
        projects: hasProjects ? lines.filter((line) => /project|portfolio|github/i.test(line) && line.length < 260).slice(0, 8) : [],
        education: hasEducation ? lines.filter((line) => /university|college|b\.?tech|bachelor|master|degree|diploma/i.test(line) && line.length < 260).slice(0, 8) : [],
        experience: hasExperience ? lines.filter((line) => /intern|developer|engineer|manager|experience|20\d{2}/i.test(line) && line.length < 260).slice(0, 10) : [],
        strengths: [
            ...(skills.length ? [`${skills.length} technical skills detected`] : []),
            ...(skills.length ? ["Relevant skills found: " + skills.slice(0, 4).join(", ")] : []),
            ...(hasProjects ? ["Project details are included"] : []),
            ...(hasExperience ? ["Professional experience is included"] : []),
            ...(hasEducation ? ["Education details are included"] : []),
            ...(hasMetrics ? ["Measurable results are included"] : []),
        ],
        weaknesses: [
            ...(email ? [] : ["Add a professional email address"]),
            ...(phone ? [] : ["Add a phone number"]),
            ...(hasSummary ? [] : ["Add a short summary for your target role"]),
            ...(hasExperience ? [] : ["Add relevant work or internship experience"]),
            ...(hasProjects ? [] : ["Add a relevant project and describe your contribution"]),
            ...(skills.length ? [] : ["Add skills and tools relevant to your target role"]),
            ...(hasMetrics ? [] : ["Add measurable outcomes to your experience or projects"]),
        ],
        missingSkills,
        suggestedRole,
        score,
        recommendations,
    };
};

const parseAnalysis = (response, resumeText) => {
    const text = String(response ?? "").trim();
    const json = text
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "")
        .match(/\{[\s\S]*\}/)?.[0];

    if (!json) {
        return createFallbackAnalysis(resumeText);
    }

    let analysis;
    try {
        analysis = JSON.parse(json);
    } catch {
        return createFallbackAnalysis(resumeText);
    }
    const toList = (value) => Array.isArray(value)
        ? value.map((item) => String(item).trim()).filter(Boolean)
        : [];
    const score = Number(analysis.score);

    const normalized = {
        name: String(analysis.name ?? "").trim(),
        email: String(analysis.email ?? "").trim(),
        phone: String(analysis.phone ?? "").trim(),
        summary: String(analysis.summary ?? "").trim(),
        skills: toList(analysis.skills),
        projects: toList(analysis.projects),
        education: toList(analysis.education),
        experience: toList(analysis.experience),
        strengths: toList(analysis.strengths),
        weaknesses: toList(analysis.weaknesses),
        missingSkills: toList(analysis.missingSkills),
        suggestedRole: String(analysis.suggestedRole ?? "").trim(),
        score: Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : 0,
        recommendations: toList(analysis.recommendations),
    };

    const hasGenericFeedback = normalized.recommendations.some((item) => [
        "Tailor keywords to the job description.",
        "Quantify project and experience outcomes with metrics.",
        "Keep the resume to a clear, ATS-friendly format.",
    ].includes(item)) || normalized.weaknesses.includes("Add projects with measurable outcomes")
        || normalized.missingSkills.includes("Add role-specific tools and frameworks");
    if (hasGenericFeedback) {
        return { ...normalized, ...createFallbackAnalysis(resumeText) };
    }

    if (!normalized.name && !normalized.summary && normalized.skills.length === 0) {
        return createFallbackAnalysis(resumeText);
    }

    return normalized;
};


export const uploadResume = async (req,res) => {
    const file = req.file;

    try {
        if(!file){
            return res.status(400).json({
                success:false,
                message:"Resume PDF is required"
            })
        }
        const userId = req.headers["x-user-id"];

          if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId is required"
            })
        }

        const resumeText = await extractText(file.path)

        if (!resumeText?.trim()) {
            const error = new Error("This PDF has no readable text. Please upload a text-based resume PDF.");
            error.status = 400;
            throw error;
        }

        const aiResponse = await resumeAgent(resumeText)

        const resumeData = parseAnalysis(aiResponse, resumeText)

        let resume = await Resume.findOne({userId})

        if(resume){
            Object.assign(resume,{
                ...resumeData,
                extractedText:resumeText

            }    
            )
            await resume.save()
        }else{
            resume = await Resume.create({
                userId,
                extractedText:resumeText,
                ...resumeData
            })
        }

        await redis.set(`resume:${userId}`,JSON.stringify(resume));

        await fs.unlinkSync(file.path);

        return res.status(200).json({
            success:true,
            message:"Resume analyzed successfully",
            data:resume
        })

        
    } catch (error) {
        console.log(error)

        if(file?.path && fs.existsSync(file.path)){
            await fs.unlinkSync(file.path);
        }
        return res.status(error.status || 500).json({
            success:false,
            message:error.message,
        })
        
    }
}


export const getResume = async (req,res) => {
    try {
        const userId = req.headers["x-user-id"];

    const cache = await redis.get(`resume:${userId}`)

    if(cache){
        return res.status(200).json({
            success:true,
            source:"redis",
            data:JSON.parse(cache)
        })
    }
    const resume = await Resume.findOne({userId})

    if(!resume){
        return res.status(404).json({
            success:false,
            message:"resume not found"
        })
    }

    await redis.set(`resume:${userId}`,JSON.stringify(resume));
   

     return res.status(200).json({
            success:true,
            source:"mongoDb",
            data:resume
        })
        
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    


}
