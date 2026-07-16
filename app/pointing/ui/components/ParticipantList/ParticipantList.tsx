import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Participant } from "~/pointing/model";
import ParticipantActionsMenu from "~/pointing/ui/components/ParticipantList/ParticipantActionsMenu";
import ParticipantListItem from "~/pointing/ui/components/ParticipantList/ParticipantListItem";
import { useParticipantListActions } from "~/pointing/ui/components/ParticipantList/useParticipantListActions";

type ParticipantListProps = {
  participants: Participant[];
  moderators: string[];
  currentParticipantId: string;
  revealVotes: boolean;
  isMutating: boolean;
  onRenameRequest: () => void;
  onBecomeModerator: () => void;
  onRemoveModerator: () => void;
};

const ParticipantList = ({
  participants,
  moderators,
  currentParticipantId,
  revealVotes,
  isMutating,
  onRenameRequest,
  onBecomeModerator,
  onRemoveModerator,
}: ParticipantListProps) => {
  const {
    menuAnchorEl,
    isMenuOpen,
    isCurrentUserModerator,
    openMenu,
    closeMenu,
    handleRenameClick,
    handleModeratorSwitch,
  } = useParticipantListActions({
    moderators,
    currentParticipantId,
    onRenameRequest,
    onBecomeModerator,
    onRemoveModerator,
  });

  return (
    <Stack spacing={1}>
      <Typography variant="h6" component="h2">
        Participants ({participants.length})
      </Typography>
      <List>
        {participants.map((participant) => (
          <ParticipantListItem
            key={participant.id}
            participant={participant}
            currentParticipantId={currentParticipantId}
            revealVotes={revealVotes}
            isMutating={isMutating}
            onOpenMenu={openMenu}
          />
        ))}
      </List>
      <ParticipantActionsMenu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        onRenameClick={handleRenameClick}
        isCurrentUserModerator={isCurrentUserModerator}
        onModeratorSwitch={handleModeratorSwitch}
      />
    </Stack>
  );
};

export default ParticipantList;
