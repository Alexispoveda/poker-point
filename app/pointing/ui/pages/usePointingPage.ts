import { useEffect, useMemo, useState } from "react";

import { joinRoom } from "~/home/api/room";
import {
  becomeModerator,
  removeModerator,
  resetVotes,
  revealVotes,
  subscribeToRoom,
  updateParticipantName,
  updateVote,
} from "~/pointing/api/room";
import {
  getOrCreateParticipantId,
  normalizeRoomCode,
  toFriendlyErrorMessage,
  type Participant,
  type ParticipantVote,
  type Room,
} from "~/pointing/model";

type UsePointingPageParams = {
  roomId: string;
};

export const usePointingPage = ({ roomId }: UsePointingPageParams) => {
  const participantId = useMemo(() => getOrCreateParticipantId(), []);

  const [room, setRoom] = useState<Room | null>(null);
  const [nameDraft, setNameDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isActionMutating, setIsActionMutating] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const safeRoomCode = normalizeRoomCode(roomId);

  useEffect(() => {
    setIsLoading(true);
    setLoadError("");

    const unsubscribe = subscribeToRoom(
      safeRoomCode,
      (nextRoom) => {
        setRoom(nextRoom);
        setIsLoading(false);
      },
      (error) => {
        setLoadError(toFriendlyErrorMessage(error));
        setIsLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [safeRoomCode]);

  const currentParticipant = room?.participants[participantId] ?? null;
  const participants = useMemo((): Participant[] => {
    if (!room) {
      return [];
    }

    const allParticipants = Object.values(room.participants).filter(
      (participant): participant is Participant => Boolean(participant),
    );

    const currentUser = allParticipants.find((participant) => participant.id === participantId);
    const others = allParticipants
      .filter((participant) => participant.id !== participantId)
      .sort((left, right) => {
        const nameOrder = left.name.localeCompare(right.name, undefined, { sensitivity: "base" });
        if (nameOrder !== 0) {
          return nameOrder;
        }

        return left.id.localeCompare(right.id);
      });

    return currentUser ? [currentUser, ...others] : others;
  }, [room, participantId]);

  const isModerator = room?.moderators.includes(participantId) ?? false;

  useEffect(() => {
    if (currentParticipant) {
      setNameDraft(currentParticipant.name);
    }
  }, [currentParticipant]);

  const withActionMutation = async (callback: () => Promise<void>) => {
    setActionError("");
    setIsActionMutating(true);
    try {
      await callback();
    } catch (error) {
      setActionError(toFriendlyErrorMessage(error));
    } finally {
      setIsActionMutating(false);
    }
  };

  const handleJoinRoom = async () => {
    await withActionMutation(async () => {
      await joinRoom(safeRoomCode, participantId, nameDraft);
    });
  };

  const handleVote = async (vote: ParticipantVote) => {
    setActionError("");
    setIsVoting(true);
    try {
      await updateVote(safeRoomCode, participantId, vote);
    } catch (error) {
      setActionError(toFriendlyErrorMessage(error));
    } finally {
      setIsVoting(false);
    }
  };

  const handleSaveName = async () => {
    await withActionMutation(async () => {
      await updateParticipantName(safeRoomCode, participantId, nameDraft);
    });
  };

  const handleRevealVotes = async () => {
    await withActionMutation(async () => {
      await revealVotes(safeRoomCode);
    });
  };

  const handleResetVotes = async () => {
    await withActionMutation(async () => {
      await resetVotes(safeRoomCode);
    });
  };

  const handleBecomeModerator = async () => {
    await withActionMutation(async () => {
      await becomeModerator(safeRoomCode, participantId);
    });
  };

  const handleRemoveModerator = async () => {
    await withActionMutation(async () => {
      await removeModerator(safeRoomCode, participantId);
    });
  };

  const openRenameDialog = () => {
    setIsRenameOpen(true);
  };

  const closeRenameDialog = () => {
    setIsRenameOpen(false);
  };

  const handleSaveAndCloseRename = async () => {
    await handleSaveName();
    closeRenameDialog();
  };

  return {
    room,
    nameDraft,
    setNameDraft,
    isLoading,
    isActionMutating,
    isVoting,
    loadError,
    actionError,
    isRenameOpen,
    safeRoomCode,
    participantId,
    currentParticipant,
    participants,
    isModerator,
    handleJoinRoom,
    handleVote,
    handleRevealVotes,
    handleResetVotes,
    handleBecomeModerator,
    handleRemoveModerator,
    openRenameDialog,
    closeRenameDialog,
    handleSaveAndCloseRename,
  };
};
