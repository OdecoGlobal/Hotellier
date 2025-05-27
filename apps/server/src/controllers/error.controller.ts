import { formatError } from "@hotellier/shared";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  const message = formatError(err);

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status,
      message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      status,
      message,
    });
  }
}
