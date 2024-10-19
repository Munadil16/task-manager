import dotenv from "dotenv";
import express from "express";
import type { Application, NextFunction, Request, Response } from "express";

import { connectDb } from "./db";
import userRouter from "./routes/user.routes";

dotenv.config();

connectDb();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
