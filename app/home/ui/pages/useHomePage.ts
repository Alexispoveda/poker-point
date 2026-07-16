import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { createRoom, joinRoom } from "~/home/api/room";
import {
  AppError,
  getOrCreateParticipantId,
  normalizeRoomCode,
  toFriendlyErrorMessage,
} from "~/pointing/model";

type UseHomePageResult = {
  createName: string;
  joinName: string;
  roomCode: string;
  createError: string;
  joinRoomCodeError: string;
  joinNameError: string;
  isCreating: boolean;
  isJoining: boolean;
  setCreateName: (name: string) => void;
  setJoinName: (name: string) => void;
  setRoomCode: (code: string) => void;
  handleCreateRoom: () => Promise<void>;
  handleJoinRoom: () => Promise<void>;
};

export const useHomePage = (): UseHomePageResult => {
  const navigate = useNavigate();
  const participantId = useMemo(() => getOrCreateParticipantId(), []);

  const [createName, setCreateName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createError, setCreateError] = useState("");
  const [joinRoomCodeError, setJoinRoomCodeError] = useState("");
  const [joinNameError, setJoinNameError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleCreateRoom = async () => {
    setCreateError("");
    setIsCreating(true);

    try {
      const nextRoomCode = await createRoom(participantId, createName);
      navigate(`/pointing/${nextRoomCode}`);
    } catch (error) {
      setCreateError(toFriendlyErrorMessage(error));
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async () => {
    setJoinRoomCodeError("");
    setJoinNameError("");

    const nextRoomCode = normalizeRoomCode(roomCode);
    const nextName = joinName.trim();

    if (!nextRoomCode || !nextName) {
      if (!nextRoomCode) {
        setJoinRoomCodeError("Room code is required.");
      }
      if (!nextName) {
        setJoinNameError("Name is required.");
      }
      return;
    }

    setIsJoining(true);

    try {
      await joinRoom(nextRoomCode, participantId, nextName);
      navigate(`/pointing/${nextRoomCode}`);
    } catch (error) {
      const message = toFriendlyErrorMessage(error);

      if (error instanceof AppError && error.code === "validation") {
        if (message.toLowerCase().includes("name")) {
          setJoinNameError(message);
        } else {
          setJoinRoomCodeError(message);
        }
      } else {
        setJoinRoomCodeError(message);
      }
    } finally {
      setIsJoining(false);
    }
  };

  return {
    createName,
    joinName,
    roomCode,
    createError,
    joinRoomCodeError,
    joinNameError,
    isCreating,
    isJoining,
    setCreateName,
    setJoinName,
    setRoomCode,
    handleCreateRoom,
    handleJoinRoom,
  };
};