import { AppLoader } from "#s/components/AppLoader";
import { GetTeamsWithStatsDocument, GetTeamsWithStatsQuery } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { Group, SegmentedControl, Stack, Switch, Text } from "@mantine/core";
import { keyBy } from "lodash";
import { useMemo, useState } from "react";
import { StandingsTable } from "./StandingsTable";

export function Standings() {
  const { data, isLoading } = useGraphQL(GetTeamsWithStatsDocument, {});

  const teams: GetTeamsWithStatsQuery["teams"] = useMemo(() => data?.teams ?? [], [data]);

  const [showMoreStats, setShowMoreStats] = useState(false);

  const [statMode, setStatMode] = useState("perGame");

  const standings = useMemo(() => getStandings(teams, statMode, showMoreStats), [teams, showMoreStats, statMode]); // grouped by division by default

  const teamsById = useMemo(() => keyBy(teams, "id"), [teams]);

  const [grouping, setGrouping] = useState("division");

  const tables = useMemo(() => {
    if (grouping === "division") {
      const divisions = [];
      for (let i = 0; i < standings.length; i += 4) {
        const team = teamsById[standings[i]?.id ?? ""];
        const title = team?.conferenceKey + " " + team?.division;
        const table = standings.slice(i, i + 4);
        divisions.push({ title: title, table: table });
      }
      return divisions;
    }

    if (grouping === "conference") {
      const conferences = [];
      for (let i = 0; i < standings.length; i += 16) {
        const team = teamsById[standings[i]?.id ?? ""];
        const title = team?.conference;
        conferences.push({ title: title, table: standings.slice(i, i + 16) });
      }
      return conferences;
    }

    return [{ title: "National Football League", table: standings }];
  }, [grouping, standings, teamsById]);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <Stack>
      <Group>
        <SegmentedControl
          data={[
            { value: "division", label: "Division" },
            { value: "conference", label: "Conference" },
            { value: "league", label: "League" }
          ]}
          value={grouping}
          onChange={setGrouping}
          color="blue"
          w={{ base: "100%", sm: "50%" }}
          mr="auto"
        />
        <SegmentedControl
          data={[
            { value: "perGame", label: "Per Game" },
            { value: "total", label: "Total" }
          ]}
          value={statMode}
          onChange={setStatMode}
          w={200}
          color="gray"
        />
        <Switch
          label={
            <Text size="sm" fw={500}>
              More Stats
            </Text>
          }
          checked={showMoreStats}
          onChange={e => setShowMoreStats(e.currentTarget.checked)}
        />
      </Group>

      {tables.map(({ title, table }) => (
        <StandingsTable key={title} standings={table} title={title} />
      ))}
    </Stack>
  );
}

function calculateWinningPercentage(wins: number, losses: number, ties: number) {
  return (wins + ties / 2) / (wins + losses + ties);
}

function getStandings(teams: GetTeamsWithStatsQuery["teams"], statMode: string, moreStats?: boolean) {
  return (
    teams?.map(team => {
      const m = statMode === "perGame" ? 1 : (team?.games ?? 0);
      const standardStats = {
        id: team?.id,
        Name: team?.city + " " + team?.name,
        W: team?.wins,
        L: team?.losses,
        T: team?.ties,
        PCT: calculateWinningPercentage(team?.wins || 0, team?.losses || 0, team?.ties || 0).toFixed(3),
        PF: getStat(team?.pointsFor, m),
        PA: getStat(team?.pointsAgainst, m),
        ["Net Pts"]: getStat((team?.pointsFor ?? 0) - (team?.pointsAgainst ?? 0), m).toFixed(m !== 1 ? 0 : 1),
        Streak: team?.streak
      };
      const additionalStats = {
        ["Rush Yds"]: getStat(team?.statsPerGame?.rushYards, m),
        ["Rush TDs"]: getStat(team?.statsPerGame?.rushTds, m),
        ["Pass Yds"]: getStat(team?.statsPerGame?.passYards, m),
        ["Pass TDs"]: getStat(team?.statsPerGame?.passTds, m),
        ["Allowed Rush Yds"]: getStat(team?.statsPerGame?.allowedRushYards, m),
        ["Allowed Rush TDs"]: getStat(team?.statsPerGame?.allowedRushTds, m),
        ["Allowed Pass Yds"]: getStat(team?.statsPerGame?.allowedPassYards, m),
        ["Allowed Pass TDs"]: getStat(team?.statsPerGame?.allowedPassTds, m)
      };
      return moreStats ? { ...standardStats, ...additionalStats } : standardStats;
    }) ?? []
  );
}

function getStat(number: number | undefined | null, multiplier: number) {
  const float = (number ?? 0) * multiplier;
  return multiplier === 1 ? float : Math.round(float);
}

export type StandingsType = ReturnType<typeof getStandings>[0];
