import { getNFLData } from "#s/axios.js";
import { toNum } from "./utils.js";

type ScoresProps = {
  week: number;
  season: number;
};

export async function nflScoresWeekly({ week, season }: ScoresProps) {
  const params = { gameWeek: week, season: season };
  const scores = await getNFLData("getNFLScoresOnly", params);
  const scoresData = Object.keys(scores.body).map(key => scores.body[key]);

  return scoresData
    .map((game: any) => ({
      gameId: game.gameID,
      gameEpoch: new Date(toNum(game.gameTime_epoch) * 1000),
      homeKey: game.home,
      awayKey: game.away,
      homeId: game.teamIDHome,
      awayId: game.teamIDAway,
      gameStatus: game.gameStatus,
      awayPts: toNum(game.awayPts),
      homePts: toNum(game.homePts),
      gameClock: game.gameClock
    }))
    .sort((a, b) => a.gameEpoch.getTime() - b.gameEpoch.getTime());
}
