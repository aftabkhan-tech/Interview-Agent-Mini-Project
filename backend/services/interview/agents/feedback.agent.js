import llm from "../config/llm.js";
import feedbackPrompt from "../prompts/feedbackPrompt.js";





export const feedbackAgent = async (data) => {
    let rawContent = "";
    try {
        const prompt = feedbackPrompt(data)

        const response = await llm.invoke(prompt)
        rawContent = response.content;

        const cleaned = response.content
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);
        if (!Array.isArray(parsed.incorrectWords)) {
            parsed.incorrectWords = [];
        }
        return parsed;
    } catch (error) {
        console.log("Feedback Agent Parse Error", error.message);
        console.log(rawContent);

        throw new Error("Failed to generate feedback");
    }
}