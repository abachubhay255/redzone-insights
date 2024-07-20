import { sendMessage, uploadFiles } from "#s/openai.js";
import _ from "lodash";
import { playerGameLogs } from "./gameLogs.js";
import { playersByTeam } from "./players.js";
import testData from "#s/testdata/test.json" assert { type: "json" };
import { ToFilename } from "./utils.js";

type ProjectionsProps = {
  homeTeamId: string;
  awayTeamId: string;
};

export async function projections({ homeTeamId, awayTeamId }: ProjectionsProps) {
  // const homePlayers = await playersByTeam({ teamId: homeTeamId });
  // const awayPlayers = await playersByTeam({ teamId: awayTeamId });

  // const players = [...homePlayers, ...awayPlayers];

  // const gameLogs = await Promise.all(players.map(async (player: any) => await playerGameLogs({ playerId: player.playerId, games: 5 })));

  // const logs = gameLogs.filter(log => log && log.length > 0);

  // const logsByPlayer = _.keyBy(logs, "playerId");

  let objs = [];
  let names = [];
  for (const playerLogs of testData) {
    const playerName = playerLogs[0].playerName;
    const playerId = playerLogs[0].playerId;
    const str = playerName + "_" + playerId;
    objs.push(playerLogs);
    names.push(ToFilename(str));
  }

  const response = await uploadFiles(objs, names);

  return response;
}
