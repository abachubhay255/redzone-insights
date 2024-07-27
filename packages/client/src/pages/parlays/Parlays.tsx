import { useState } from "react";
import { ParlayGame, ParlayGameType } from "./ParlayGame";
import { useDisclosure } from "@mantine/hooks";
import { Button, Card, Group, Modal, Stack, Text } from "@mantine/core";
import { GameSelect, NFLGame } from "#s/components/GameSelect";

export function Parlays() {
  const [parlayGames, setParlayGames] = useState<ParlayGameType[]>([]);

  const [opened, { open, close }] = useDisclosure(false);

  const addGame = (game: NFLGame) => {
    setParlayGames([...parlayGames, { gameInfo: game, parlayLegs: [] }]);
  };

  return (
    <>
      <Modal size={"xl"} opened={opened} onClose={close} title="Select Game">
        <GameSelect close={close} setGame={addGame} />
      </Modal>
      <Stack>
        {parlayGames.map(game => (
          <ParlayGame key={game.gameInfo?.gameId} gameInfo={game.gameInfo} parlayLegs={game.parlayLegs} />
        ))}
      </Stack>
      <Button onClick={open}>Add Game</Button>
    </>
  );
}
