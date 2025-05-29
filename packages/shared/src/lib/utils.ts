import slugify from "slugify";
import { ZodError } from "zod";

export function formatError(error: unknown) {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  // Zod Validation Error
  if (error instanceof ZodError) {
    const fieldsErrors = error.errors.map((e) => e.message);
    return fieldsErrors.join(". ");
  }
  const err = error as any;

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
      .map((el: any) => el.message)
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
  } catch {
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

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function generateSlugFromName(name: string) {
  return slugify(name, { lower: true, strict: true });
}
