import { getNFL } from "#s/axios.js";
import { IResolvers } from "@graphql-tools/utils";
import { parseGameInfo } from "./utils.js";

export const resolvers: IResolvers = {
  hello() {
    return "Hello world!";
  },
  async nflScoresWeekly({ week, season }) {
    const params = { gameWeek: week, season: season };
    const scores = await getNFL("getNFLScoresOnly", { params: params });
    const scoresData = Object.keys(scores.data.body).map(key => scores.data.body[key]);

    return scoresData
      .map((game: any) => ({
        gameId: game.gameID,
        gameEpoch: new Date(Number(game.gameTime_epoch) * 1000),
        homeKey: game.home,
        awayKey: game.away,
        homeId: game.teamIDHome,
        awayId: game.teamIDAway,
        gameStatus: game.gameStatus,
        awayPts: Number(game.awayPts),
        homePts: Number(game.homePts),
        gameClock: game.gameClock
      }))
      .sort((a, b) => a.gameEpoch.getTime() - b.gameEpoch.getTime());
  },
  async playerGameLogs({ playerId, games }) {
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
};

const DefaultPlayerId = "3139477"; // Patrick Mahomes
