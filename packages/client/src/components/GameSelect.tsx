import { GetScoresDocument, GetScoresQuery, GetTeamsWithoutStatsDocument } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { formatGameDay, formatGameTime, formatRecord, getNFLWeek } from "#s/pages/utils";
import { Stack, Group, Card, Title, Center, Image, UnstyledButton } from "@mantine/core";
import { keyBy } from "lodash";
import { useCallback, useMemo } from "react";
import { AppLoader } from "./AppLoader";
import classes from "./GameSelect.module.css";

export type NFLGame = NonNullable<GetScoresQuery["nflScoresWeekly"]>[0];

type Props = {
  close: () => void;
  setGame: (game: NFLGame) => void;
};

export function GameSelect({ close, setGame }: Props) {
  const { data, isLoading } = useGraphQL(GetScoresDocument, { week: getNFLWeek(new Date()) });

  const scores = useMemo(() => data?.nflScoresWeekly ?? [], [data]);

  const { data: teams, isLoading: teamsLoading } = useGraphQL(GetTeamsWithoutStatsDocument, {});

  const teamsById = useMemo(() => keyBy(teams?.teams, "id"), [teams]);

  const getTeamScore = useCallback(
    (pts?: number | null, status?: string | null, id?: string | null) => {
      const { wins, losses, ties } = teamsById[id ?? ""] ?? {};
      if (status === "Not Started Yet") return formatRecord(wins || 0, losses || 0, ties || 0);
      return pts;
    },
    [teamsById]
  );

  return (
    <Stack gap="xl">
      {(isLoading || teamsLoading) && <AppLoader />}
      {scores.map(score => (
        <Group
          key={score?.gameId}
          gap={0}
          justify="center"
          align="center"
          component={UnstyledButton}
          onClick={() => {
            setGame(score);
            close();
          }}
          className={classes.game}
        >
          <Card w={{ base: "50%", sm: "75%" }} h={CARD_HEIGHT}>
            <Group justify="space-between">
              <Group>
                <Image visibleFrom="sm" h={50} w={50} src={teamsById[score?.awayId ?? ""]?.logo} alt={score?.awayKey || "Unknown"} />
                <Title order={2}>{score?.awayKey || "Unknown"}</Title>
              </Group>
              <Title>{getTeamScore(score?.awayPts, score?.gameStatus, score?.awayId)}</Title>
            </Group>
            <Group justify="space-between">
              <Group>
                <Image visibleFrom="sm" h={50} w={50} src={teamsById[score?.homeId ?? ""]?.logo} alt={score?.homeKey || "Unknown"} />
                <Title order={2}>{score?.homeKey || "Unknown"}</Title>
              </Group>
              <Title>{getTeamScore(score?.homePts, score?.gameStatus, score?.homeId)}</Title>
            </Group>
          </Card>
          <Card bg="dark" h={CARD_HEIGHT} component={Center}>
            <Title order={4}>{score?.gameClock || score?.gameStatus}</Title>
            <Title order={5} c="dimmed">
              {formatGameDay(score?.gameEpoch)}
            </Title>
            <Title order={5} c="dimmed">
              {formatGameTime(score?.gameEpoch)}
            </Title>
          </Card>
        </Group>
      ))}
    </Stack>
  );
}

const CARD_HEIGHT = 125;
