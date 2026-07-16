import { AppError } from "~/pointing/model";

type ErrorWithCode = {
  code?: string;
};

export const getFirestoreErrorCode = (error: unknown): string | undefined => {
  return (error as ErrorWithCode | null)?.code;
};

export const mapGenericFirestoreError = (error: unknown): AppError => {
  const code = getFirestoreErrorCode(error);

  if (code === "permission-denied") {
    return new AppError("permission-denied", "Action not allowed.");
  }

  if (code === "invalid-argument") {
    return new AppError("validation", "Invalid request.");
  }

  return new AppError("unknown", "Network issue. Please retry.");
};