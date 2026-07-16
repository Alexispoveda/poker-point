import { updateDoc, Timestamp } from "firebase/firestore";

import {
  AppError,
  assertRequiredName,
  assertRequiredRoomCode,
  createRoomCode,
  type Participant,
} from "~/pointing/model";
import { mapRoomFirestoreError } from "~/pointing/api/roomErrors";
import {
  getRoomRef,
  roomExists,
  setRoom,
  type FirestoreRoom,
} from "~/pointing/api/room";

const ROOM_CREATE_MAX_RETRIES = 10;

// Creates a new room with a unique code and sets the creator as first moderator.
export const createRoom = async (
  participantId: string,
  participantName: string,
): Promise<string> => {
  const safeName = assertRequiredName(participantName);

  for (let attempt = 0; attempt < ROOM_CREATE_MAX_RETRIES; attempt += 1) {
    const code = createRoomCode();

    if (await roomExists(code)) {
      continue;
    }

    const participant: Participant = {
      id: participantId,
      name: safeName,
      vote: null,
    };

    const room: FirestoreRoom = {
      code,
      participants: {
        [participantId]: participant,
      },
      revealVotes: false,
      moderators: [participantId],
      createdAt: Timestamp.now(),
    };

    try {
      await setRoom(code, room);
      return code;
    } catch (error) {
      const appError = mapRoomFirestoreError(error);
      if (appError.code === "already-exists") {
        continue;
      }

      throw appError;
    }
  }

  throw new AppError("unknown", "Could not create room. Please retry.");
};

// Adds or updates the current participant entry in an existing room.
export const joinRoom = async (
  roomCode: string,
  participantId: string,
  participantName: string,
): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);
  const safeName = assertRequiredName(participantName);

  if (!(await roomExists(safeCode))) {
    throw new AppError("not-found", "Room not found.");
  }

  const roomRef = getRoomRef(safeCode);

  const nextParticipant: Participant = {
    id: participantId,
    name: safeName,
    vote: null,
  };

  try {
    await updateDoc(roomRef, {
      [`participants.${participantId}`]: nextParticipant,
    });
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};
