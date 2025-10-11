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

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDB();
const port = process.env.PORT;
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);



app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
})