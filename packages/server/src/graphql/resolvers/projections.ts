import { sendMessage, uploadFiles } from "#s/openai.js";
import _ from "lodash";
import { playerGameLogs } from "./gameLogs.js";
import { playersByTeam } from "./players.js";

type ProjectionsProps = {
  homeTeamId: string;
  awayTeamId: string;
};

export async function projections({ homeTeamId, awayTeamId }: ProjectionsProps) {
  const homePlayers = await playersByTeam({ teamId: homeTeamId });
  const awayPlayers = await playersByTeam({ teamId: awayTeamId });

  const players = [...homePlayers, ...awayPlayers];

  const gameLogs = await Promise.all(players.map(async (player: any) => await playerGameLogs({ playerId: player.playerId, games: 5 })));

  const logs = gameLogs.filter(log => log && log.length > 0);

  const logsByPlayer = _.keyBy(logs, "playerId");

  let objs = [];
  let ids = [];
  for (const playerId in logsByPlayer) {
    const playerLogs = logsByPlayer[playerId];
    objs.push(playerLogs);
    ids.push(playerId);
  }

  await uploadFiles(objs, ids);

  const message = `project the stats of these players ${ids.toString()} in their next game`;

  const response = await sendMessage(message);
  return response;
}
