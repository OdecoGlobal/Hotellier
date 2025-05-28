"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
exports.getMe = (req, res, next) => {
    if (!req.user)
        return next(new appError_1.default("User not autheticated", 401));
    req.params.id = req.user.id;
    next();
};
