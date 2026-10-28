import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import llm from "../config/llm.js"

export const resumeAgent = async (resumeText) => {
    const response = await llm.invoke([
        new SystemMessage(`
You are an Expert ATS Resume Analyzer.

Analyze the given resume.

Extract the following information:

- Full Name
- Email
- Phone Number
- Professional Summary
- Technical Skills
- Projects
- Education
- Experience
- Strengths
- Weaknesses
- Missing Skills
- Suggested Job Role
- ATS Score (0-100)
- Recommendations

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do not use markdown.
3. Do not explain anything.
4. Do not add extra text.
5. Every field must exist.
6. Base every strength and weakness on details actually present or absent in this resume.
7. Make recommendations specific to this candidate's experience, projects, and detected role; do not reuse generic advice.
8. List missingSkills only when those skills are not already present in the resume, and make them relevant to the suggested role.
9. Do not infer a name from page headers, page numbers, or document labels. Use an empty name if it cannot be identified.
10. Do not invent contact details, achievements, experience, or qualifications.

Response Format:

{
  "name":"",
  "email":"",
  "phone":"",
  "summary":"",
  "skills":[],
  "projects":[],
  "education":[],
  "experience":[],
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "suggestedRole":"",
  "score":0,
  "recommendations":[]
}
`),
   new HumanMessage(`Resume content to analyze:\n${resumeText}`),
    ], {
        // Groq guarantees a JSON object instead of a prose/reasoning reply.
        response_format: { type: "json_object" },
    })

    // Providers may return either a string or an array of content blocks.
    return Array.isArray(response.content)
        ? response.content.map((part) => part.text ?? "").join("")
        : response.content;
}
