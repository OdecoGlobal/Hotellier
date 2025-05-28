import { Response, Request, NextFunction } from "express-serve-static-core";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { User, loginSchema, signUpFormSchema } from "@hotellier/shared";
import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { changedPasswordAfter } from "../utils";
import { Role } from "@prisma/client";

interface DecodedToken extends JwtPayload {
  id: string;
}

const verifyToken = (token: string, secret: string): Promise<DecodedToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }

      if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
        resolve(decoded as DecodedToken);
      } else {
        reject(new Error("Invalid token structure"));
      }
    });
  });
};

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

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in!, Please login in to access", 401)
      );
    }

    const decoded = await verifyToken(token, process.env.JWT_SECRET! as string);

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!currentUser) return next();

    if (!decoded.iat) {
      throw new Error('Token missing "iat" claim');
    }

    if (changedPasswordAfter(currentUser, decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again ",
          401
        )
      );
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError("Authetication is required", 401));
    if (!req.user.role) {
      return next(new AppError("User does not have a role", 403));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
