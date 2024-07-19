import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import "dotenv/config";

const TTL = 1000 * 60 * 60; // Cache for 1 hour REMEMBER CACHE CLEARS WHEN SERVER RESTARTS

export const getNFL = setupCache(
  Axios.create({
    baseURL: "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/",
    timeout: 5000,
    headers: {
      "x-rapidapi-key": process.env.NFL_API_KEY,
      "x-rapidapi-host": "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com"
    },
    method: "get"
  }),
  { ttl: TTL }
);

// const ODDS_KEY = config.ODDS_API_KEY;

// const ODDS_TTL = 1000 * 60 * 60 * 12; // Cache for 12 hours

// export const getOdds = setupCache(
//   Axios.create({
//     baseURL: "https://api.the-odds-api.com/v4/sports/basketball_nba/",
//     timeout: 10000,
//     method: "get",
//     params: {
//       apiKey: ODDS_KEY
//     }
//   }),
//   { ttl: ODDS_TTL }
// );

// export const getNBAApi = setupCache(
//   Axios.create({
//     baseURL: "http://127.0.0.1:5000/",
//     timeout: 10000,
//     method: "get"
//   }),
//   { ttl: TTL }
// );
