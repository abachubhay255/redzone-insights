import { IResolvers } from "@graphql-tools/utils";
import { nflScoresWeekly } from "./scores.js";
import { playerGameLogs } from "./gameLogs.js";
import { playerInfo, playersByTeam } from "./players.js";
import { sendMessage } from "#s/openai.js";

export const resolvers: IResolvers = {
  async askMathTutor({ message }) {
    const response = await sendMessage(message);
    return response;
  },
  nflScoresWeekly,
  playerGameLogs,
  playersByTeam,
  playerInfo
};
