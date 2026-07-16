import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type RoomCodeDisplayProps = {
  roomCode: string;
  revealVotes: boolean;
};

const RoomCodeDisplay = ({ roomCode, revealVotes }: RoomCodeDisplayProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography variant="h4" component="h1">
        Room {roomCode}
      </Typography>
      <Chip
        color={revealVotes ? "success" : "default"}
        label={revealVotes ? "Votes revealed" : "Votes hidden"}
      />
    </Stack>
  );
};

export default RoomCodeDisplay;
