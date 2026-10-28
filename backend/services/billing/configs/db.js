import mongoose from "mongoose";

export const connectDB = async () => {
    const databaseUrl = process.env.MONGODB_URL;

    if (!databaseUrl) {
        throw new Error("MONGODB_URL is missing from the billing service environment");
    }

    try {
        await mongoose.connect(databaseUrl);
        console.log("Connected DB");
    } catch (error) {
        console.error("MongoDB connection failed for billing service:", error);
        throw error;
    }
};
