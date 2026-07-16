import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { votersHoverText, type VoteSlice } from "./useVoteResultsData";

type VoteResultsPieLegendProps = {
  slices: VoteSlice[];
};

const VoteResultsPieLegend = ({ slices }: VoteResultsPieLegendProps) => {
  return (
    <Stack spacing={1} sx={{ width: "100%", maxWidth: 420 }}>
      {slices.map((slice) => {
        const percentage = Math.round(slice.fraction * 100);
        return (
          <Stack
            key={`legend-${slice.vote}`}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            title={votersHoverText(slice)}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "2px",
                  backgroundColor: slice.color,
                }}
              />
              <Typography variant="body1">{slice.vote} points</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {slice.count} ({percentage}%)
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default VoteResultsPieLegend;
