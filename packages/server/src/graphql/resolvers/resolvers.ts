import { IResolvers } from "@graphql-tools/utils";
import { nflScoresWeekly } from "./scores.js";
import { playerGameLogs } from "./gameLogs.js";
import { playerInfo, playersByTeam } from "./players.js";
import { projections } from "./projections.js";

export const resolvers: IResolvers = {
  nflScoresWeekly,
  playerGameLogs,
  playersByTeam,
  playerInfo,
  projections
};
