import { NFLGame } from "#s/components/GameSelect";
import { ActionIcon, Box, Button, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { ParlayLeg, ParlayLegType } from "./ParlayLeg";
import { formatGameDay, formatGameTime, formatRecord } from "../utils";
import { v4 } from "uuid";
import { useCallback, useMemo } from "react";
import { IconAt, IconTrash } from "@tabler/icons-react";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { GetTeamsWithoutStatsDocument, UpdateProjectionsDocument } from "#s/graphql/types-and-documents";
import { useMobile } from "#s/hooks/useMobile";
import { keyBy } from "lodash";
import { AppLoader } from "#s/components/AppLoader";

export type ParlayGameType = {
  gameInfo: NFLGame;
  parlayLegs: ParlayLegType[];
};

type Props = ParlayGameType & {
  updateParlayLegs: (legs: ParlayLegType[]) => void;
};

export function ParlayGame({ gameInfo, parlayLegs, updateParlayLegs }: Props) {
  const { data } = useGraphQL(UpdateProjectionsDocument, {
    homeTeamId: gameInfo?.homeId ?? "",
    awayTeamId: gameInfo?.awayId ?? ""
  });
  const { data: teams } = useGraphQL(GetTeamsWithoutStatsDocument, {});

  const teamsById = useMemo(() => keyBy(teams?.teams, "id"), [teams]);

  const isMobile = useMobile();

  const getTeamName = useCallback(
    (id?: string | null, key?: string | null) => {
      const abbr = key || "Unknown";
      if (isMobile) return abbr;
      if (!id) return abbr;
      const city = teamsById[id]?.city ?? "";
      const name = teamsById[id]?.name ?? "";
      if (!city && !name) return abbr;
      return city + " " + name;
    },
    [teamsById, isMobile]
  );

  const getTeamRecord = useCallback(
    (id?: string | null) => {
      if (isMobile) return "";
      const { wins, losses, ties } = teamsById[id ?? ""] ?? {};
      return `(${formatRecord(wins || 0, losses || 0, ties || 0)})`;
    },
    [teamsById, isMobile]
  );

  const addParlayLeg = useCallback(() => {
    updateParlayLegs([...parlayLegs, { id: v4(), ...newParlayLeg }]);
  }, [parlayLegs]);

  const deleteParlayLeg = useCallback(
    (legId: string) => {
      updateParlayLegs(parlayLegs.filter(leg => leg.id !== legId));
    },
    [parlayLegs]
  );

  const updateParlayLeg = useCallback(
    (legId: string, leg: Partial<ParlayLegType>) => {
      updateParlayLegs(parlayLegs.map(l => (l.id === legId ? { ...l, ...leg } : l)));
    },
    [parlayLegs]
  );

  return (
    <>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-evenly">
          {!isMobile && (
            <Group>
              <Image h={50} src={teamsById[gameInfo?.awayId ?? ""]?.logo} alt={getTeamName(gameInfo?.awayId, gameInfo?.awayKey)} />{" "}
              <IconAt />
              <Image h={50} src={teamsById[gameInfo?.homeId ?? ""]?.logo} alt={getTeamName(gameInfo?.homeId, gameInfo?.homeKey)} />
            </Group>
          )}
          <Title order={3}>
            {getTeamRecord(gameInfo?.awayId)} {getTeamName(gameInfo?.awayId, gameInfo?.awayKey)} @{" "}
            {getTeamName(gameInfo?.homeId, gameInfo?.homeKey)} {getTeamRecord(gameInfo?.homeId)}
          </Title>
          <Box>
            <Text fw={500}>{formatGameDay(gameInfo?.gameEpoch)}</Text>
            <Text fw={500}>{formatGameTime(gameInfo?.gameEpoch)}</Text>
          </Box>
        </Group>
      </Card.Section>
      <Stack my="sm">
        {parlayLegs.map(leg => (
          <Card p="xs" bg="dark.9" key={leg.id}>
            <ParlayLeg gameInfo={gameInfo} updateParlayLeg={l => updateParlayLeg(leg.id, l)} {...leg} />
            <ActionIcon
              title="Delete Leg"
              pos="absolute"
              top={10}
              right={10}
              size="lg"
              variant="light"
              color="red"
              onClick={() => deleteParlayLeg(leg.id)}
            >
              <IconTrash />
            </ActionIcon>
          </Card>
        ))}
        <Button w={100} mr="auto" ml="auto" variant="light" onClick={addParlayLeg}>
          Add Leg
        </Button>
      </Stack>
    </>
  );
}

const newParlayLeg: Omit<ParlayLegType, "id"> = {
  playerId: "",
  playerName: "",
  stat: "passing.yards",
  overUnder: "over" as const,
  statValue: 224.5
};
