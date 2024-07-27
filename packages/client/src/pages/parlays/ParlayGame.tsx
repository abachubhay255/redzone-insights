import { NFLGame } from "#s/components/GameSelect";
import { Card, Group, Text } from "@mantine/core";
import { ParlayLegType } from "./ParlayLeg";

export type ParlayGameType = {
  gameInfo: NFLGame;
  parlayLegs: ParlayLegType[];
};

export function ParlayGame({ gameInfo, parlayLegs }: ParlayGameType) {
  return (
    <Card>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-around">
          <Text fw={500}>{gameInfo?.awayKey}</Text>
          <Text fw={500}>{gameInfo?.awayPts}</Text>
        </Group>
        <Group justify="space-around">
          <Text fw={500}>{gameInfo?.homeKey}</Text>
          <Text fw={500}>{gameInfo?.homePts}</Text>
        </Group>
      </Card.Section>
    </Card>
  );
}
