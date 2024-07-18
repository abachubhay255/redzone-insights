import { IResolvers } from "@graphql-tools/utils";
import { nflScoresWeekly } from "./scores.js";
import { playerGameLogs } from "./gameLogs.js";
import { playerInfo, playersByTeam } from "./players.js";

export const resolvers: IResolvers = {
  hello() {
    return "Hello world!";
  },
  nflScoresWeekly,
  playerGameLogs,
  playersByTeam,
  playerInfo
};
