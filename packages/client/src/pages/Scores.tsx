import { WeekSelect } from "#s/components/WeekSelect";
import { useMemo, useState } from "react";
import { getNFLWeek } from "./utils";
import { Box, Card, Center, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { GetScoresDocument } from "#s/graphql/types-and-documents";
import { format } from "date-fns";
import { AppLoader } from "#s/components/AppLoader";

export function Scores() {
  const [week, setWeek] = useState(getNFLWeek(new Date()));

  const { data, isLoading } = useGraphQL(GetScoresDocument, { week: week });

  const scores = useMemo(() => data?.nflScoresWeekly ?? [], [data]);

  return (
    <>
      <Center mb="md">
        <WeekSelect week={week} setWeek={setWeek} />
      </Center>
      {isLoading && <AppLoader />}
      <Stack>
        {scores.map(score => (
          <Group key={score?.gameId} gap={0} justify="center" align="center">
            <Card w={{ base: "50%", sm: "75%" }} h={CARD_HEIGHT}>
              <Group justify="space-between">
                <Title>{score?.awayKey}</Title>
                <Title>{score?.awayPts}</Title>
              </Group>
              <Group justify="space-between">
                <Title>{score?.homeKey}</Title>
                <Title>{score?.homePts}</Title>
              </Group>
            </Card>
            <Card bg="dark" h={CARD_HEIGHT} component={Center}>
              <Title order={3}>{score?.gameClock || score?.gameStatus}</Title>
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

function formatGameTime(epoch: string) {
  const date = new Date(epoch);
  return format(date, "h:mm a");
}

function formatGameDay(epoch: string) {
  const date = new Date(epoch);
  return format(date, "eee LLLL d");
}

const CARD_HEIGHT = 125;
