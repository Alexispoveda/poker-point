const PARTICIPANT_ID_STORAGE_KEY = "point-poker-participant-id";

const canUseStorage = (): boolean => typeof window !== "undefined";

const generateId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `participant-${Math.random().toString(36).slice(2, 10)}`;
};

export const getOrCreateParticipantId = (): string => {
  if (!canUseStorage()) {
    return generateId();
  }

  const existingId = window.localStorage.getItem(PARTICIPANT_ID_STORAGE_KEY);
  if (existingId) {
    return existingId;
  }

  const newId = generateId();
  window.localStorage.setItem(PARTICIPANT_ID_STORAGE_KEY, newId);
  return newId;
};
