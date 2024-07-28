import { NFLGame } from "#s/components/GameSelect";
import { GetPlayersByTeamBasicDocument, PassingStats, Player, ReceivingStats, RushingStats } from "#s/graphql/types-and-documents";
import { useGraphQL } from "#s/graphql/useGraphQL";
import { Avatar, Group, NumberInput, SegmentedControl, Select, SelectProps } from "@mantine/core";
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
  gameInfo: NFLGame;
  updateParlayLeg: (leg: Partial<ParlayLegType>) => void;
};

export function ParlayLeg({ playerId, playerName, overUnder, stat, statValue, gameInfo, updateParlayLeg }: Props) {
  const { data: awayData } = useGraphQL(GetPlayersByTeamBasicDocument, { teamId: gameInfo?.awayId ?? "" });

  const { data: homeData } = useGraphQL(GetPlayersByTeamBasicDocument, { teamId: gameInfo?.homeId ?? "" });

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

  const renderSelectOption: SelectProps["renderOption"] = ({ option, checked }) => (
    <Group flex="1" gap="xs">
      <Avatar src={playersById[option.value]?.picture} size="sm" />
      {option.label}
    </Group>
  );

  const matchedStats = useMemo(() => getStatGroups(player?.position as NFLPosition), [playerId, player]);

  const statSelectData = useMemo(() => statData.filter(({ group }) => matchedStats.has(group)), [matchedStats]);

  const playerProjectionArgs = useMemo(() => getPlayerProjectionArgs(player, gameInfo), [player, gameInfo]);

  return (
    <Group>
      <Avatar src={player?.picture} size="sm" />
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
        orientation="vertical"
        value={overUnder}
        onChange={val => updateParlayLeg({ overUnder: val as "over" | "under" })}
      />
      <NumberInput
        w={100}
        min={0.5}
        max={999.5}
        decimalScale={1}
        placeholder="Value"
        value={statValue}
        onChange={val => updateParlayLeg({ statValue: val as number })}
      />
      {playerId && (
        <GameLogs playerId={playerId} stat={stat} overUnder={overUnder} statValue={statValue} position={player?.position as NFLPosition} />
      )}
      {playerProjectionArgs && <PlayerProjection {...playerProjectionArgs} stat={stat} />}
    </Group>
  );
}

// only load player projections if player and game info are available and valid
function getPlayerProjectionArgs(player: Partial<Player> | null, gameInfo: NFLGame) {
  if (!player?.name || !gameInfo || !gameInfo.homeId || !gameInfo.homeKey || !gameInfo.awayKey) {
    return null;
  }
  const isHome = player.teamId === gameInfo?.homeId;
  return {
    playerName: player.name,
    isHome: isHome,
    oppKey: isHome ? gameInfo.awayKey : gameInfo.homeKey
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
