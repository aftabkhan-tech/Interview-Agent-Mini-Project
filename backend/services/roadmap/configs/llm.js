
import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"
dotenv.config()

const llm = new ChatGroq({
    // Groq retired llama-3.3-70b-versatile for developer/free accounts.
    model: "openai/gpt-oss-120b",
    temperature: 0.2,
    maxTokens: 4000,
    maxRetries: 2,
    reasoningEffort: "low",
})

export default llm
