import { GetPlayersByTeamBasicDocument, PassingStats, Player, ReceivingStats, RushingStats, Team } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { Avatar, Box, Group, NumberInput, SegmentedControl, Select, SelectProps } from "@mantine/core";
import { keyBy } from "lodash";
import { useMemo } from "react";
import { GameLogs, NFLPosition } from "./GameLogs";
import { isNFLPasser, isNFLReceiver, isNFLRusher } from "../utils";
import { PlayerProjection } from "./PlayerProjection";

type StatType = "passing" | "receiving" | "rushing";

type AllStats = Omit<PassingStats & ReceivingStats & RushingStats, "__typename">;

export type NFLStat = `${StatType}.${keyof AllStats}`;

export type ParlayLegType = {
  id: string;
  playerId: string;
  playerName: string;
  stat: NFLStat;
  overUnder: "over" | "under";
  statValue: number;
};

type Props = ParlayLegType & {
  homeTeam: Team;
  awayTeam: Team;
  updateParlayLeg: (leg: Partial<ParlayLegType>) => void;
  projectionsUpToDate: boolean;
};

export function ParlayLeg({ homeTeam, awayTeam, playerId, overUnder, stat, statValue, updateParlayLeg, projectionsUpToDate }: Props) {
  const { data: awayData } = useGraphQL(GetPlayersByTeamBasicDocument, { teamId: awayTeam?.id ?? "" });

  const { data: homeData } = useGraphQL(GetPlayersByTeamBasicDocument, { teamId: homeTeam.id ?? "" });

  const awayPlayers = useMemo(() => awayData?.playersByTeam ?? [], [awayData]);
  const homePlayers = useMemo(() => homeData?.playersByTeam ?? [], [homeData]);

  const playersById = useMemo(() => keyBy([...awayPlayers, ...homePlayers], "playerId"), [awayPlayers, homePlayers]);

  const player = useMemo(() => playersById[playerId], [playerId, playersById]);

  const playerSelectData = useMemo(
    () =>
      [...awayPlayers, ...homePlayers]
        .map(player => ({
          value: player?.playerId ?? "",
          label: player?.name ?? ""
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [awayPlayers, homePlayers]
  );

  const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
    <Group flex="1" gap="xs">
      <Avatar src={playersById[option.value]?.picture} size="sm" />
      {option.label}
    </Group>
  );

  const matchedStats = useMemo(() => getStatGroups(player?.position as NFLPosition), [playerId, player]);

  const statSelectData = useMemo(() => statData.filter(({ group }) => matchedStats.has(group)), [matchedStats]);

  const showPlayerProjection = useMemo(
    () => playerProjectionAvailable(player, homeTeam, awayTeam, projectionsUpToDate),
    [player, homeTeam, awayTeam, projectionsUpToDate]
  );

  return (
    <Group>
      <Box bg="gray" style={{ borderRadius: 100 }}>
        <Avatar src={player?.picture} size="md" />
      </Box>
      <Select
        searchable
        selectFirstOptionOnChange
        data={playerSelectData}
        placeholder="Choose Player"
        renderOption={renderSelectOption}
        value={playerId}
        onChange={pid => {
          const player = playersById[pid ?? ""];
          const defaultStat = getDefaultStatPerPosition(player?.position as NFLPosition);
          updateParlayLeg({
            playerId: pid ?? "",
            playerName: player?.name ?? "",
            stat: defaultStat,
            statValue: getDefaultStatValue(defaultStat)
          });
        }}
      />
      <Select
        searchable
        selectFirstOptionOnChange
        data={statSelectData}
        placeholder="Choose Stat"
        value={stat}
        onChange={stat => updateParlayLeg({ stat: (stat as NFLStat) ?? "passing.yards", statValue: getDefaultStatValue(stat as NFLStat) })}
      />
      <SegmentedControl
        data={[
          { value: "over", label: "Over" },
          { value: "under", label: "Under" }
        ]}
        color="blue"
        orientation="vertical"
        value={overUnder}
        onChange={val => updateParlayLeg({ overUnder: val as "over" | "under" })}
      />
      <NumberInput
        w={100}
        min={0.5}
        max={999.5}
        decimalScale={1}
        stepHoldDelay={500}
        stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
        placeholder="Value"
        value={statValue}
        onChange={val => updateParlayLeg({ statValue: val as number })}
      />
      {playerId && (
        <GameLogs
          playerId={playerId}
          playerTeamId={player?.teamId ?? ""}
          stat={stat}
          overUnder={overUnder}
          statValue={statValue}
          position={player?.position as NFLPosition}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
        />
      )}
      {showPlayerProjection && <PlayerProjection {...showPlayerProjection} stat={stat} />}
    </Group>
  );
}

// only load player projections if player and game info are available and valid
function playerProjectionAvailable(player: Partial<Player> | null, homeTeam: Team, awayTeam: Team, projectionsUpToDate: boolean) {
  if (!projectionsUpToDate) {
    return null;
  }
  if (!player?.name || !player.teamId || !homeTeam.id || !homeTeam.key || !awayTeam.key) {
    return null;
  }
  const isHome = player.teamId === homeTeam.id;
  return {
    playerName: player.name,
    isHome: isHome,
    oppKey: isHome ? awayTeam.key : homeTeam.key
  };
}

function getDefaultStatPerPosition(position: NFLPosition) {
  if (position === "QB") {
    return "passing.yards";
  }
  if (position === "WR" || position === "TE") {
    return "receiving.yards";
  }
  if (position === "RB") {
    return "rushing.yards";
  }
  return "passing.yards";
}

const getStatGroups = (position: NFLPosition) => {
  let groups = new Set<string>();
  if (isNFLPasser(position)) {
    groups.add("Passing");
  }
  if (isNFLRusher(position)) {
    groups.add("Rushing");
  }
  if (isNFLReceiver(position)) {
    groups.add("Receiving");
  }
  return groups;
};

const statData = [
  {
    group: "Passing",
    items: [
      { value: "passing.yards", label: "Passing Yards" },
      { value: "passing.touchdowns", label: "Passing Touchdowns" },
      { value: "passing.attempts", label: "Passing Attempts" },
      { value: "passing.completions", label: "Passing Completions" },
      { value: "passing.interceptions", label: "Passing Interceptions" },
      { value: "passing.yardsPerPass", label: "Passing Yards Per Pass" }
    ]
  },
  {
    group: "Receiving",
    items: [
      { value: "receiving.yards", label: "Receiving Yards" },
      { value: "receiving.touchdowns", label: "Receiving Touchdowns" },
      { value: "receiving.receptions", label: "Receiving Receptions" },
      { value: "receiving.targets", label: "Receiving Targets" },
      { value: "receiving.yardsPerCatch", label: "Receiving Yards Per Catch" }
    ]
  },
  {
    group: "Rushing",
    items: [
      { value: "rushing.yards", label: "Rushing Yards" },
      { value: "rushing.touchdowns", label: "Rushing Touchdowns" },
      { value: "rushing.carries", label: "Rushing Carries" },
      { value: "rushing.yardsPerCarry", label: "Rushing Yards Per Carry" }
    ]
  }
];

function getDefaultStatValue(stat: NFLStat) {
  switch (stat) {
    case "passing.yards":
      return 224.5;
    case "receiving.yards":
    case "rushing.yards":
      return 69.5;
    case "passing.touchdowns":
    case "receiving.touchdowns":
    case "rushing.touchdowns":
      return 0.5;
    case "passing.attempts":
      return 29.5;
    case "passing.completions":
      return 19.5;
    case "receiving.receptions":
    case "receiving.targets":
      return 4.5;
    case "rushing.carries":
      return 19.5;
    case "passing.interceptions":
      return 0.5;
    case "passing.yardsPerPass":
    case "receiving.yardsPerCatch":
    case "rushing.yardsPerCarry":
      return 7.5;
    default:
      return 0;
  }
}
