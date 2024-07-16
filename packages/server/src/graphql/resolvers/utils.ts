export function parseGameInfo(gameString: string, team: string) {
  const regex = /^(\d{4})(\d{2})(\d{2})_(\w+)@(\w+)$/;
  const match = gameString.match(regex);

  if (!match) {
    throw new Error("Invalid game string format");
  }

  const [_, year, month, day, awayTeam, homeTeam] = match;

  // JavaScript Date object month is 0-indexed, so we subtract 1 from the month
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  let isHome = true;
  let oppKey = "";
  if (team === awayTeam) {
    isHome = false;
    oppKey = homeTeam;
  } else if (team === homeTeam) {
    isHome = true;
    oppKey = awayTeam;
  } else {
    throw new Error("Team not found in game string");
  }

  return {
    date,
    oppKey,
    isHome
  };
}
