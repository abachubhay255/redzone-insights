import { getNFLData } from "#s/axios.js";
import { round, toNum } from "./utils.js";

export async function teams() {
  const params = { sortBy: "standings", rosters: "false", schedules: "false", topPerformers: "false", teamStats: "true" };
  const resp = await getNFLData("getNFLTeams", params);
  const teamsData = resp.body;
  const partialTeams = teamsData.map((team: any) => {
    const gamesPlayed = toNum(team.wins) + toNum(team.loss) + toNum(team.tie);
    const games = gamesPlayed || 1;
    if (!team || typeof team !== "object") throw new Error("Invalid team data");
    return {
      id: team.teamID,
      city: team.teamCity,
      name: team.teamName,
      key: team.teamAbv,
      logo: team.espnLogo1,
      conference: team.conference,
      conferenceKey: team.conferenceAbv,
      division: team.division,
      games: gamesPlayed,
      wins: toNum(team.wins),
      losses: toNum(team.loss),
      ties: toNum(team.tie),
      streak: (team.currentStreak?.result ?? "") + (team.currentStreak?.length ?? ""),
      pointsFor: round(toNum(team.pf) / games),
      pointsAgainst: round(toNum(team.pa) / games),
      statsPerGame: {
        rushYards: round(toNum(team.teamStats?.Rushing?.rushYds) / games),
        rushTds: round(toNum(team.teamStats?.Rushing?.rushTD) / games),
        passYards: round(toNum(team.teamStats?.Passing?.passYds) / games),
        passTds: round(toNum(team.teamStats?.Passing?.passTD) / games),
        allowedRushYards: round(toNum(team.teamStats?.Defense?.rushingYardsAllowed) / games),
        allowedRushTds: round(toNum(team.teamStats?.Defense?.rushingTDAllowed) / games),
        allowedPassYards: round(toNum(team.teamStats?.Defense?.passingYardsAllowed) / games),
        allowedPassTds: round(toNum(team.teamStats?.Defense?.passingTDAllowed) / games)
      }
    };
  });
  const rushOffenseRankings = calculateRankings(partialTeams, "rushYards", true);
  const passOffenseRankings = calculateRankings(partialTeams, "passYards", true);
  const rushDefenseRankings = calculateRankings(partialTeams, "allowedRushYards");
  const passDefenseRankings = calculateRankings(partialTeams, "allowedPassYards");
  const teams = partialTeams.map((team: any) => ({
    ...team,
    statsPerGame: {
      ...team.statsPerGame,
      rushOffenseRank: rushOffenseRankings[team.id],
      passOffenseRank: passOffenseRankings[team.id],
      rushDefenseRank: rushDefenseRankings[team.id],
      passDefenseRank: passDefenseRankings[team.id]
    }
  }));
  return teams;
}

// Function to calculate rankings
function calculateRankings(teams: any[], key: string, reverse?: boolean): Record<string, number> {
  const sortedTeams = teams.toSorted((a, b) => a.statsPerGame[key] - b.statsPerGame[key]);
  let dict: Record<string, number> = {};
  let rank = 1;
  let len = sortedTeams.length + 1;
  for (const team of sortedTeams) {
    dict[team.id] = reverse ? len - rank : rank;
    rank++;
  }
  return dict;
}
