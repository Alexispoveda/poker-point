import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { type MouseEvent } from "react";

import type { Participant } from "~/pointing/model";
import { getVoteLabel } from "~/pointing/ui/components/ParticipantList/useParticipantListActions";

type ParticipantListItemProps = {
  participant: Participant;
  currentParticipantId: string;
  revealVotes: boolean;
  isMutating: boolean;
  onOpenMenu: (event: MouseEvent<HTMLElement>) => void;
};

const ParticipantListItem = ({
  participant,
  currentParticipantId,
  revealVotes,
  isMutating,
  onOpenMenu,
}: ParticipantListItemProps) => {
  const isCurrentUser = participant.id === currentParticipantId;
  const hasVoted = Boolean(participant.vote);

  return (
    <ListItem key={participant.id} divider>
      <ListItemAvatar>
        <Avatar>{participant.name.slice(0, 1).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="body1">
              {isCurrentUser ? `${participant.name} (You)` : participant.name}
            </Typography>
          </Stack>
        }
        secondary={getVoteLabel(participant, revealVotes)}
      />
      <Stack direction="row" spacing={1}>
        {hasVoted ? (
          <DoneIcon color="success" fontSize="small" titleAccess="Voted" />
        ) : (
          <HourglassEmptyIcon fontSize="small" titleAccess="Waiting" />
        )}
        {isCurrentUser ? (
          <IconButton
            aria-label="participant actions"
            onClick={onOpenMenu}
            size="small"
            disabled={isMutating}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        ) : null}
      </Stack>
    </ListItem>
  );
};

export default ParticipantListItem;
