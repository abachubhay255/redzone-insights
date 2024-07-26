import { Table, Card, Title, Button, ScrollArea } from "@mantine/core";
import { IconSortDescending, IconSortAscending } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import { StandingsType } from "./Standings";

type StandingsTableProps = {
  standings: StandingsType[];
  title?: string | null;
};

type StandingKey = keyof StandingsType;

export function StandingsTable({ standings, title }: StandingsTableProps) {
  const [sortKey, setSortKey] = useState<StandingKey>("PCT");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const sortedStandings = useMemo(() => sortTable(standings, sortKey, sortDirection), [standings, sortKey, sortDirection]);

  const rows = sortedStandings.map(team => (
    <Table.Tr key={team?.id}>
      {Object.keys(team ?? {}).map((key, i) => (
        <Table.Td ta={i === 1 ? "left" : "center"} w={i === 1 ? 500 : 100} hidden={key === "id"} key={key}>
          {(team as any)?.[key].toString()}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <>
      <Card bg="dark">
        <Title ta="center" order={2}>
          {title}
        </Title>
      </Card>
      <ScrollArea.Autosize mah="75vh" type="never">
        <Table striped highlightOnHover highlightOnHoverColor="gray">
          <Table.Thead>
            <Table.Tr>
              {Object.keys(standings[0] ?? {}).map((key, i) => (
                <Table.Th ta={i === 1 ? "left" : "center"} hidden={key === "id"} key={key}>
                  <Button
                    size="compact-sm"
                    ta={i === 1 ? "left" : "center"}
                    variant="subtle"
                    onClick={() => {
                      if (sortKey === key) {
                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                        return;
                      }
                      setSortKey(key as StandingKey);
                      setSortDirection("desc");
                    }}
                    rightSection={
                      sortKey === key ? (
                        sortDirection === "desc" ? (
                          <IconSortDescending size={18} />
                        ) : (
                          <IconSortAscending size={18} />
                        )
                      ) : undefined
                    }
                  >
                    {key}
                  </Button>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea.Autosize>
    </>
  );
}

function sortTable(standings: StandingsType[], sortKey: StandingKey, sortDirection: "asc" | "desc") {
  return standings.toSorted((a, b) => {
    let aVal = (sortDirection === "asc" ? a[sortKey] : b[sortKey]) ?? "";
    let bVal = (sortDirection === "asc" ? b[sortKey] : a[sortKey]) ?? "";
    if (sortKey === "Name" && typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal);
    }
    if (sortKey === "Streak" && typeof aVal === "string" && typeof bVal === "string") {
      const letterA = aVal[0];
      const letterB = bVal[0];
      const numA = Number(aVal[1]);
      const numB = Number(bVal[1]);

      if (letterA === letterB) {
        return letterA === "W" ? numA - numB : numB - numA;
      } else if (letterA === "L") {
        return -1; // 'L' should come before 'W'
      } else {
        return 1; // 'W' should come after 'L'
      }
    }

    return Number(aVal) - Number(bVal);
  });
}
