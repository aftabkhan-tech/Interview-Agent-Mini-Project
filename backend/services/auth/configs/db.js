import mongoose from "mongoose"

export const connectDb = async () => {
  const databaseUrl = process.env.MONGODB_URL

  if (!databaseUrl) {
    throw new Error("MONGODB_URL is missing from the auth service environment")
  }

  try {
    await mongoose.connect(databaseUrl)
    console.log("DB Connected")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    throw error
  }
}
