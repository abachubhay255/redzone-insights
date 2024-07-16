import { IResolvers } from "@graphql-tools/utils";
import { nflScoresWeekly } from "./scores.js";
import { playerGameLogs } from "./gameLogs.js";

export const resolvers: IResolvers = {
  hello() {
    return "Hello world!";
  },
  nflScoresWeekly,
  playerGameLogs
};

const DefaultPlayerId = "3139477"; // Patrick Mahomes
