import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route";
import hotelRouter from "./routes/hotel.route";

import { errorHandler } from "./controllers/error.controller";

const app = express();

// Logging in development
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/hotels", hotelRouter);

app.use(errorHandler);

export default app;
