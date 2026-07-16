import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  type Unsubscribe,
  type DocumentData,
  type Timestamp,
} from "firebase/firestore";

import { getFirebaseClients } from "../../utils/firebase/init";
import {
  AppError,
  assertRequiredName,
  assertRequiredRoomCode,
  type Participant,
  type ParticipantVote,
  type Room,
} from "~/pointing/model";
import { mapRoomFirestoreError } from "~/pointing/api/roomErrors";

export type FirestoreRoom = Omit<Room, "createdAt"> & { createdAt: Timestamp };

const ROOMS_COLLECTION = "rooms";

// Returns the Firestore document reference for a room code.
export const getRoomRef = (roomCode: string) => {
  const { firestore } = getFirebaseClients();
  return doc(firestore, ROOMS_COLLECTION, roomCode);
};

// Checks whether a room document exists for the given code.
export const roomExists = async (roomCode: string): Promise<boolean> => {
  const safeCode = assertRequiredRoomCode(roomCode);
  const snapshot = await getDoc(getRoomRef(safeCode));
  return snapshot.exists();
};

// Creates or replaces a room document with the provided Firestore payload.
export const setRoom = async (roomCode: string, room: FirestoreRoom): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);

  try {
    await setDoc(getRoomRef(safeCode), room);
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};

// Converts raw Firestore room data into the app domain Room type.
const toRoom = (data: DocumentData): Room => {
  const room = data as FirestoreRoom;

  return {
    code: room.code,
    participants: room.participants ?? {},
    revealVotes: room.revealVotes ?? false,
    moderators: room.moderators ?? [],
    createdAt: room.createdAt?.toDate?.() ?? new Date(),
  };
};

// Fetches a room by code and maps it into the domain model.
export const getRoom = async (roomCode: string): Promise<Room> => {
  const safeCode = assertRequiredRoomCode(roomCode);

  const snapshot = await getDoc(getRoomRef(safeCode));
  if (!snapshot.exists()) {
    throw new AppError("not-found", "Room not found.");
  }

  return toRoom(snapshot.data());
};

// Subscribes to realtime room updates and emits mapped Room values.
export const subscribeToRoom = (
  roomCode: string,
  onRoom: (room: Room | null) => void,
  onError?: (error: AppError) => void,
): Unsubscribe => {
  const safeCode = assertRequiredRoomCode(roomCode);

  return onSnapshot(
    getRoomRef(safeCode),
    (snapshot) => {
      if (!snapshot.exists()) {
        onRoom(null);
        return;
      }

      onRoom(toRoom(snapshot.data()));
    },
    (error) => {
      if (onError) {
        onError(mapRoomFirestoreError(error));
      }
    },
  );
};

// Updates the current participant vote value in the room document.
export const updateVote = async (
  roomCode: string,
  participantId: string,
  vote: ParticipantVote,
): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);

  try {
    await updateDoc(getRoomRef(safeCode), {
      [`participants.${participantId}.vote`]: vote,
    });
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};

// Updates the participant display name for a room.
export const updateParticipantName = async (
  roomCode: string,
  participantId: string,
  nextName: string,
): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);
  const safeName = assertRequiredName(nextName);

  try {
    await updateDoc(getRoomRef(safeCode), {
      [`participants.${participantId}.name`]: safeName,
    });
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};

// Reveals all submitted votes for the room.
export const revealVotes = async (roomCode: string): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);

  try {
    await updateDoc(getRoomRef(safeCode), {
      revealVotes: true,
    });
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};

// Adds the participant as a moderator if not already present.
export const becomeModerator = async (
  roomCode: string,
  participantId: string,
): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);
  const room = await getRoom(safeCode);

  if (room.moderators.includes(participantId)) {
    return;
  }

  try {
    await updateDoc(getRoomRef(safeCode), {
      moderators: [...room.moderators, participantId],
    });
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};

// Removes the participant from moderators while preserving at least one moderator.
export const removeModerator = async (
  roomCode: string,
  participantId: string,
): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);
  const room = await getRoom(safeCode);

  if (!room.moderators.includes(participantId)) {
    return;
  }

  if (room.moderators.length <= 1) {
    throw new AppError("validation", "At least one moderator is required.");
  }

  try {
    await updateDoc(getRoomRef(safeCode), {
      moderators: room.moderators.filter((moderatorId) => moderatorId !== participantId),
    });
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};

// Clears all votes and hides results for the next estimation round.
export const resetVotes = async (roomCode: string): Promise<void> => {
  const safeCode = assertRequiredRoomCode(roomCode);
  const room = await getRoom(safeCode);

  const nextParticipants: Record<string, Participant> = {};
  const participantEntries = Object.entries(room.participants);

  for (const [participantId, participant] of participantEntries) {
    nextParticipants[participantId] = {
      ...participant,
      vote: null,
    };
  }

  try {
    await updateDoc(getRoomRef(safeCode), {
      revealVotes: false,
      participants: nextParticipants,
    });
  } catch (error) {
    throw mapRoomFirestoreError(error);
  }
};
