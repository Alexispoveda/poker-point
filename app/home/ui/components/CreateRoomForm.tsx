import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type CreateRoomFormProps = {
  name: string;
  isSubmitting: boolean;
  errorMessage: string;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
};

const CreateRoomForm = ({
  name,
  isSubmitting,
  errorMessage,
  onNameChange,
  onSubmit,
}: CreateRoomFormProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="h2">
            Create room
          </Typography>
          <TextField
            label="Your name"
            helperText={errorMessage || "This will be your name in the room, not the name of the room. Rooms do not have names."}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            required
            fullWidth
            error={!!errorMessage}
          />
          <Button variant="contained" onClick={onSubmit} disabled={isSubmitting} loading={isSubmitting} loadingIndicator="Creating...">
            Create room
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CreateRoomForm;
