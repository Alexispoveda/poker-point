import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

type RoomCodeDisplayProps = {
  roomCode: string;
  revealVotes: boolean;
};

const RoomCodeDisplay = ({ roomCode, revealVotes }: RoomCodeDisplayProps) => {
  const handleCopyRoomUrl = async () => {
    if (typeof window === "undefined") {
      return;
    }

    const url = `${window.location.origin}/pointing/${roomCode}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography variant="h4" component="h1">
        Room {roomCode}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Chip
          color={revealVotes ? "success" : "default"}
          label={revealVotes ? "Votes revealed" : "Votes hidden"}
        />
        <Tooltip title="Copy room URL">
          <IconButton aria-label="copy room URL" size="small" onClick={handleCopyRoomUrl}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default RoomCodeDisplay;
