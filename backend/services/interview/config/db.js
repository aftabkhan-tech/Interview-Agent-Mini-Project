import mongoose from "mongoose";

export const connectDB=async () => {
    try {
        const databaseUrl = new URL(process.env.MONGODB_URL)
        databaseUrl.pathname = `/${databaseUrl.pathname.replace(/^\/+/, "")}`

        await mongoose.connect(databaseUrl.toString())
        console.log("Connected DB")
    } catch (error) {
        console.log("MongoDb error",error)
    }
    
}
