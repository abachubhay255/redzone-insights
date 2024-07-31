import { useCallback, useMemo, useState } from "react";
import { ParlayGame, ParlayGameType } from "./ParlayGame";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Button, Card, Modal, Stack, Title } from "@mantine/core";
import { GameSelect, NFLGame } from "#s/components/GameSelect";
import { IconTrash } from "@tabler/icons-react";
import { ParlayLegType } from "./ParlayLeg";

export function Parlays() {
  const [parlayGames, setParlayGames] = useState<ParlayGameType[]>([]);

  const [opened, { open, close }] = useDisclosure(false);

  const addGame = useCallback(
    (game: NFLGame) => {
      setParlayGames([...parlayGames, { gameInfo: game, parlayLegs: [] }]);
    },
    [parlayGames, setParlayGames]
  );

  const deleteGame = useCallback(
    (gameId?: string | null) => {
      setParlayGames(parlayGames.filter(game => game.gameInfo?.gameId !== gameId));
    },
    [parlayGames, setParlayGames]
  );

  const updateParlayLegs = useCallback(
    (gameId: string | null | undefined, legs: ParlayLegType[]) => {
      setParlayGames(
        parlayGames.map(game => {
          if (game.gameInfo?.gameId === gameId) {
            return { ...game, parlayLegs: legs };
          }
          return game;
        })
      );
    },
    [parlayGames, setParlayGames]
  );

  const selectedGameIds = useMemo(() => new Set(parlayGames.map(game => game.gameInfo?.gameId ?? "")), [parlayGames]);

  return (
    <Card>
      {parlayGames.length === 0 && (
        <Stack ml="auto" mr="auto">
          <Title ta="center" order={2}>
            Welcome to Parlays!
          </Title>
          <Title ta="center" fw={500} order={5}>
            Add a game to get started
          </Title>
          <Button ml="auto" mr="auto" w={125} onClick={open}>
            Add Game
          </Button>
        </Stack>
      )}
      <Stack>
        {parlayGames.map(game => (
          <Card key={game.gameInfo?.gameId} bg="dark">
            <ParlayGame
              key={game.gameInfo?.gameId}
              gameInfo={game.gameInfo}
              parlayLegs={game.parlayLegs}
              updateParlayLegs={legs => updateParlayLegs(game.gameInfo?.gameId, legs)}
            />

            <ActionIcon
              title="Delete Game"
              pos="absolute"
              top={10}
              right={10}
              size="lg"
              color="red"
              onClick={() => deleteGame(game.gameInfo?.gameId)}
            >
              <IconTrash />
            </ActionIcon>
          </Card>
        ))}
        <Modal size={"xl"} opened={opened} onClose={close} title="Select Game">
          <GameSelect close={close} setGame={addGame} selectedGameIds={selectedGameIds} />
        </Modal>
        {parlayGames.length > 0 && (
          <Button ml="auto" w={125} onClick={open}>
            Add Game
          </Button>
        )}
      </Stack>
    </Card>
  );
}
