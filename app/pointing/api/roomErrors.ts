import { AppError } from "~/pointing/model";
import { getFirestoreErrorCode, mapGenericFirestoreError } from "~/api/firestoreErrors";

// Maps Firestore failures to room-specific domain errors first,
// then falls back to generic Firebase/App handling.
export const mapRoomFirestoreError = (error: unknown): AppError => {
  const code = getFirestoreErrorCode(error);

  if (code === "not-found") {
    return new AppError("not-found", "Room not found.");
  }

  if (code === "already-exists") {
    return new AppError("already-exists", "Room already exists. Please try again.");
  }

  return mapGenericFirestoreError(error);
};
