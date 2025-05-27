"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = formatError;
exports.convertToPlainObject = convertToPlainObject;
function formatError(error) {
    if (error.name === "ZodError") {
        // Handle Zod error
        const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message);
        return fieldErrors.join(". ");
    }
    else if (error.name === "PrismaClientKnownRequestError" &&
        error.code === "P2002") {
        // Handle Prisma error
        const field = error.meta?.target ? error.meta.target[0] : "Field";
        return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }
    else {
        // Handle other errors
        return typeof error.message === "string"
            ? error.message
            : JSON.stringify(error.message);
    }
}
function convertToPlainObject(value) {
    return JSON.parse(JSON.stringify(value));
}
