import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();


app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://teamsync-frontend-h8sa.vercel.app", 
        "https://teamsync-frontend-h8sa-git-main-sagars-projects-57ba4a6a.vercel.app",
        "https://teamsync-frontend-h8sa-mjxtwu7xj-sagars-projects-57ba4a6a.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

const port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);



app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
})