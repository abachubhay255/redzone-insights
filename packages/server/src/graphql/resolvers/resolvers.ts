import { getNFL } from "#s/axios.js";
import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  hello() {
    return "Hello world!";
  },
  async nflScoresWeekly({ week, season }) {
    const params = { gameWeek: week, season: season };
    const schedule = await getNFL("getNFLScoresOnly", { params: params });
    const scheduleData = Object.keys(schedule.data.body).map(key => schedule.data.body[key]);

    return scheduleData
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
  }
};
