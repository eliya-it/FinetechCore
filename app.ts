import express, { Router, Request, Response } from "express";
import transferRoutes from "./routers/transferRoutes";
import authRoutes from "./routers/authRoutes";
import userRoutes from "./routers/userRoutes";
import adminRoutes from "./routers/adminRoutes";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: ".env" });

// Body parsing middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/admin", adminRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
