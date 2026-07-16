import PointingJoinRoomCard from "~/pointing/ui/pages/PointingPage/PointingJoinRoomCard";
import PointingRenameDialog from "~/pointing/ui/pages/PointingPage/PointingRenameDialog";
import PointingRoomContent from "~/pointing/ui/pages/PointingPage/PointingRoomContent";
import PointingStatusState from "~/pointing/ui/pages/PointingPage/PointingStatusState";
import { usePointingPage } from "~/pointing/ui/pages/usePointingPage";

type PointingProps = {
  roomId: string;
};

const Pointing = ({ roomId }: PointingProps) => {
  const {
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
  } = usePointingPage({ roomId });

  if (!safeRoomCode) {
    return <PointingStatusState severity="error" message="Invalid room code." />;
  }

  if (isLoading) {
    return <PointingStatusState message="Loading room..." />;
  }

  if (loadError) {
    return <PointingStatusState severity="error" message={loadError} />;
  }

  if (!room) {
    return <PointingStatusState severity="warning" message="Room not found." />;
  }

  if (!currentParticipant) {
    return (
      <PointingJoinRoomCard
        roomCode={safeRoomCode}
        revealVotes={room.revealVotes}
        nameDraft={nameDraft}
        actionError={actionError}
        isActionMutating={isActionMutating}
        onNameDraftChange={setNameDraft}
        onJoinRoom={handleJoinRoom}
      />
    );
  }

  return (
    <>
      <PointingRoomContent
        roomCode={safeRoomCode}
        room={room}
        participants={participants}
        currentParticipantId={participantId}
        currentVote={currentParticipant.vote}
        actionError={actionError}
        isActionMutating={isActionMutating}
        isVoting={isVoting}
        isModerator={isModerator}
        onVote={handleVote}
        onRenameRequest={openRenameDialog}
        onBecomeModerator={handleBecomeModerator}
        onRemoveModerator={handleRemoveModerator}
        onRevealVotes={handleRevealVotes}
        onResetVotes={handleResetVotes}
      />
      <PointingRenameDialog
        open={isRenameOpen}
        nameDraft={nameDraft}
        isActionMutating={isActionMutating}
        onClose={closeRenameDialog}
        onNameDraftChange={setNameDraft}
        onSave={handleSaveAndCloseRename}
      />
    </>
  );
};

export default Pointing;
