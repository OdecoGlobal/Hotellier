"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const shared_1 = require("@hotellier/shared");
const appError_1 = __importDefault(require("../utils/appError"));
function errorHandler(err, req, res, next) {
    let error = err;
    if (error.name === "ZodError") {
        error = new appError_1.default((0, shared_1.formatError)(error), 400);
    }
    else if (error.name === "PrismaClientKnownRequestError" &&
        error.code === "P2002") {
        error = new appError_1.default((0, shared_1.formatError)(error), 400);
    }
    else if (error.name === "JsonWebTokenError") {
        error = new appError_1.default((0, shared_1.formatError)(error), 401);
    }
    else if (error.name === "TokenExpiredError") {
        error = new appError_1.default((0, shared_1.formatError)(error), 401);
    }
    else if (!error.statusCode) {
        error = new appError_1.default((0, shared_1.formatError)(error), 500);
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
    }
    else if (error.isOperational) {
        res.status(statusCode).json({
            status,
            message,
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
}
