import { format } from "date-fns";

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
