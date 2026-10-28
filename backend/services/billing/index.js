import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { connectDB } from "./configs/db.js";
import billingRouter from "./routes/billing.route.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6005;

app.get("/", (req, res) => {
    res.send("Hello from Billing-service");
});

app.use("/", billingRouter);

const startBillingService = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Billing-service Started on ${PORT}`);
        });
    } catch (error) {
        console.error("Billing service could not start because MongoDB is unavailable.");
        process.exitCode = 1;
    }
};

startBillingService();
