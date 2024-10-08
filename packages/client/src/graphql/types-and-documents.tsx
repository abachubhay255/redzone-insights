import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type NflScoresWeekly = {
  __typename?: 'NFLScoresWeekly';
  awayId?: Maybe<Scalars['ID']['output']>;
  awayKey?: Maybe<Scalars['String']['output']>;
  awayPts?: Maybe<Scalars['Int']['output']>;
  gameClock?: Maybe<Scalars['String']['output']>;
  gameEpoch?: Maybe<Scalars['Date']['output']>;
  gameId?: Maybe<Scalars['ID']['output']>;
  gameStatus?: Maybe<Scalars['String']['output']>;
  homeId?: Maybe<Scalars['ID']['output']>;
  homeKey?: Maybe<Scalars['String']['output']>;
  homePts?: Maybe<Scalars['Int']['output']>;
};

export type PassingProjections = {
  __typename?: 'PassingProjections';
  attempts?: Maybe<Scalars['Float']['output']>;
  completions?: Maybe<Scalars['Float']['output']>;
  interceptions?: Maybe<Scalars['Float']['output']>;
  touchdowns?: Maybe<Scalars['Float']['output']>;
  yards?: Maybe<Scalars['Float']['output']>;
  yardsPerPass?: Maybe<Scalars['Float']['output']>;
};

export type PassingStats = {
  __typename?: 'PassingStats';
  attempts?: Maybe<Scalars['Int']['output']>;
  completions?: Maybe<Scalars['Int']['output']>;
  interceptions?: Maybe<Scalars['Int']['output']>;
  touchdowns?: Maybe<Scalars['Int']['output']>;
  yards?: Maybe<Scalars['Int']['output']>;
  yardsPerPass?: Maybe<Scalars['Float']['output']>;
};

export type Player = {
  __typename?: 'Player';
  age?: Maybe<Scalars['Int']['output']>;
  college?: Maybe<Scalars['String']['output']>;
  experience?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['String']['output']>;
  jersey?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  playerId?: Maybe<Scalars['ID']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  teamId?: Maybe<Scalars['ID']['output']>;
  teamKey?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
};

export type PlayerGameLogs = {
  __typename?: 'PlayerGameLogs';
  gameDate?: Maybe<Scalars['Date']['output']>;
  gameId?: Maybe<Scalars['ID']['output']>;
  isHome?: Maybe<Scalars['Boolean']['output']>;
  oppKey?: Maybe<Scalars['String']['output']>;
  passing?: Maybe<PassingStats>;
  playerId?: Maybe<Scalars['ID']['output']>;
  playerName?: Maybe<Scalars['String']['output']>;
  receiving?: Maybe<ReceivingStats>;
  rushing?: Maybe<RushingStats>;
  teamId?: Maybe<Scalars['ID']['output']>;
  teamKey?: Maybe<Scalars['String']['output']>;
};

export type PlayerProjection = {
  __typename?: 'PlayerProjection';
  passing?: Maybe<PassingProjections>;
  playerName?: Maybe<Scalars['String']['output']>;
  receiving?: Maybe<ReceivingProjections>;
  rushing?: Maybe<RushingProjections>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  nflScoresWeekly?: Maybe<Array<Maybe<NflScoresWeekly>>>;
  playerGameLogs?: Maybe<Array<Maybe<PlayerGameLogs>>>;
  playerInfo?: Maybe<Player>;
  playerProjection?: Maybe<PlayerProjection>;
  playersByTeam?: Maybe<Array<Maybe<Player>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  updateProjectionsModel?: Maybe<Scalars['String']['output']>;
};


export type QueryHelloArgs = {
  message: Scalars['String']['input'];
};


export type QueryNflScoresWeeklyArgs = {
  season?: InputMaybe<Scalars['Int']['input']>;
  week: Scalars['Int']['input'];
};


export type QueryPlayerGameLogsArgs = {
  games?: InputMaybe<Scalars['Int']['input']>;
  playerId: Scalars['ID']['input'];
};


export type QueryPlayerInfoArgs = {
  playerId?: InputMaybe<Scalars['ID']['input']>;
  playerName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPlayerProjectionArgs = {
  isHome: Scalars['Boolean']['input'];
  oppKey: Scalars['String']['input'];
  playerName: Scalars['String']['input'];
};


export type QueryPlayersByTeamArgs = {
  teamId: Scalars['ID']['input'];
};


export type QueryUpdateProjectionsModelArgs = {
  awayTeamId: Scalars['String']['input'];
  homeTeamId: Scalars['String']['input'];
};

export type ReceivingProjections = {
  __typename?: 'ReceivingProjections';
  receptions?: Maybe<Scalars['Float']['output']>;
  targets?: Maybe<Scalars['Float']['output']>;
  touchdowns?: Maybe<Scalars['Float']['output']>;
  yards?: Maybe<Scalars['Float']['output']>;
  yardsPerCatch?: Maybe<Scalars['Float']['output']>;
};

export type ReceivingStats = {
  __typename?: 'ReceivingStats';
  receptions?: Maybe<Scalars['Int']['output']>;
  targets?: Maybe<Scalars['Int']['output']>;
  touchdowns?: Maybe<Scalars['Int']['output']>;
  yards?: Maybe<Scalars['Int']['output']>;
  yardsPerCatch?: Maybe<Scalars['Float']['output']>;
};

export type RushingProjections = {
  __typename?: 'RushingProjections';
  carries?: Maybe<Scalars['Float']['output']>;
  touchdowns?: Maybe<Scalars['Float']['output']>;
  yards?: Maybe<Scalars['Float']['output']>;
  yardsPerCarry?: Maybe<Scalars['Float']['output']>;
};

export type RushingStats = {
  __typename?: 'RushingStats';
  carries?: Maybe<Scalars['Int']['output']>;
  touchdowns?: Maybe<Scalars['Int']['output']>;
  yards?: Maybe<Scalars['Int']['output']>;
  yardsPerCarry?: Maybe<Scalars['Float']['output']>;
};

export type Team = {
  __typename?: 'Team';
  city?: Maybe<Scalars['String']['output']>;
  conference?: Maybe<Scalars['String']['output']>;
  conferenceKey?: Maybe<Scalars['String']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  games?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  losses?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pointsAgainst?: Maybe<Scalars['Float']['output']>;
  pointsFor?: Maybe<Scalars['Float']['output']>;
  statsPerGame?: Maybe<TeamStats>;
  streak?: Maybe<Scalars['String']['output']>;
  ties?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

export type TeamStats = {
  __typename?: 'TeamStats';
  allowedPassTds?: Maybe<Scalars['Float']['output']>;
  allowedPassYards?: Maybe<Scalars['Float']['output']>;
  allowedRushTds?: Maybe<Scalars['Float']['output']>;
  allowedRushYards?: Maybe<Scalars['Float']['output']>;
  passDefenseRank?: Maybe<Scalars['Int']['output']>;
  passOffenseRank?: Maybe<Scalars['Int']['output']>;
  passTds?: Maybe<Scalars['Float']['output']>;
  passYards?: Maybe<Scalars['Float']['output']>;
  rushDefenseRank?: Maybe<Scalars['Int']['output']>;
  rushOffenseRank?: Maybe<Scalars['Int']['output']>;
  rushTds?: Maybe<Scalars['Float']['output']>;
  rushYards?: Maybe<Scalars['Float']['output']>;
};

export type GetGameLogsQueryVariables = Exact<{
  playerId: Scalars['ID']['input'];
}>;


export type GetGameLogsQuery = { __typename?: 'Query', playerGameLogs?: Array<{ __typename?: 'PlayerGameLogs', playerId?: string | null, playerName?: string | null, teamId?: string | null, gameId?: string | null, gameDate?: any | null, oppKey?: string | null, isHome?: boolean | null, teamKey?: string | null, passing?: { __typename?: 'PassingStats', yards?: number | null, touchdowns?: number | null, attempts?: number | null, completions?: number | null, interceptions?: number | null, yardsPerPass?: number | null } | null, rushing?: { __typename?: 'RushingStats', yards?: number | null, touchdowns?: number | null, carries?: number | null, yardsPerCarry?: number | null } | null, receiving?: { __typename?: 'ReceivingStats', yards?: number | null, touchdowns?: number | null, receptions?: number | null, targets?: number | null, yardsPerCatch?: number | null } | null } | null> | null };

export type SayHelloQueryVariables = Exact<{
  message: Scalars['String']['input'];
}>;


export type SayHelloQuery = { __typename?: 'Query', hello?: string | null };

export type GetPlayersByTeamBasicQueryVariables = Exact<{
  teamId: Scalars['ID']['input'];
}>;


export type GetPlayersByTeamBasicQuery = { __typename?: 'Query', playersByTeam?: Array<{ __typename?: 'Player', playerId?: string | null, teamId?: string | null, teamKey?: string | null, name?: string | null, position?: string | null, picture?: string | null } | null> | null };

export type UpdateProjectionsQueryVariables = Exact<{
  homeTeamId: Scalars['String']['input'];
  awayTeamId: Scalars['String']['input'];
}>;


export type UpdateProjectionsQuery = { __typename?: 'Query', result?: string | null };

export type PlayerProjectionQueryVariables = Exact<{
  playerName: Scalars['String']['input'];
  isHome: Scalars['Boolean']['input'];
  oppKey: Scalars['String']['input'];
}>;


export type PlayerProjectionQuery = { __typename?: 'Query', playerProjection?: { __typename?: 'PlayerProjection', playerName?: string | null, passing?: { __typename?: 'PassingProjections', yards?: number | null, touchdowns?: number | null, attempts?: number | null, completions?: number | null, interceptions?: number | null, yardsPerPass?: number | null } | null, rushing?: { __typename?: 'RushingProjections', yards?: number | null, touchdowns?: number | null, carries?: number | null, yardsPerCarry?: number | null } | null, receiving?: { __typename?: 'ReceivingProjections', yards?: number | null, touchdowns?: number | null, receptions?: number | null, targets?: number | null, yardsPerCatch?: number | null } | null } | null };

export type GetScoresQueryVariables = Exact<{
  week: Scalars['Int']['input'];
  season?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetScoresQuery = { __typename?: 'Query', nflScoresWeekly?: Array<{ __typename?: 'NFLScoresWeekly', gameId?: string | null, gameEpoch?: any | null, homeKey?: string | null, awayKey?: string | null, homeId?: string | null, awayId?: string | null, gameStatus?: string | null, awayPts?: number | null, homePts?: number | null, gameClock?: string | null } | null> | null };

export type GetTeamsWithoutStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsWithoutStatsQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id?: string | null, city?: string | null, name?: string | null, key?: string | null, logo?: string | null, conference?: string | null, conferenceKey?: string | null, division?: string | null, games?: number | null, wins?: number | null, ties?: number | null, losses?: number | null, streak?: string | null, pointsFor?: number | null, pointsAgainst?: number | null } | null> | null };

export type GetTeamsWithStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsWithStatsQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id?: string | null, city?: string | null, name?: string | null, key?: string | null, logo?: string | null, conference?: string | null, conferenceKey?: string | null, division?: string | null, games?: number | null, wins?: number | null, ties?: number | null, losses?: number | null, streak?: string | null, pointsFor?: number | null, pointsAgainst?: number | null, statsPerGame?: { __typename?: 'TeamStats', rushYards?: number | null, rushTds?: number | null, passYards?: number | null, passTds?: number | null, allowedRushYards?: number | null, allowedRushTds?: number | null, allowedPassYards?: number | null, allowedPassTds?: number | null, rushDefenseRank?: number | null, rushOffenseRank?: number | null, passDefenseRank?: number | null, passOffenseRank?: number | null } | null } | null> | null };


export const GetGameLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGameLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerGameLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"games"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"playerName"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"gameDate"}},{"kind":"Field","name":{"kind":"Name","value":"oppKey"}},{"kind":"Field","name":{"kind":"Name","value":"isHome"}},{"kind":"Field","name":{"kind":"Name","value":"teamKey"}},{"kind":"Field","name":{"kind":"Name","value":"passing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yards"}},{"kind":"Field","name":{"kind":"Name","value":"touchdowns"}},{"kind":"Field","name":{"kind":"Name","value":"attempts"}},{"kind":"Field","name":{"kind":"Name","value":"completions"}},{"kind":"Field","name":{"kind":"Name","value":"interceptions"}},{"kind":"Field","name":{"kind":"Name","value":"yardsPerPass"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rushing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yards"}},{"kind":"Field","name":{"kind":"Name","value":"touchdowns"}},{"kind":"Field","name":{"kind":"Name","value":"carries"}},{"kind":"Field","name":{"kind":"Name","value":"yardsPerCarry"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiving"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yards"}},{"kind":"Field","name":{"kind":"Name","value":"touchdowns"}},{"kind":"Field","name":{"kind":"Name","value":"receptions"}},{"kind":"Field","name":{"kind":"Name","value":"targets"}},{"kind":"Field","name":{"kind":"Name","value":"yardsPerCatch"}}]}}]}}]}}]} as unknown as DocumentNode<GetGameLogsQuery, GetGameLogsQueryVariables>;
export const SayHelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sayHello"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}]}}]} as unknown as DocumentNode<SayHelloQuery, SayHelloQueryVariables>;
export const GetPlayersByTeamBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlayersByTeamBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playersByTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerId"}},{"kind":"Field","name":{"kind":"Name","value":"teamId"}},{"kind":"Field","name":{"kind":"Name","value":"teamKey"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]} as unknown as DocumentNode<GetPlayersByTeamBasicQuery, GetPlayersByTeamBasicQueryVariables>;
export const UpdateProjectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"updateProjections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"homeTeamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"awayTeamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"updateProjectionsModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"homeTeamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"homeTeamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"awayTeamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"awayTeamId"}}}]}]}}]} as unknown as DocumentNode<UpdateProjectionsQuery, UpdateProjectionsQueryVariables>;
export const PlayerProjectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playerProjection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isHome"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oppKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerProjection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"isHome"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isHome"}}},{"kind":"Argument","name":{"kind":"Name","value":"oppKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oppKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerName"}},{"kind":"Field","name":{"kind":"Name","value":"passing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yards"}},{"kind":"Field","name":{"kind":"Name","value":"touchdowns"}},{"kind":"Field","name":{"kind":"Name","value":"attempts"}},{"kind":"Field","name":{"kind":"Name","value":"completions"}},{"kind":"Field","name":{"kind":"Name","value":"interceptions"}},{"kind":"Field","name":{"kind":"Name","value":"yardsPerPass"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rushing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yards"}},{"kind":"Field","name":{"kind":"Name","value":"touchdowns"}},{"kind":"Field","name":{"kind":"Name","value":"carries"}},{"kind":"Field","name":{"kind":"Name","value":"yardsPerCarry"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receiving"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"yards"}},{"kind":"Field","name":{"kind":"Name","value":"touchdowns"}},{"kind":"Field","name":{"kind":"Name","value":"receptions"}},{"kind":"Field","name":{"kind":"Name","value":"targets"}},{"kind":"Field","name":{"kind":"Name","value":"yardsPerCatch"}}]}}]}}]}}]} as unknown as DocumentNode<PlayerProjectionQuery, PlayerProjectionQueryVariables>;
export const GetScoresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"week"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nflScoresWeekly"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"week"},"value":{"kind":"Variable","name":{"kind":"Name","value":"week"}}},{"kind":"Argument","name":{"kind":"Name","value":"season"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"gameEpoch"}},{"kind":"Field","name":{"kind":"Name","value":"homeKey"}},{"kind":"Field","name":{"kind":"Name","value":"awayKey"}},{"kind":"Field","name":{"kind":"Name","value":"homeId"}},{"kind":"Field","name":{"kind":"Name","value":"awayId"}},{"kind":"Field","name":{"kind":"Name","value":"gameStatus"}},{"kind":"Field","name":{"kind":"Name","value":"awayPts"}},{"kind":"Field","name":{"kind":"Name","value":"homePts"}},{"kind":"Field","name":{"kind":"Name","value":"gameClock"}}]}}]}}]} as unknown as DocumentNode<GetScoresQuery, GetScoresQueryVariables>;
export const GetTeamsWithoutStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamsWithoutStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"conference"}},{"kind":"Field","name":{"kind":"Name","value":"conferenceKey"}},{"kind":"Field","name":{"kind":"Name","value":"division"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"wins"}},{"kind":"Field","name":{"kind":"Name","value":"ties"}},{"kind":"Field","name":{"kind":"Name","value":"losses"}},{"kind":"Field","name":{"kind":"Name","value":"streak"}},{"kind":"Field","name":{"kind":"Name","value":"pointsFor"}},{"kind":"Field","name":{"kind":"Name","value":"pointsAgainst"}}]}}]}}]} as unknown as DocumentNode<GetTeamsWithoutStatsQuery, GetTeamsWithoutStatsQueryVariables>;
export const GetTeamsWithStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamsWithStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"conference"}},{"kind":"Field","name":{"kind":"Name","value":"conferenceKey"}},{"kind":"Field","name":{"kind":"Name","value":"division"}},{"kind":"Field","name":{"kind":"Name","value":"games"}},{"kind":"Field","name":{"kind":"Name","value":"wins"}},{"kind":"Field","name":{"kind":"Name","value":"ties"}},{"kind":"Field","name":{"kind":"Name","value":"losses"}},{"kind":"Field","name":{"kind":"Name","value":"streak"}},{"kind":"Field","name":{"kind":"Name","value":"pointsFor"}},{"kind":"Field","name":{"kind":"Name","value":"pointsAgainst"}},{"kind":"Field","name":{"kind":"Name","value":"statsPerGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rushYards"}},{"kind":"Field","name":{"kind":"Name","value":"rushTds"}},{"kind":"Field","name":{"kind":"Name","value":"passYards"}},{"kind":"Field","name":{"kind":"Name","value":"passTds"}},{"kind":"Field","name":{"kind":"Name","value":"allowedRushYards"}},{"kind":"Field","name":{"kind":"Name","value":"allowedRushTds"}},{"kind":"Field","name":{"kind":"Name","value":"allowedPassYards"}},{"kind":"Field","name":{"kind":"Name","value":"allowedPassTds"}},{"kind":"Field","name":{"kind":"Name","value":"rushDefenseRank"}},{"kind":"Field","name":{"kind":"Name","value":"rushOffenseRank"}},{"kind":"Field","name":{"kind":"Name","value":"passDefenseRank"}},{"kind":"Field","name":{"kind":"Name","value":"passOffenseRank"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamsWithStatsQuery, GetTeamsWithStatsQueryVariables>;