import { getNFL } from "#s/axios.js";
import { parseGameInfo } from "./utils.js";

type GameLogsProps = {
  playerId: string;
  games: number;
};

export async function playerGameLogs({ playerId, games }: GameLogsProps) {
  const params = { playerID: playerId, numberOfGames: games };
  const gameLogs = await getNFL("getNFLGamesForPlayer", { params: params });
  const gameLogsData = Object.keys(gameLogs.data.body).map(key => gameLogs.data.body[key]);

  return gameLogsData.map((log: any) => {
    const { date, oppKey, isHome } = parseGameInfo(log.gameID, log.team);
    return {
      playerId: log.playerID,
      playerName: log.longName,
      teamId: log.teamID,
      gameId: log.gameID,
      gameDate: date,
      oppKey: oppKey,
      isHome: isHome,
      teamKey: log.team,
      passing: log.Passing && {
        yards: Number(log.Passing.passYds),
        touchdowns: Number(log.Passing.passTD),
        attempts: Number(log.Passing.passAttempts),
        completions: Number(log.Passing.passCompletions),
        interceptions: Number(log.Passing.int),
        yardsPerPass: Number(log.Passing.passAvg)
      },
      rushing: log.Rushing && {
        yards: Number(log.Rushing.rushYds),
        touchdowns: Number(log.Rushing.rushTD),
        carries: Number(log.Rushing.carries),
        yardsPerCarry: Number(log.Rushing.rushAvg)
      },
      receiving: log.Receiving && {
        yards: Number(log.Receiving.recYds),
        touchdowns: Number(log.Receiving.recTD),
        receptions: Number(log.Receiving.receptions),
        targets: Number(log.Receiving.targets),
        yardsPerCatch: Number(log.Receiving.recAvg)
      }
    };
  });
}
