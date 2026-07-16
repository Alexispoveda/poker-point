import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import RoomCodeDisplay from "~/pointing/ui/components/RoomCodeDisplay";

type PointingJoinRoomCardProps = {
  roomCode: string;
  revealVotes: boolean;
  nameDraft: string;
  actionError: string;
  isActionMutating: boolean;
  onNameDraftChange: (value: string) => void;
  onJoinRoom: () => void;
};

const PointingJoinRoomCard = ({
  roomCode,
  revealVotes,
  nameDraft,
  actionError,
  isActionMutating,
  onNameDraftChange,
  onJoinRoom,
}: PointingJoinRoomCardProps) => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <RoomCodeDisplay roomCode={roomCode} revealVotes={revealVotes} />
            <Typography variant="h6" component="h2">
              Join this room
            </Typography>
            <TextField
              label="Your name"
              value={nameDraft}
              onChange={(event) => onNameDraftChange(event.target.value)}
              required
              fullWidth
            />
            {actionError ? <Alert severity="error">{actionError}</Alert> : null}
            <Button variant="contained" onClick={onJoinRoom} disabled={isActionMutating}>
              {isActionMutating ? "Joining..." : "Join room"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PointingJoinRoomCard;
