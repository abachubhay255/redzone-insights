import { PlayerProjection as PlayerProjectionType, PlayerProjectionDocument } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { Badge, Box, Card, Group, Indicator, Loader, Text, ThemeIcon } from "@mantine/core";
import { NFLStat } from "./ParlayLeg";
import { useMemo } from "react";
import { IconAi } from "@tabler/icons-react";

type Props = {
  playerName: string;
  isHome: boolean;
  oppKey: string;
  stat: NFLStat;
};

export function PlayerProjection({ playerName, isHome, oppKey, stat }: Props) {
  const { data, isLoading } = useGraphQL(PlayerProjectionDocument, { playerName: playerName, isHome: isHome, oppKey: oppKey });

  const [statCategory, statName] = stat.split(".");

  const playerProjection = data?.playerProjection as PlayerProjectionType;

  const cat = statCategory as keyof Omit<PlayerProjectionType, "playerName" | "__typename">;

  const name = statName as keyof PlayerProjectionType[typeof cat];

  const projection = useMemo(() => playerProjection?.[cat]?.[name] as unknown as number, [playerProjection, cat, name]);

  if (isLoading) {
    return (
      <Group>
        <Loader type="dots" />
        <Text size="xs">Its big inside Peyton's forehead...</Text>
      </Group>
    );
  }

  if (!projection) {
    return <></>;
  }
  return (
    <Indicator
      offset={-2}
      label={
        <Badge variant="gradient" p={0}>
          AI Projected
        </Badge>
      }
      size={20}
    >
      <Card bg="dark" withBorder p={5} w={175}>
        <Text ta="center" fw={500}>
          {projection} {name || "yards"}
        </Text>
      </Card>
    </Indicator>
  );
}
