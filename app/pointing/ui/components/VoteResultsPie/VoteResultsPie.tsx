import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Participant } from "~/pointing/model";
import VoteResultsPieChart from "~/pointing/ui/components/VoteResultsPie/VoteResultsPieChart";
import VoteResultsPieEmptyState from "~/pointing/ui/components/VoteResultsPie/VoteResultsPieEmptyState";
import VoteResultsPieLegend from "~/pointing/ui/components/VoteResultsPie/VoteResultsPieLegend";
import { useVoteResultsData } from "~/pointing/ui/components/VoteResultsPie/useVoteResultsData";

type VoteResultsPieProps = {
  participants: Participant[];
};

const VoteResultsPie = ({ participants }: VoteResultsPieProps) => {
  const { slices, totalVotes, chartData, votersTextById, votersTextByLabel } = useVoteResultsData(participants);

  if (slices.length === 0) {
    return <VoteResultsPieEmptyState />;
  }

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Typography variant="h5" component="h2">
        Results
      </Typography>
      <VoteResultsPieChart
        chartData={chartData}
        totalVotes={totalVotes}
        votersTextById={votersTextById}
        votersTextByLabel={votersTextByLabel}
      />
      <VoteResultsPieLegend slices={slices} />
    </Stack>
  );
};

export default VoteResultsPie;
