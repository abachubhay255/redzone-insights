import { PlayerGameLogs } from "#s/graphql/types-and-documents";
import { Table } from "@mantine/core";
import { NFLPosition } from "./GameLogs";
import { isNFLPasser, isNFLReceiver, isNFLRusher } from "../utils";
import { NFLStat } from "./ParlayLeg";
import { capitalize } from "lodash";

type Props = {
  logs: PlayerGameLogs[];
  position: NFLPosition;
  stat: NFLStat;
};

export function GameLogsTable({ logs, position, stat }: Props) {
  const isRusher = isNFLRusher(position ?? "RB");
  const isPasser = isNFLPasser(position ?? "QB");
  const isReceiver = isNFLReceiver(position ?? "WR");

  const [statCategory, statName] = stat.split(".");

  const statDisplayName = capitalize(statCategory) + " " + capitalize(statName);

  const rows = logs.map(log => (
    <Table.Tr ta="right" key={log.gameId}>
      <Table.Td ta="left">{new Date(log.gameDate).toLocaleDateString()}</Table.Td>
      <Table.Td ta="left">
        {log.teamKey} {log.isHome ? "vs" : "@"} {log.oppKey}
      </Table.Td>
      <Table.Td c="blue">{log[statCategory as keyof PlayerGameLogs]?.[statName]}</Table.Td>
      {isPasser && (
        <>
          <Table.Td>{log.passing?.yards ?? 0}</Table.Td>
          <Table.Td>{log.passing?.touchdowns ?? 0}</Table.Td>
        </>
      )}
      {isRusher && (
        <>
          <Table.Td>{log.rushing?.yards ?? 0}</Table.Td>
          <Table.Td>{log.rushing?.touchdowns ?? 0}</Table.Td>
        </>
      )}
      {isReceiver && (
        <>
          <Table.Td>{log.receiving?.yards ?? 0}</Table.Td>
          <Table.Td>{log.receiving?.touchdowns ?? 0}</Table.Td>
        </>
      )}
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Matchup</Table.Th>
          <Table.Th c="blue">{statDisplayName}</Table.Th>
          {isPasser && (
            <>
              <Table.Th>Passing Yards</Table.Th>
              <Table.Th>Passing TDs</Table.Th>
            </>
          )}
          {isRusher && (
            <>
              <Table.Th>Rushing Yards</Table.Th>
              <Table.Th>Rushing TDs</Table.Th>
            </>
          )}
          {isReceiver && (
            <>
              <Table.Th>Receiving Yards</Table.Th>
              <Table.Th>Receiving TDs</Table.Th>
            </>
          )}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
