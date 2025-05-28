"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const shared_1 = require("@hotellier/shared");
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const message = (0, shared_1.formatError)(err);
    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            status,
            message,
            error: err,
            stack: err.stack,
        });
    }
    else {
        res.status(statusCode).json({
            status,
            message,
        });
    }
}
