"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("@hotellier/shared");
const prisma_1 = require("../db/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const signToken = (id) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new Error("JWT_SECRET or JWT_EXPIRES_IN is not defined in environment variables");
    }
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn,
    });
};
const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
};
const createSendToken = (user, statusCode, res) => {
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
exports.signUp = (0, catchAsync_1.default)(async (req, res, next) => {
    const validatedData = shared_1.signUpFormSchema.parse(req.body);
    const hashedPassword = await bcryptjs_1.default.hash(validatedData.password, 12);
    const newUser = await prisma_1.prisma.user.create({
        data: {
            userName: validatedData.userName,
            email: validatedData.email,
            password: hashedPassword,
        },
    });
    const { password, ...userWithoutPassword } = newUser;
    createSendToken(userWithoutPassword, 201, res);
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const validatedData = shared_1.loginSchema.parse(req.body);
    const { email, password } = validatedData;
    if (!email || !password)
        return next(new appError_1.default("Please provide email and password", 400));
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user ||
        !user.password ||
        !(await bcryptjs_1.default.compare(password, user.password))) {
        return next(new appError_1.default("Invalid credentials", 401));
    }
    const { password: _, ...userWithoutPassword } = user;
    createSendToken(userWithoutPassword, 200, res);
});
