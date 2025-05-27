import express from "express";
import morgan from "morgan";
import userRouter from "./routes/user.route";
import { errorHandler } from "./controllers/error.controller";

const app = express();

// Logging in development
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
