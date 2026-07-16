import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type JoinRoomFormProps = {
  name: string;
  roomCode: string;
  isSubmitting: boolean;
  roomCodeErrorMessage: string;
  nameErrorMessage: string;
  onNameChange: (name: string) => void;
  onRoomCodeChange: (roomCode: string) => void;
  onSubmit: () => void;
};

const JoinRoomForm = ({
  name,
  roomCode,
  isSubmitting,
  roomCodeErrorMessage,
  nameErrorMessage,
  onNameChange,
  onRoomCodeChange,
  onSubmit,
}: JoinRoomFormProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="h2">
            Join room
          </Typography>
          <TextField
            label="Room code"
            value={roomCode}
            onChange={(event) => onRoomCodeChange(event.target.value.toUpperCase())}
            required
            fullWidth
            helperText={roomCodeErrorMessage}
            error={!!roomCodeErrorMessage}
          />
          <TextField
            label="Your name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            required
            fullWidth
            helperText={nameErrorMessage}
            error={!!nameErrorMessage}
          />
          <Button variant="outlined" onClick={onSubmit} disabled={isSubmitting} loading={isSubmitting} loadingIndicator="Joining...">
            Join room
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JoinRoomForm;
