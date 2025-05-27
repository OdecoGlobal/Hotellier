// import crypto from "crypto";
// import { promisify } from "util";
import { Response, Request, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import {
  User,
  loginSchema,
  signUpFormSchema,
  formatError,
} from "@hotellier/shared";
import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const signToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error(
      "JWT_SECRET or JWT_EXPIRES_IN is not defined in environment variables"
    );
  }

  return jwt.sign({ id }, secret, {
    expiresIn,
  } as SignOptions);
};

const cookieOptions = {
  expires: new Date(
    Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
  ),
};

const createSendToken = (user: User, statusCode: number, res: Response) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, cookieOptions);
  //   const { password, ...userWithoutPassword } = user;
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = signUpFormSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const newUser = await prisma.user.create({
      data: {
        userName: validatedData.userName,
        email: validatedData.email,
        password: hashedPassword,
      },
    });
    const { password, ...userWithoutPassword } = newUser;
    createSendToken(userWithoutPassword, 201, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = loginSchema.parse(req.body);

    const { email, password } = validatedData;

    if (!email || !password)
      return next(new AppError("Please provide email and password", 400));
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return next(new AppError("Invalid credentials", 401));
    }

    const { password: _, ...userWithoutPassword } = user;

    createSendToken(userWithoutPassword, 200, res);
  }
);
