import { getNFL } from "#s/axios.js";
import { parseGameInfo, toNum } from "./utils.js";

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
        yards: toNum(log.Passing.passYds),
        touchdowns: toNum(log.Passing.passTD),
        attempts: toNum(log.Passing.passAttempts),
        completions: toNum(log.Passing.passCompletions),
        interceptions: toNum(log.Passing.int),
        yardsPerPass: toNum(log.Passing.passAvg)
      },
      rushing: log.Rushing && {
        yards: toNum(log.Rushing.rushYds),
        touchdowns: toNum(log.Rushing.rushTD),
        carries: toNum(log.Rushing.carries),
        yardsPerCarry: toNum(log.Rushing.rushAvg)
      },
      receiving: log.Receiving && {
        yards: toNum(log.Receiving.recYds),
        touchdowns: toNum(log.Receiving.recTD),
        receptions: toNum(log.Receiving.receptions),
        targets: toNum(log.Receiving.targets),
        yardsPerCatch: toNum(log.Receiving.recAvg)
      }
    };
  });
}
