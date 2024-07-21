import { IResolvers } from "@graphql-tools/utils";
import { nflScoresWeekly } from "./scores.js";
import { playerGameLogs } from "./gameLogs.js";
import { playerInfo, playersByTeam } from "./players.js";
import { playerProjection, updateProjectionsModel } from "./projections.js";
import { teams } from "./teams.js";

export const resolvers: IResolvers = {
  hello: () => "Hello world!",
  nflScoresWeekly,
  playerGameLogs,
  playersByTeam,
  playerInfo,
  updateProjectionsModel,
  playerProjection,
  teams
};
