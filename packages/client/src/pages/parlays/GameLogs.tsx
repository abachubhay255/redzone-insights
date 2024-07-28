import { GetGameLogsDocument, PlayerGameLogs } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { useMemo } from "react";
import { NFLStat } from "./ParlayLeg";
import { HoverCard, Loader, Text } from "@mantine/core";
import { getHitColor } from "../utils";
import { GameLogsTable } from "./GameLogsTable";

export type NFLPosition = "QB" | "RB" | "WR" | "TE";

type Props = {
  playerId: string;
  stat: NFLStat;
  overUnder: "over" | "under";
  statValue: number;
  position: NFLPosition;
};

export function GameLogs({ playerId, stat, overUnder, statValue, position }: Props) {
  const { data, isLoading } = useGraphQL(GetGameLogsDocument, { playerId: playerId });

  const gameLogs = useMemo(() => (data?.playerGameLogs ?? []) as PlayerGameLogs[], [data]);

  const hits = useMemo(() => getHitRate(gameLogs, stat, overUnder, statValue), [gameLogs, stat, overUnder, statValue]);

  if (isLoading) {
    return <Loader type="dots" />;
  }

  return (
    <>
      <HoverCard shadow="md">
        <Text>
          Hit{" "}
          <Text fw={500} span c={getHitColor(hits, 5)}>
            {hits}
          </Text>{" "}
          times in the last 5{" "}
          <HoverCard.Target>
            <Text td="underline" span>
              games
            </Text>
          </HoverCard.Target>
        </Text>
        <HoverCard.Dropdown visibleFrom="lg">
          <GameLogsTable logs={gameLogs} position={position} stat={stat} />
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
}

function getHitRate(gameLogs: PlayerGameLogs[], stat: NFLStat, overUnder: "over" | "under", statValue: number) {
  const hits = gameLogs.filter(game => {
    const [statCategory, statName] = stat.split(".");
    const playerStat = game[statCategory as keyof PlayerGameLogs]?.[statName] ?? 0;
    if (overUnder === "over") {
      return playerStat >= statValue;
    } else {
      return playerStat <= statValue;
    }
  });

  return hits.length;
}
