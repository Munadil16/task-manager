import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import type { Application, NextFunction, Request, Response } from "express";

import { connectDb } from "./db";
import userRouter from "./routes/user.routes";
import taskRouter from "./routes/task.routes";

dotenv.config();

connectDb();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN as string,
  })
);

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/tasks", taskRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
