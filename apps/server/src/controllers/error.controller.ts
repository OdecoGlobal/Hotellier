import { formatError } from "@hotellier/shared";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let error = err;

  if (error.name === "ZodError") {
    error = new AppError(formatError(error), 400);
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    error = new AppError(formatError(error), 400);
  } else if (error.name === "JsonWebTokenError") {
    error = new AppError(formatError(error), 401);
  } else if (error.name === "TokenExpiredError") {
    error = new AppError(formatError(error), 401);
  } else if (!error.statusCode) {
    error = new AppError(formatError(error), 500);
  }

  const statusCode = error.statusCode || 500;
  const status = error.status || "error";

  const message = error.message || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status,
      message,
      error: err,
      stack: err.stack,
    });
  } else if (error.isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}
