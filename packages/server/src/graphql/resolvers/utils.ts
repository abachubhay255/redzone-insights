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

export function toNum(value: string) {
  return Number(value) || 0;
}

export function getPlayer(player: any) {
  if (!player) {
    throw new Error("Player is undefined");
  }
  return {
    playerId: player.playerID,
    teamId: player.teamID,
    teamKey: player.team,
    name: player.cbsLongName,
    jersey: toNum(player.jerseyNum),
    position: player.pos,
    college: player.school,
    height: player.height,
    weight: toNum(player.weight),
    experience: toNum(player.exp),
    picture: player.espnHeadshot,
    age: toNum(player.age)
  };
}

export function ToFilename(input: string): string {
  // Replace invalid characters with underscores
  return input
    .replace(/[<>:"\/\\|?*\x00-\x1F]/g, "_")
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/_+/g, "_") // Replace multiple underscores with a single one
    .trim(); // Remove leading and trailing whitespace
}

export function parseJsonResponse(json: string) {
  const str = json.slice(7, -3); // remove prefix ``` json and suffix ``` from the string
  return JSON.parse(str);
}

export function round(value: number): number {
  return parseFloat(value.toFixed(1));
}
