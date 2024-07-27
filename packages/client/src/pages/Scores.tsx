import { WeekSelect } from "#s/components/WeekSelect";
import { useCallback, useMemo, useState } from "react";
import { formatGameDay, formatGameTime, formatRecord, getNFLWeek } from "./utils";
import { Card, Center, Group, Image, Stack, Title } from "@mantine/core";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { GetScoresDocument, GetTeamsWithoutStatsDocument } from "#s/graphql/types-and-documents";
import { AppLoader } from "#s/components/AppLoader";
import { keyBy } from "lodash";
import { useMobile } from "#s/hooks/useMobile";

export function Scores() {
  const [week, setWeek] = useState(getNFLWeek(new Date()));

  const { data, isLoading } = useGraphQL(GetScoresDocument, { week: week });

  const scores = useMemo(() => data?.nflScoresWeekly ?? [], [data]);

  const { data: teams, isLoading: teamsLoading } = useGraphQL(GetTeamsWithoutStatsDocument, {});

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

  const getTeamScore = useCallback(
    (pts?: number | null, status?: string | null, id?: string | null) => {
      const { wins, losses, ties } = teamsById[id ?? ""] ?? {};
      if (status === "Not Started Yet") return formatRecord(wins || 0, losses || 0, ties || 0);
      return pts;
    },
    [teamsById]
  );

  return (
    <>
      <Center mb="md">
        <WeekSelect week={week} setWeek={setWeek} />
      </Center>
      {(isLoading || teamsLoading) && <AppLoader />}
      <Stack>
        {scores.map(score => (
          <Group key={score?.gameId} gap={0} justify="center" align="center">
            <Card w={{ base: "50%", sm: "75%" }} h={CARD_HEIGHT}>
              <Group justify="space-between">
                <Group>
                  <Image
                    visibleFrom="sm"
                    h={50}
                    w={50}
                    src={teamsById[score?.awayId ?? ""]?.logo}
                    alt={getTeamName(score?.awayId, score?.awayKey)}
                  />
                  <Title order={2}>{getTeamName(score?.awayId, score?.awayKey)}</Title>
                </Group>
                <Title>{getTeamScore(score?.awayPts, score?.gameStatus, score?.awayId)}</Title>
              </Group>
              <Group justify="space-between">
                <Group>
                  <Image
                    visibleFrom="sm"
                    h={50}
                    w={50}
                    src={teamsById[score?.homeId ?? ""]?.logo}
                    alt={getTeamName(score?.homeId, score?.homeKey)}
                  />
                  <Title order={2}>{getTeamName(score?.homeId, score?.homeKey)}</Title>
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
    </>
  );
}

const CARD_HEIGHT = 125;
