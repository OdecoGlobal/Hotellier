"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHotelOwnerShip = exports.restrictTo = exports.protect = exports.logout = exports.login = exports.signUpHotelOwners = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("@hotellier/shared");
const prisma_1 = require("../db/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const utils_1 = require("../utils");
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
                resolve(decoded);
            }
            else {
                reject(new Error('Invalid token structure'));
            }
        });
    });
};
const signToken = (id) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new Error('JWT_SECRET or JWT_EXPIRES_IN is not defined in environment variables');
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
    res.cookie('jwt', token, cookieOptions);
    //   const { password, ...userWithoutPassword } = user;
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
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
exports.signUpHotelOwners = (0, catchAsync_1.default)(async (req, res, next) => {
    const validatedData = shared_1.signUpFormSchema.parse(req.body);
    const hashedPassword = await bcryptjs_1.default.hash(validatedData.password, 12);
    const newUser = await prisma_1.prisma.user.create({
        data: {
            userName: validatedData.userName,
            email: validatedData.email,
            password: hashedPassword,
            role: 'OWNER',
        },
    });
    const { password, ...userWithoutPassword } = newUser;
    createSendToken(userWithoutPassword, 201, res);
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const validatedData = shared_1.loginSchema.parse(req.body);
    const { email, password } = validatedData;
    if (!email || !password)
        return next(new appError_1.default('Please provide email and password', 400));
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user ||
        !user.password ||
        !(await bcryptjs_1.default.compare(password, user.password))) {
        return next(new appError_1.default('Invalid credentials', 401));
    }
    const { password: _, ...userWithoutPassword } = user;
    createSendToken(userWithoutPassword, 200, res);
});
const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ status: 'success' });
};
exports.logout = logout;
// export const logout = (req: Request, res: Response) => {
//   res.cookie("jwt", "loggedout", {
//     expires: new Date(Date.now() + 10 * 1000),
//     // httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in!, Please login in to access', 401));
    }
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    const currentUser = await prisma_1.prisma.user.findUnique({
        where: { id: decoded.id },
    });
    if (!currentUser)
        return next(new appError_1.default('User no longer exists.', 401));
    if (!decoded.iat) {
        throw new Error('Token missing "iat" claim');
    }
    if ((0, utils_1.changedPasswordAfter)(currentUser, decoded.iat)) {
        return next(new appError_1.default('User recently changed password! Please log in again ', 401));
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
const restrictTo = (...roles) => {
    return (req, res, next) => {
        const authReq = req;
        if (!roles.includes(authReq.user.role)) {
            return next(new appError_1.default('You do not have permission to perform this action', 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
exports.validateHotelOwnerShip = (0, catchAsync_1.default)(async (req, res, next) => {
    const authReq = req;
    const { hotelId } = req.params;
    const userId = authReq.user.id;
    const hotel = await prisma_1.prisma.hotel.findFirst({
        where: { id: hotelId, ownerId: userId },
    });
    if (!hotel)
        return next(new appError_1.default('Hotel not found or access denied', 404));
    req.hotel = hotel;
    next();
});
