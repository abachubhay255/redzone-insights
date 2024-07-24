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

export type SayHelloQueryVariables = Exact<{
  message: Scalars['String']['input'];
}>;


export type SayHelloQuery = { __typename?: 'Query', hello?: string | null };


export const SayHelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sayHello"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}]}}]} as unknown as DocumentNode<SayHelloQuery, SayHelloQueryVariables>;