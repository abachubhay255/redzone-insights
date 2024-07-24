import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  NFLScoresWeekly: ResolverTypeWrapper<NflScoresWeekly>;
  PassingProjections: ResolverTypeWrapper<PassingProjections>;
  PassingStats: ResolverTypeWrapper<PassingStats>;
  Player: ResolverTypeWrapper<Player>;
  PlayerGameLogs: ResolverTypeWrapper<PlayerGameLogs>;
  PlayerProjection: ResolverTypeWrapper<PlayerProjection>;
  Query: ResolverTypeWrapper<{}>;
  ReceivingProjections: ResolverTypeWrapper<ReceivingProjections>;
  ReceivingStats: ResolverTypeWrapper<ReceivingStats>;
  RushingProjections: ResolverTypeWrapper<RushingProjections>;
  RushingStats: ResolverTypeWrapper<RushingStats>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Team: ResolverTypeWrapper<Team>;
  TeamStats: ResolverTypeWrapper<TeamStats>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  NFLScoresWeekly: NflScoresWeekly;
  PassingProjections: PassingProjections;
  PassingStats: PassingStats;
  Player: Player;
  PlayerGameLogs: PlayerGameLogs;
  PlayerProjection: PlayerProjection;
  Query: {};
  ReceivingProjections: ReceivingProjections;
  ReceivingStats: ReceivingStats;
  RushingProjections: RushingProjections;
  RushingStats: RushingStats;
  String: Scalars['String']['output'];
  Team: Team;
  TeamStats: TeamStats;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type NflScoresWeeklyResolvers<ContextType = any, ParentType extends ResolversParentTypes['NFLScoresWeekly'] = ResolversParentTypes['NFLScoresWeekly']> = {
  awayId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  awayKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  awayPts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gameClock?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gameEpoch?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  gameId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  gameStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homeId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  homeKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homePts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PassingProjectionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PassingProjections'] = ResolversParentTypes['PassingProjections']> = {
  attempts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  completions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interceptions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  touchdowns?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yardsPerPass?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PassingStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PassingStats'] = ResolversParentTypes['PassingStats']> = {
  attempts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  completions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interceptions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  touchdowns?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yards?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yardsPerPass?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  college?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experience?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  jersey?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playerId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  teamId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  teamKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerGameLogsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerGameLogs'] = ResolversParentTypes['PlayerGameLogs']> = {
  gameDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  gameId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isHome?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  oppKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passing?: Resolver<Maybe<ResolversTypes['PassingStats']>, ParentType, ContextType>;
  playerId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  playerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receiving?: Resolver<Maybe<ResolversTypes['ReceivingStats']>, ParentType, ContextType>;
  rushing?: Resolver<Maybe<ResolversTypes['RushingStats']>, ParentType, ContextType>;
  teamId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  teamKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerProjectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerProjection'] = ResolversParentTypes['PlayerProjection']> = {
  passing?: Resolver<Maybe<ResolversTypes['PassingProjections']>, ParentType, ContextType>;
  playerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receiving?: Resolver<Maybe<ResolversTypes['ReceivingProjections']>, ParentType, ContextType>;
  rushing?: Resolver<Maybe<ResolversTypes['RushingProjections']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryHelloArgs, 'message'>>;
  nflScoresWeekly?: Resolver<Maybe<Array<Maybe<ResolversTypes['NFLScoresWeekly']>>>, ParentType, ContextType, RequireFields<QueryNflScoresWeeklyArgs, 'week'>>;
  playerGameLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlayerGameLogs']>>>, ParentType, ContextType, RequireFields<QueryPlayerGameLogsArgs, 'playerId'>>;
  playerInfo?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, Partial<QueryPlayerInfoArgs>>;
  playerProjection?: Resolver<Maybe<ResolversTypes['PlayerProjection']>, ParentType, ContextType, RequireFields<QueryPlayerProjectionArgs, 'isHome' | 'oppKey' | 'playerName'>>;
  playersByTeam?: Resolver<Maybe<Array<Maybe<ResolversTypes['Player']>>>, ParentType, ContextType, RequireFields<QueryPlayersByTeamArgs, 'teamId'>>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  updateProjectionsModel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryUpdateProjectionsModelArgs, 'awayTeamId' | 'homeTeamId'>>;
};

export type ReceivingProjectionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceivingProjections'] = ResolversParentTypes['ReceivingProjections']> = {
  receptions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  targets?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  touchdowns?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yardsPerCatch?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReceivingStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceivingStats'] = ResolversParentTypes['ReceivingStats']> = {
  receptions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  targets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  touchdowns?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yards?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yardsPerCatch?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RushingProjectionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RushingProjections'] = ResolversParentTypes['RushingProjections']> = {
  carries?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  touchdowns?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yardsPerCarry?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RushingStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RushingStats'] = ResolversParentTypes['RushingStats']> = {
  carries?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  touchdowns?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yards?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yardsPerCarry?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  conference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  conferenceKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  division?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  games?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  losses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pointsAgainst?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  pointsFor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  statsPerGame?: Resolver<Maybe<ResolversTypes['TeamStats']>, ParentType, ContextType>;
  streak?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ties?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  wins?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamStats'] = ResolversParentTypes['TeamStats']> = {
  allowedPassTds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  allowedPassYards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  allowedRushTds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  allowedRushYards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  passDefenseRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  passOffenseRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  passTds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  passYards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rushDefenseRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rushOffenseRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rushTds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rushYards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  NFLScoresWeekly?: NflScoresWeeklyResolvers<ContextType>;
  PassingProjections?: PassingProjectionsResolvers<ContextType>;
  PassingStats?: PassingStatsResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerGameLogs?: PlayerGameLogsResolvers<ContextType>;
  PlayerProjection?: PlayerProjectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReceivingProjections?: ReceivingProjectionsResolvers<ContextType>;
  ReceivingStats?: ReceivingStatsResolvers<ContextType>;
  RushingProjections?: RushingProjectionsResolvers<ContextType>;
  RushingStats?: RushingStatsResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  TeamStats?: TeamStatsResolvers<ContextType>;
};

