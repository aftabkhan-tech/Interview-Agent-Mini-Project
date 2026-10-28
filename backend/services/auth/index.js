import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "node:url";
import { connectDb } from "./configs/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);

const PORT = process.env.PORT || 6001;

const startAuthService = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Auth Service Started on ${PORT}`);
    });
  } catch (error) {
    console.error("Auth service could not start because MongoDB is unavailable.");
    process.exitCode = 1;
  }
};

startAuthService();
