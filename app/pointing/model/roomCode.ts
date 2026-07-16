const ROOM_CODE_LENGTH = 6;
const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const normalizeRoomCode = (value: string): string => value.trim().toUpperCase();

export const createRoomCode = (): string => {
  let code = "";

  for (let index = 0; index < ROOM_CODE_LENGTH; index += 1) {
    const nextIndex = Math.floor(Math.random() * ROOM_CODE_CHARS.length);
    code += ROOM_CODE_CHARS[nextIndex];
  }

  return code;
};
