import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { VOTE_OPTIONS, type Participant, type ParticipantVote, type Room } from "~/pointing/model";
import ParticipantList from "~/pointing/ui/components/ParticipantList";
import RoomCodeDisplay from "~/pointing/ui/components/RoomCodeDisplay";
import VoteResultsPie from "~/pointing/ui/components/VoteResultsPie";
import VotePicker from "~/pointing/ui/components/VotePicker";

type PointingRoomContentProps = {
  roomCode: string;
  room: Room;
  participants: Participant[];
  currentParticipantId: string;
  currentVote: ParticipantVote;
  actionError: string;
  isActionMutating: boolean;
  isVoting: boolean;
  isModerator: boolean;
  onVote: (vote: ParticipantVote) => void;
  onRenameRequest: () => void;
  onBecomeModerator: () => void;
  onRemoveModerator: () => void;
  onRevealVotes: () => void;
  onResetVotes: () => void;
};

const PointingRoomContent = ({
  roomCode,
  room,
  participants,
  currentParticipantId,
  currentVote,
  actionError,
  isActionMutating,
  isVoting,
  isModerator,
  onVote,
  onRenameRequest,
  onBecomeModerator,
  onRemoveModerator,
  onRevealVotes,
  onResetVotes,
}: PointingRoomContentProps) => {
  return (
    <Container maxWidth={false} sx={{ py: 3, px: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <RoomCodeDisplay roomCode={roomCode} revealVotes={room.revealVotes} />
                <ParticipantList
                  participants={participants}
                  moderators={room.moderators}
                  currentParticipantId={currentParticipantId}
                  revealVotes={room.revealVotes}
                  isMutating={isActionMutating}
                  onRenameRequest={onRenameRequest}
                  onBecomeModerator={onBecomeModerator}
                  onRemoveModerator={onRemoveModerator}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                {actionError ? <Alert severity="error">{actionError}</Alert> : null}
                {!room.revealVotes ? (
                  <VotePicker
                    options={VOTE_OPTIONS}
                    selectedVote={currentVote}
                    disabled={isVoting}
                    onVote={onVote}
                  />
                ) : (
                  <VoteResultsPie participants={participants} />
                )}
                {isModerator ? (
                  <Stack direction="row" spacing={1}>
                    {!room.revealVotes ? (
                      <Button variant="contained" disabled={isActionMutating} onClick={onRevealVotes}>
                        Reveal votes
                      </Button>
                    ) : (
                      <Button variant="outlined" disabled={isActionMutating} onClick={onResetVotes}>
                        Reset votes
                      </Button>
                    )}
                  </Stack>
                ) : null}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PointingRoomContent;
