// import { getNFL } from "#s/src/axios.js";


export const resolvers = {
  hello() {
    return "Hello world!";
  },
  // async nflSchedule() {
  //   const schedule = await getNFL("getNFLGamesForWeek", { params: { week: 1 } });
  //   return JSON.stringify(schedule.data);
  // }
};
