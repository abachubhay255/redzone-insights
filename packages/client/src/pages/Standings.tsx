import { GetTeamsWithStatsDocument, GetTeamsWithStatsQuery } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { Table } from "@mantine/core";
import { useMemo } from "react";

export function Standings() {
  const { data, isLoading } = useGraphQL(GetTeamsWithStatsDocument, {});

  const teams: GetTeamsWithStatsQuery["teams"] = useMemo(() => data?.teams ?? [], [data]);

  const standings = useMemo(() => getStandings(teams), [teams]);

  const rows = standings.map(team => (
    <Table.Tr key={team?.Name}>
      {Object.keys(team ?? {}).map(key => (
        <Table.Td key={key}>{(team as any)?.[key].toString()}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover highlightOnHoverColor="gray">
      <Table.Thead>
        <Table.Tr>
          {Object.keys(standings[0] ?? {}).map(key => (
            <Table.Th key={key}>{key}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

function calculateWinningPercentage(wins: number, losses: number, ties: number) {
  return (wins + ties / 2) / (wins + losses + ties);
}

function getStandings(teams: GetTeamsWithStatsQuery["teams"]) {
  return (
    teams?.map(team => ({
      Name: team?.city + " " + team?.name,
      Games: team?.games,
      W: team?.wins,
      L: team?.losses,
      T: team?.ties,
      PCT: calculateWinningPercentage(team?.wins || 0, team?.losses || 0, team?.ties || 0),
      PF: team?.pointsFor,
      PA: team?.pointsAgainst,
      ["Net Pts"]: ((team?.pointsFor || 0) - (team?.pointsAgainst || 0)).toFixed(1),
      Streak: team?.streak,
      Conf: team?.conferenceKey,
      Div: team?.division
    })) ?? []
  );
}
