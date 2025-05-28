import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

exports.getMe = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new AppError("User not autheticated", 401));
  req.params.id = req.user.id;
  next();
};
