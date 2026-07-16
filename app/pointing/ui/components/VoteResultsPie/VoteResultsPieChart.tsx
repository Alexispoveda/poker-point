import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

import type { ChartSlice } from "./useVoteResultsData";

type VoteResultsPieChartProps = {
  chartData: ChartSlice[];
  totalVotes: number;
  votersTextById: Map<unknown, string>;
  votersTextByLabel: Map<string, string>;
};

const PIE_SIZE = 260;
const PIE_INNER_RADIUS = 66;
const PIE_OUTER_RADIUS = 108;

const VoteResultsPieChart = ({
  chartData,
  totalVotes,
  votersTextById,
  votersTextByLabel,
}: VoteResultsPieChartProps) => {
  return (
    <Box sx={{ position: "relative", width: PIE_SIZE, height: PIE_SIZE }}>
      <PieChart
        width={PIE_SIZE}
        height={PIE_SIZE}
        hideLegend
        series={[
          {
            data: chartData,
            innerRadius: PIE_INNER_RADIUS,
            outerRadius: PIE_OUTER_RADIUS,
            paddingAngle: 2,
            cornerRadius: 3,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { additionalRadius: -6, color: "#dfe3e8" },
            valueFormatter: (item) => {
              const label = typeof item.label === "string" ? item.label : undefined;

              return (
                votersTextById.get(item.id) ??
                (label ? votersTextByLabel.get(label) : undefined) ??
                `${item.value} vote(s)`
              );
            },
          },
        ]}
      />
      <Stack
        spacing={0}
        sx={{
          position: "absolute",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Typography variant="h4" component="p">
          {totalVotes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          votes
        </Typography>
      </Stack>
    </Box>
  );
};

export default VoteResultsPieChart;
