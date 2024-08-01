import { GetGameLogsDocument, PlayerGameLogs, Team, TeamStats } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { useMemo } from "react";
import { NFLStat } from "./ParlayLeg";
import { Card, HoverCard, Loader, Text } from "@mantine/core";
import { getPercentColor } from "../utils";
import { GameLogsTable } from "./GameLogsTable";

export type NFLPosition = "QB" | "RB" | "WR" | "TE";

type Props = {
  playerId: string;
  playerTeamId: string;
  stat: NFLStat;
  overUnder: "over" | "under";
  statValue: number;
  position: NFLPosition;
  homeTeam: Team;
  awayTeam: Team;
};

export function GameLogs({ playerId, playerTeamId, stat, overUnder, statValue, position, homeTeam, awayTeam }: Props) {
  const { data, isLoading } = useGraphQL(GetGameLogsDocument, { playerId: playerId });

  const gameLogs = useMemo(() => (data?.playerGameLogs ?? []) as PlayerGameLogs[], [data]);

  const hits = useMemo(() => getHitRate(gameLogs, stat, overUnder, statValue), [gameLogs, stat, overUnder, statValue]);

  const teamRanks = useMemo(() => {
    const home = homeTeam.statsPerGame;
    const away = awayTeam.statsPerGame;
    if (!home || !away) return null;
    return getOffDefRank(home, away, stat, playerTeamId === homeTeam.id);
  }, [homeTeam, awayTeam, stat, playerTeamId]);

  if (isLoading) {
    return <Loader type="dots" />;
  }

  return (
    <>
      <HoverCard shadow="md" position="top">
        <div>
          <Text>
            Hit{" "}
            <Text fw={500} span c={getPercentColor(hits, 5)}>
              {hits}
            </Text>{" "}
            times in the last 5{" "}
            <HoverCard.Target>
              <Text td="underline" span>
                games
              </Text>
            </HoverCard.Target>
          </Text>
          {teamRanks && (
            <Card p={1} withBorder>
              <Text ta="center" size="xs">
                <Text fw={500} c={getPercentColor(teamRanks.offRank ?? 0, 32, true)} span>{`#${teamRanks.offRank}`}</Text>
                {` ${teamRanks.stat} Off vs.  ${teamRanks.stat} Def `}
                <Text fw={500} c={getPercentColor(teamRanks.defRank ?? 0, 32)} span>{`#${teamRanks.defRank}`}</Text>
              </Text>
            </Card>
          )}
        </div>
        <HoverCard.Dropdown>
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

function getOffDefRank(home: TeamStats, away: TeamStats, stat: NFLStat, isHome: boolean) {
  const offTeam = isHome ? home : away;
  const defTeam = isHome ? away : home;
  const statCategory = stat.startsWith("rushing") ? "rush" : "pass";
  if (statCategory === "rush") {
    const offRank = offTeam.rushOffenseRank;
    const defRank = defTeam.rushDefenseRank;
    return { offRank: offRank, defRank: defRank, stat: "Rush" };
  } else {
    const offRank = offTeam.passOffenseRank;
    const defRank = defTeam.passDefenseRank;
    return { offRank: offRank, defRank: defRank, stat: "Pass" };
  }
}
