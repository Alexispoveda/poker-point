import { useMemo } from "react";

import type { Participant, ParticipantVote } from "~/pointing/model";

export type VoteSlice = {
  vote: Exclude<ParticipantVote, null>;
  count: number;
  fraction: number;
  color: string;
  voters: string[];
};

export type ChartSlice = {
  id: number;
  value: number;
  label: string;
  color: string;
  voters: string[];
};

const SLICE_COLORS = [
  "#1f77b4",
  "#2ca02c",
  "#ff7f0e",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#17becf",
];

const toVoteSlices = (participants: Participant[]): VoteSlice[] => {
  const tally = new Map<Exclude<ParticipantVote, null>, { count: number; voters: string[] }>();

  for (const participant of participants) {
    if (!participant.vote) {
      continue;
    }

    const previous = tally.get(participant.vote);
    if (!previous) {
      tally.set(participant.vote, {
        count: 1,
        voters: [participant.name],
      });
      continue;
    }

    tally.set(participant.vote, {
      count: previous.count + 1,
      voters: [...previous.voters, participant.name],
    });
  }

  const totalVotes = Array.from(tally.values()).reduce((sum, value) => sum + value.count, 0);
  if (totalVotes === 0) {
    return [];
  }

  return Array.from(tally.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([vote, value], index) => ({
      vote,
      count: value.count,
      fraction: value.count / totalVotes,
      color: SLICE_COLORS[index % SLICE_COLORS.length],
      voters: value.voters,
    }));
};

export const votersHoverText = (slice: VoteSlice): string => {
  if (slice.voters.length === 0) {
    return `Vote ${slice.vote}: no voters`;
  }

  return `Vote ${slice.vote}: ${slice.voters.join(", ")}`;
};

export const useVoteResultsData = (participants: Participant[]) => {
  return useMemo(() => {
    const slices = toVoteSlices(participants);
    const totalVotes = slices.reduce((sum, slice) => sum + slice.count, 0);

    const chartData: ChartSlice[] = slices.map((slice, index) => ({
      id: index,
      value: slice.count,
      label: `${slice.vote} points`,
      color: slice.color,
      voters: slice.voters,
    }));

    const votersTextById = new Map<unknown, string>(
      chartData.map((slice) => [
        slice.id,
        slice.voters.length > 0
          ? `${slice.value} vote(s): ${slice.voters.join(", ")}`
          : `${slice.value} vote(s)`,
      ]),
    );

    const votersTextByLabel = new Map<string, string>(
      chartData.map((slice) => [
        slice.label,
        slice.voters.length > 0
          ? `${slice.value} vote(s): ${slice.voters.join(", ")}`
          : `${slice.value} vote(s)`,
      ]),
    );

    return {
      slices,
      totalVotes,
      chartData,
      votersTextById,
      votersTextByLabel,
    };
  }, [participants]);
};
