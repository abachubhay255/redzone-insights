import Axios from "axios";
import "dotenv/config";
import { readCache, writeCache } from "./cache.js";

export const getNFL = Axios.create({
  baseURL: "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/",
  timeout: 5000,
  headers: {
    // "x-rapidapi-key": process.env.NFL_API_KEY,
    "x-rapidapi-key": "",
    "x-rapidapi-host": "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com"
  },
  method: "get"
});

export async function getNFLData(uri: string, params: any) {
  const query = uri + JSON.stringify(params);
  const cachedResponse = await readCache(query);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const result = await getNFL(uri, { params: params });
    console.log("requests remaining this month:", result.headers["x-ratelimit-requests-remaining"]);
    if (result.data.statusCode === 200) {
      await writeCache(query, result.data);
      return result.data;
    }
    throw new Error("NFL API Error, status code: " + result.data.statusCode);
  } catch (error) {
    console.error(error.message, error.response?.data?.message);
    throw error;
  }
}

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
