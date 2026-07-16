import { AppError } from "./errors";

export const assertRequiredName = (name: string): string => {
  const nextName = name.trim();

  if (!nextName) {
    throw new AppError("validation", "Name is required.");
  }

  return nextName;
};

export const assertRequiredRoomCode = (roomCode: string): string => {
  const nextRoomCode = roomCode.trim().toUpperCase();

  if (!nextRoomCode) {
    throw new AppError("validation", "Room code is required.");
  }

  return nextRoomCode;
};
