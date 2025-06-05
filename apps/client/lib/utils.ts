import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';
// import axios from 'axios';
import { AxiosError } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return String(error);
  }

  const err = error as Error;

  // Zod Validation Error
  if (error instanceof ZodError) {
    const fieldsErrors = error.errors.map(e => e.message);
    return fieldsErrors.join('. ');
  }

  // Axios Error
  if (err instanceof AxiosError) {
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    if (err.message) {
      return err.message;
    }
    return 'An error occurred while making a request.';
  }

  // Default error.message
  if (typeof err.message === 'string') {
    return err.message;
  }

  // Fallback
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
