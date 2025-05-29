"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = formatError;
exports.convertToPlainObject = convertToPlainObject;
exports.generateSlugFromName = generateSlugFromName;
const slugify_1 = __importDefault(require("slugify"));
const zod_1 = require("zod");
function formatError(error) {
    if (!error || typeof error !== "object") {
        return String(error);
    }
    // Zod Validation Error
    if (error instanceof zod_1.ZodError) {
        const fieldsErrors = error.errors.map((e) => e.message);
        return fieldsErrors.join(". ");
    }
    const err = error;
    // Prisma Request error
    if (err.name === "PrismaClientKnownRequestError") {
        if (err.code === "P2002") {
            const field = err.meta?.target ? err.meta.target[0] : "Field";
            return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
        }
    }
    // JWT ERRORS
    if (err.name === "JsonWebTokenError") {
        return "Invalid Token. Please log in again";
    }
    if (err.name === "TokenExpiredError") {
        return "Your token has expired! Please log in again.";
    }
    // VALIDATOR JS ERROR
    if (err.name === "ValidationError" && err.errors) {
        const messages = Object.values(err.errors)
            .map((el) => el.message)
            .join(". ");
        return `Invalid input data. ${messages}`;
    }
    // DEFAULT ERROR.MESSAGE
    if (typeof err.message === "string") {
        return err.message;
    }
    // If all else fails, try stringify
    try {
        return JSON.stringify(err);
    }
    catch {
        return String(err);
    }
    /*
    if (error.name === "ZodError") {
      // Handle Zod error
      const fieldErrors = Object.keys(error.errors).map(
        (field) => error.errors[field].message
      );
  
      return fieldErrors.join(". ");
    } else if (
      error.name === "PrismaClientKnownRequestError" &&
      error.code === "P2002"
    ) {
      // Handle Prisma error
      const field = error.meta?.target ? error.meta.target[0] : "Field";
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    } else {
      // Handle other errors
      return typeof error.message === "string"
        ? error.message
        : JSON.stringify(error.message);
    }*/
}
function convertToPlainObject(value) {
    return JSON.parse(JSON.stringify(value));
}
function generateSlugFromName(name) {
    return (0, slugify_1.default)(name, { lower: true, strict: true });
}
