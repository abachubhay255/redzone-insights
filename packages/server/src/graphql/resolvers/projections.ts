import { sendMessage, uploadFiles } from "#s/openai.js";
import _ from "lodash";
import { playerGameLogs } from "./gameLogs.js";
import { playersByTeam } from "./players.js";
import { parseJsonResponse, ToFilename } from "./utils.js";
import { teams } from "./teams.js";

type ProjectionsProps = {
  homeTeamId: string;
  awayTeamId: string;
};

export async function updateProjectionsModel({ homeTeamId, awayTeamId }: ProjectionsProps) {
  if (!homeTeamId || !awayTeamId) {
    return "No team ID provided";
  }
  const homePlayers = await playersByTeam({ teamId: homeTeamId });
  const awayPlayers = await playersByTeam({ teamId: awayTeamId });

  const players = [...homePlayers, ...awayPlayers];

  const gameLogs = await Promise.all(players.map(async (player: any) => await playerGameLogs({ playerId: player.playerId, games: 5 })));

  const logs = gameLogs.filter(log => log && log.length > 0);

  let objs = [];
  let names = [];
  for (const playerLogs of logs) {
    const playerName = playerLogs[0].playerName;
    const playerId = playerLogs[0].playerId;
    const str = playerName + "_" + playerId;
    objs.push(playerLogs);
    names.push(ToFilename(str));
  }

  const teamStats = await teams();
  objs.push(teamStats);
  names.push(ToFilename("teamStats"));

  const response = await uploadFiles(objs, names);

  return response;
}

type PlayerProjectionProps = {
  playerName: string;
  isHome: boolean;
  oppKey: string;
};

export async function playerProjection({ playerName, isHome, oppKey }: PlayerProjectionProps) {
  if (!playerName || !oppKey) {
    throw new Error("No player name or opponent key provided");
  }
  const response = await sendMessage(`project the stats for ${playerName} for a(n) ${isHome ? "home" : "away"} game against ${oppKey}`);
  if (!response) {
    throw new Error("No response from OpenAI API");
  }
  const projection = parseJsonResponse(response ?? "");
  return projection;
}
