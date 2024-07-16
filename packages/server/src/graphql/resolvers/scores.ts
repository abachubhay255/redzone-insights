import { getNFL } from "#s/axios.js";

type ScoresProps = {
  week: number;
  season: number;
};

export async function nflScoresWeekly({ week, season }: ScoresProps) {
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
}
