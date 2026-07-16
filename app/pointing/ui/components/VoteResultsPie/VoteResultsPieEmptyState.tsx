import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const VoteResultsPieEmptyState = () => {
  return (
    <Stack spacing={1} sx={{ alignItems: "center", py: 4 }}>
      <Typography variant="h5" component="h2">
        Results
      </Typography>
      <Typography color="text.secondary">No votes submitted.</Typography>
    </Stack>
  );
};

export default VoteResultsPieEmptyState;
