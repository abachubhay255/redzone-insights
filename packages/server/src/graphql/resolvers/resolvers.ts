import { getNFL } from "#s/axios.js";
import { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  hello() {
    return "Hello world!";
  },
  async nflSchedule({ week }) {
    const params = { week: week };
    const schedule = await getNFL("getNFLGamesForWeek", { params: params });
    return JSON.stringify(schedule.data);
  }
};
