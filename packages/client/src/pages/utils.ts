import { format } from "date-fns";
import { NFLPosition } from "./parlays/GameLogs";

export function getNFLWeek(date: Date): number {
  const seasonStartDate = new Date("09/05/2024");

  if (date < seasonStartDate) {
    return 1; // Before the season starts
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceStart = Math.floor((date.getTime() - seasonStartDate.getTime()) / msPerDay);
  const week = Math.floor(daysSinceStart / 7) + 1;

  return week > 18 ? 18 : week; // Return -1 if the date is beyond the regular season
}

export function formatGameTime(epoch: string) {
  const date = new Date(epoch);
  return format(date, "h:mm a");
}

export function formatGameDay(epoch: string) {
  const date = new Date(epoch);
  return format(date, "eee LLLL d");
}

export function formatRecord(wins: number, losses: number, ties: number) {
  return `${wins}-${losses}${ties ? `-${ties}` : ""}`;
}

export function getHitColor(hits: number, total: number) {
  const hitRate = hits / total;
  if (hitRate >= 0.66) {
    return "green";
  } else if (hitRate >= 0.33) {
    return "yellow";
  } else {
    return "red";
  }
}

export function isNFLRusher(position: NFLPosition) {
  return position === "RB" || position === "QB" || position === "WR" || position === "TE";
}

export function isNFLPasser(position: NFLPosition) {
  return position === "QB";
}

export function isNFLReceiver(position: NFLPosition) {
  return position === "RB" || position === "WR" || position === "TE";
}
