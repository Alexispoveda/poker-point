import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import type { ParticipantVote } from "~/pointing/model";

type VoteOption = Exclude<ParticipantVote, null>;

type VotePickerProps = {
  options: readonly VoteOption[];
  selectedVote: ParticipantVote;
  disabled: boolean;
  onVote: (vote: ParticipantVote) => void;
};

const VotePicker = ({ options, selectedVote, disabled, onVote }: VotePickerProps) => {
  return (
    <Stack spacing={1.5}>
      <Typography variant="h6" component="h2">
        Your vote
      </Typography>
      <Grid container spacing={1.5}>
        {options.map((option) => {
          const isActive = selectedVote === option;
          return (
            <Grid key={option} size={{ xs: 6, md: 4 }}>
              <Card
                variant={isActive ? "elevation" : "outlined"}
                sx={{
                  position: "relative",
                  borderWidth: isActive ? 3 : 1,
                  borderStyle: "solid",
                  borderColor: isActive ? "primary.main" : "divider",
                  backgroundColor: isActive ? "primary.50" : "background.paper",
                  transform: isActive ? "scale(1.03)" : "scale(1)",
                  boxShadow: isActive ? 8 : 0,
                  transition: "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
                }}
              >
                <CardActionArea disabled={disabled} onClick={() => onVote(option)}>
                  <CardContent sx={{ py: 4, textAlign: "center" }}>
                    {isActive ? (
                      <CheckCircleIcon
                        color="primary"
                        fontSize="small"
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      />
                    ) : null}
                    <Typography
                      variant="h3"
                      component="span"
                      color={isActive ? "primary.main" : "text.primary"}
                      sx={{ fontWeight: isActive ? 800 : 500 }}
                    >
                      {option}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default VotePicker;
