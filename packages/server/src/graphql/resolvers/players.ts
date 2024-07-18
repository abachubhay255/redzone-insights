import { getNFL } from "#s/axios.js";
import { getPlayer } from "./utils.js";

type PlayersByTeamProps = {
  teamId: string;
};

export async function playersByTeam({ teamId }: PlayersByTeamProps) {
  const params = { teamID: teamId, getStats: "false" };
  const resp = await getNFL("getNFLTeamRoster", { params: params });
  const rosterData = resp.data.body.roster.filter((player: any) => skillPositions.has(player.pos));
  return rosterData.map(getPlayer);
}

const skillPositions = new Set(["QB", "RB", "WR", "TE"]);

type PlayerProps = {
  playerId?: string;
  playerName?: string;
};

export async function playerInfo({ playerId, playerName }: PlayerProps) {
  if (!playerId && !playerName) {
    throw new Error("Must provide playerId or playerName");
  }
  const params = { playerName: playerName, playerID: playerId, getStats: "false" };
  const resp = await getNFL("getNFLPlayerInfo", { params: params });
  const players = resp.data.body;
  return getPlayer(playerId ? players : players[0]);
}
