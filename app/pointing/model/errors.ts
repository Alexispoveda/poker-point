export type AppErrorCode =
  | "not-found"
  | "already-exists"
  | "permission-denied"
  | "validation"
  | "unknown";

export class AppError extends Error {
  code: AppErrorCode;

  constructor(code: AppErrorCode, message: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}

export const toFriendlyErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};
