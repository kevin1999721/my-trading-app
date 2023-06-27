/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date (isoformat) */
  Date: any;
  /** Date with time (isoformat) */
  DateTime: any;
};

export type Backtest = {
  __typename?: 'Backtest';
  id: Scalars['DateTime'];
  information: BacktestInformation;
  results: Array<BacktestResult>;
};

export type BacktestArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  stockCode?: InputMaybe<Scalars['String']>;
  stockSelectionStrategyId?: InputMaybe<Scalars['String']>;
  tradeStrategyId: Scalars['String'];
};

export type BacktestInformation = {
  __typename?: 'BacktestInformation';
  dateRange: DateRange;
  endDatetime: Scalars['DateTime'];
  startDatetime: Scalars['DateTime'];
  stockCode?: Maybe<Scalars['String']>;
  stockSelectionStrategyId?: Maybe<Scalars['String']>;
  tradeStrategyId: Scalars['String'];
};

export type BacktestResult = {
  __typename?: 'BacktestResult';
  code: Scalars['String'];
  cost: Scalars['Float'];
  entryPoint: Scalars['DateTime'];
  id: Scalars['String'];
  leavePoint: Scalars['DateTime'];
  name: Scalars['String'];
  profit: Scalars['Float'];
  roi: Scalars['Float'];
  tradeType: Scalars['Int'];
};

export type DateRange = {
  __typename?: 'DateRange';
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type Kbar = {
  __typename?: 'Kbar';
  amount: Scalars['Float'];
  close: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  open: Scalars['Float'];
  timestamp: Scalars['Float'];
  volume: Scalars['Int'];
};

export type KbarsArgs = {
  code: Scalars['String'];
  endDate: Scalars['Date'];
  frequency?: InputMaybe<Scalars['String']>;
  period?: InputMaybe<Scalars['Int']>;
  requiredPreTradeDays?: InputMaybe<Scalars['Int']>;
  startDate: Scalars['Date'];
};

export type MajorTrend = {
  __typename?: 'MajorTrend';
  buy: Scalars['Float'];
  diff: Scalars['Float'];
  percentOfVolume: Scalars['Float'];
  securitiesFirm: Scalars['String'];
  sell: Scalars['Float'];
};

export type MajorsTrend = {
  __typename?: 'MajorsTrend';
  endDate: Scalars['Date'];
  majorsBuyRank: Array<MajorTrend>;
  majorsSellRank: Array<MajorTrend>;
  startDate: Scalars['Date'];
};

export type MajorsTrendArgs = {
  code: Scalars['String'];
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
  tradeDays?: InputMaybe<Scalars['Int']>;
  type: MajorsTrendArgsType;
};

export enum MajorsTrendArgsType {
  DateRange = 'DATE_RANGE',
  TradeDays = 'TRADE_DAYS'
}

export type News = {
  __typename?: 'News';
  aticle: Array<Scalars['String']>;
  author: Scalars['String'];
  datetime: Scalars['DateTime'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  backtest: Backtest;
  kbars: Array<Kbar>;
  majorsTrend?: Maybe<MajorsTrend>;
  majorsTrends: Array<MajorsTrend>;
  marketRealtime: Array<StockRealtime>;
  newsList: Array<News>;
  shareholders: Array<Shareholders>;
  stock?: Maybe<Stock>;
  stockRealtime?: Maybe<StockRealtime>;
  stocks: Array<Stock>;
  stocksRank: Array<StockRank>;
  stocksRealtime: Array<StockRealtime>;
  worldIndexes: Array<WorldIndex>;
};


export type QueryBacktestArgs = {
  backtestArgs: BacktestArgs;
};


export type QueryKbarsArgs = {
  kbarsArgs: KbarsArgs;
};


export type QueryMajorsTrendArgs = {
  majorsTrendArgs: MajorsTrendArgs;
};


export type QueryMajorsTrendsArgs = {
  code: Scalars['String'];
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};


export type QueryNewsListArgs = {
  code: Scalars['String'];
};


export type QueryShareholdersArgs = {
  code: Scalars['String'];
};


export type QueryStockArgs = {
  code: Scalars['String'];
};


export type QueryStockRealtimeArgs = {
  code: Scalars['String'];
};


export type QueryStocksRankArgs = {
  stocksRankArgs: StocksRankArgs;
};


export type QueryStocksRealtimeArgs = {
  codes: Array<Scalars['String']>;
};

export type Shareholders = {
  __typename?: 'Shareholders';
  close: Scalars['Float'];
  date: Scalars['Date'];
  moreThanFourHundred: Scalars['Float'];
  moreThanFourHundredPercent: Scalars['Float'];
  moreThanOenThousand: Scalars['Float'];
  moreThanOneThousandPercent: Scalars['Float'];
  totalShareholders: Scalars['Float'];
};

export type Stock = {
  __typename?: 'Stock';
  category: Scalars['String'];
  code: Scalars['String'];
  dayTrade: Scalars['Boolean'];
  exchange: Scalars['String'];
  limitDown: Scalars['Float'];
  limitUp: Scalars['Float'];
  name: Scalars['String'];
  reference: Scalars['Float'];
  updateDate: Scalars['String'];
};

export type StockRank = {
  __typename?: 'StockRank';
  amount: Scalars['Int'];
  askOrders: Scalars['Int'];
  askVolumes: Scalars['Int'];
  averagePrice: Scalars['Float'];
  bidOrders: Scalars['Int'];
  bidVolumes: Scalars['Int'];
  buyPrice: Scalars['Float'];
  buyVolume: Scalars['Int'];
  changePrice: Scalars['Float'];
  changeType: Scalars['Int'];
  close: Scalars['Float'];
  code: Scalars['String'];
  date: Scalars['String'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  name: Scalars['String'];
  open: Scalars['Float'];
  priceRange: Scalars['Float'];
  rankValue?: Maybe<Scalars['Float']>;
  sellPrice: Scalars['Float'];
  sellVolume: Scalars['Int'];
  tickType: Scalars['Int'];
  totalAmount: Scalars['Int'];
  totalVolume: Scalars['Int'];
  ts: Scalars['Float'];
  volume: Scalars['Int'];
  volumeRatio: Scalars['Float'];
  yesterdayVolume: Scalars['Int'];
};

export type StockRealtime = {
  __typename?: 'StockRealtime';
  askPrice: Array<Scalars['Float']>;
  askVolume: Array<Scalars['Float']>;
  bidPrice: Array<Scalars['Float']>;
  bidVolume: Array<Scalars['Float']>;
  changePrice: Scalars['Float'];
  changeRate: Scalars['Float'];
  close: Scalars['Float'];
  high: Scalars['Float'];
  info: Stock;
  kbars: Array<Kbar>;
  low: Scalars['Float'];
  open: Scalars['Float'];
  volume: Scalars['Float'];
  yesterdayVolume: Scalars['Float'];
};

export type StocksRankArgs = {
  ascending?: InputMaybe<Scalars['Boolean']>;
  count?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['Date']>;
  type: StocksRankType;
};

export enum StocksRankType {
  ChangePercentRank = 'CHANGE_PERCENT_RANK',
  VolumeRank = 'VOLUME_RANK'
}

export type WorldIndex = {
  __typename?: 'WorldIndex';
  change: Scalars['Float'];
  changePercent: Scalars['Float'];
  code: Scalars['String'];
  link: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  updateDatetime: Scalars['DateTime'];
};

export type FetchBackTestQueryVariables = Exact<{
  backtestArgs: BacktestArgs;
}>;


export type FetchBackTestQuery = { __typename?: 'Query', backtest: { __typename?: 'Backtest', id: any, information: { __typename?: 'BacktestInformation', startDatetime: any, endDatetime: any, tradeStrategyId: string, stockSelectionStrategyId?: string | null, stockCode?: string | null, dateRange: { __typename?: 'DateRange', startDate: any, endDate: any } }, results: Array<{ __typename?: 'BacktestResult', id: string, code: string, name: string, tradeType: number, entryPoint: any, leavePoint: any, roi: number, profit: number, cost: number }> } };

export type FetchKbarsQueryVariables = Exact<{
  kbarsArgs: KbarsArgs;
}>;


export type FetchKbarsQuery = { __typename?: 'Query', kbars: Array<{ __typename?: 'Kbar', timestamp: number, open: number, high: number, low: number, close: number, volume: number, amount: number }> };

export type FetchStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchStocksQuery = { __typename?: 'Query', stocks: Array<{ __typename?: 'Stock', category: string, code: string, dayTrade: boolean, exchange: string, limitDown: number, limitUp: number, name: string, reference: number, updateDate: string }> };

export type FetchStockQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FetchStockQuery = { __typename?: 'Query', stock?: { __typename?: 'Stock', category: string, code: string, dayTrade: boolean, exchange: string, limitDown: number, limitUp: number, name: string, reference: number, updateDate: string } | null };

export type FetchStockRealtimeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FetchStockRealtimeQuery = { __typename?: 'Query', stockRealtime?: { __typename?: 'StockRealtime', askPrice: Array<number>, askVolume: Array<number>, bidPrice: Array<number>, bidVolume: Array<number>, changePrice: number, changeRate: number, close: number, high: number, low: number, open: number, volume: number, yesterdayVolume: number, info: { __typename?: 'Stock', category: string, code: string, dayTrade: boolean, exchange: string, limitDown: number, limitUp: number, name: string, reference: number, updateDate: string }, kbars: Array<{ __typename?: 'Kbar', timestamp: number, open: number, high: number, low: number, close: number, volume: number, amount: number }> } | null };

export type FetchStocksRealtimeQueryVariables = Exact<{
  codes: Array<Scalars['String']> | Scalars['String'];
}>;


export type FetchStocksRealtimeQuery = { __typename?: 'Query', stocksRealtime: Array<{ __typename?: 'StockRealtime', askPrice: Array<number>, askVolume: Array<number>, bidPrice: Array<number>, bidVolume: Array<number>, changePrice: number, changeRate: number, close: number, high: number, low: number, open: number, volume: number, yesterdayVolume: number, info: { __typename?: 'Stock', category: string, code: string, dayTrade: boolean, exchange: string, limitDown: number, limitUp: number, name: string, reference: number, updateDate: string }, kbars: Array<{ __typename?: 'Kbar', timestamp: number, open: number, high: number, low: number, close: number, volume: number, amount: number }> }> };

export type FetchMajorTrendsQueryVariables = Exact<{
  code: Scalars['String'];
  startDate: Scalars['Date'];
  endDate: Scalars['Date'];
}>;


export type FetchMajorTrendsQuery = { __typename?: 'Query', majorsTrends: Array<{ __typename?: 'MajorsTrend', startDate: any, endDate: any, majorsBuyRank: Array<{ __typename?: 'MajorTrend', buy: number, diff: number, percentOfVolume: number, securitiesFirm: string, sell: number }>, majorsSellRank: Array<{ __typename?: 'MajorTrend', buy: number, diff: number, percentOfVolume: number, securitiesFirm: string, sell: number }> }> };

export type FetchMajorTrendQueryVariables = Exact<{
  majorsTrendArgs: MajorsTrendArgs;
}>;


export type FetchMajorTrendQuery = { __typename?: 'Query', majorsTrend?: { __typename?: 'MajorsTrend', startDate: any, endDate: any, majorsBuyRank: Array<{ __typename?: 'MajorTrend', buy: number, diff: number, percentOfVolume: number, securitiesFirm: string, sell: number }>, majorsSellRank: Array<{ __typename?: 'MajorTrend', buy: number, diff: number, percentOfVolume: number, securitiesFirm: string, sell: number }> } | null };

export type FetchShareholdersQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FetchShareholdersQuery = { __typename?: 'Query', shareholders: Array<{ __typename?: 'Shareholders', date: any, moreThanFourHundred: number, moreThanFourHundredPercent: number, moreThanOenThousand: number, moreThanOneThousandPercent: number, totalShareholders: number, close: number }> };

export type FetchNewsListQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FetchNewsListQuery = { __typename?: 'Query', newsList: Array<{ __typename?: 'News', aticle: Array<string>, author: string, datetime: any, description: string, title: string }> };

export type FetchWorldIndexesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchWorldIndexesQuery = { __typename?: 'Query', worldIndexes: Array<{ __typename?: 'WorldIndex', code: string, name: string, link: string, price: number, change: number, changePercent: number, updateDatetime: any }> };

export type FetchMarketRealtimeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMarketRealtimeQuery = { __typename?: 'Query', marketRealtime: Array<{ __typename?: 'StockRealtime', open: number, high: number, low: number, close: number, volume: number, yesterdayVolume: number, changePrice: number, changeRate: number, askPrice: Array<number>, askVolume: Array<number>, bidPrice: Array<number>, bidVolume: Array<number>, info: { __typename?: 'Stock', category: string, code: string, dayTrade: boolean, exchange: string, limitDown: number, limitUp: number, name: string, reference: number, updateDate: string }, kbars: Array<{ __typename?: 'Kbar', timestamp: number, open: number, high: number, low: number, close: number, volume: number, amount: number }> }> };

export type FetchStocksRankQueryVariables = Exact<{
  stocksRankArgs: StocksRankArgs;
}>;


export type FetchStocksRankQuery = { __typename?: 'Query', stocksRank: Array<{ __typename?: 'StockRank', date: string, code: string, name: string, ts: number, open: number, high: number, low: number, close: number, changePrice: number, changeType: number, averagePrice: number, volume: number, totalVolume: number, yesterdayVolume: number, volumeRatio: number }> };


export const FetchBackTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBackTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"backtestArgs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"backtestArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"backtestArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"information"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDatetime"}},{"kind":"Field","name":{"kind":"Name","value":"endDatetime"}},{"kind":"Field","name":{"kind":"Name","value":"dateRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tradeStrategyId"}},{"kind":"Field","name":{"kind":"Name","value":"stockSelectionStrategyId"}},{"kind":"Field","name":{"kind":"Name","value":"stockCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tradeType"}},{"kind":"Field","name":{"kind":"Name","value":"entryPoint"}},{"kind":"Field","name":{"kind":"Name","value":"leavePoint"}},{"kind":"Field","name":{"kind":"Name","value":"roi"}},{"kind":"Field","name":{"kind":"Name","value":"profit"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}}]}}]}}]}}]} as unknown as DocumentNode<FetchBackTestQuery, FetchBackTestQueryVariables>;
export const FetchKbarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchKbars"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kbarsArgs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"KbarsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kbars"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"kbarsArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kbarsArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<FetchKbarsQuery, FetchKbarsQueryVariables>;
export const FetchStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"dayTrade"}},{"kind":"Field","name":{"kind":"Name","value":"exchange"}},{"kind":"Field","name":{"kind":"Name","value":"limitDown"}},{"kind":"Field","name":{"kind":"Name","value":"limitUp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"updateDate"}}]}}]}}]} as unknown as DocumentNode<FetchStocksQuery, FetchStocksQueryVariables>;
export const FetchStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"dayTrade"}},{"kind":"Field","name":{"kind":"Name","value":"exchange"}},{"kind":"Field","name":{"kind":"Name","value":"limitDown"}},{"kind":"Field","name":{"kind":"Name","value":"limitUp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"updateDate"}}]}}]}}]} as unknown as DocumentNode<FetchStockQuery, FetchStockQueryVariables>;
export const FetchStockRealtimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchStockRealtime"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockRealtime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"dayTrade"}},{"kind":"Field","name":{"kind":"Name","value":"exchange"}},{"kind":"Field","name":{"kind":"Name","value":"limitDown"}},{"kind":"Field","name":{"kind":"Name","value":"limitUp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"updateDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kbars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"askPrice"}},{"kind":"Field","name":{"kind":"Name","value":"askVolume"}},{"kind":"Field","name":{"kind":"Name","value":"bidPrice"}},{"kind":"Field","name":{"kind":"Name","value":"bidVolume"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"yesterdayVolume"}}]}}]}}]} as unknown as DocumentNode<FetchStockRealtimeQuery, FetchStockRealtimeQueryVariables>;
export const FetchStocksRealtimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchStocksRealtime"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"codes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stocksRealtime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"codes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"codes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"dayTrade"}},{"kind":"Field","name":{"kind":"Name","value":"exchange"}},{"kind":"Field","name":{"kind":"Name","value":"limitDown"}},{"kind":"Field","name":{"kind":"Name","value":"limitUp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"updateDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kbars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"askPrice"}},{"kind":"Field","name":{"kind":"Name","value":"askVolume"}},{"kind":"Field","name":{"kind":"Name","value":"bidPrice"}},{"kind":"Field","name":{"kind":"Name","value":"bidVolume"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"yesterdayVolume"}}]}}]}}]} as unknown as DocumentNode<FetchStocksRealtimeQuery, FetchStocksRealtimeQueryVariables>;
export const FetchMajorTrendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchMajorTrends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"majorsTrends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"majorsBuyRank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buy"}},{"kind":"Field","name":{"kind":"Name","value":"diff"}},{"kind":"Field","name":{"kind":"Name","value":"percentOfVolume"}},{"kind":"Field","name":{"kind":"Name","value":"securitiesFirm"}},{"kind":"Field","name":{"kind":"Name","value":"sell"}}]}},{"kind":"Field","name":{"kind":"Name","value":"majorsSellRank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buy"}},{"kind":"Field","name":{"kind":"Name","value":"diff"}},{"kind":"Field","name":{"kind":"Name","value":"percentOfVolume"}},{"kind":"Field","name":{"kind":"Name","value":"securitiesFirm"}},{"kind":"Field","name":{"kind":"Name","value":"sell"}}]}}]}}]}}]} as unknown as DocumentNode<FetchMajorTrendsQuery, FetchMajorTrendsQueryVariables>;
export const FetchMajorTrendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchMajorTrend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"majorsTrendArgs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MajorsTrendArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"majorsTrend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"majorsTrendArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"majorsTrendArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"majorsBuyRank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buy"}},{"kind":"Field","name":{"kind":"Name","value":"diff"}},{"kind":"Field","name":{"kind":"Name","value":"percentOfVolume"}},{"kind":"Field","name":{"kind":"Name","value":"securitiesFirm"}},{"kind":"Field","name":{"kind":"Name","value":"sell"}}]}},{"kind":"Field","name":{"kind":"Name","value":"majorsSellRank"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buy"}},{"kind":"Field","name":{"kind":"Name","value":"diff"}},{"kind":"Field","name":{"kind":"Name","value":"percentOfVolume"}},{"kind":"Field","name":{"kind":"Name","value":"securitiesFirm"}},{"kind":"Field","name":{"kind":"Name","value":"sell"}}]}}]}}]}}]} as unknown as DocumentNode<FetchMajorTrendQuery, FetchMajorTrendQueryVariables>;
export const FetchShareholdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchShareholders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareholders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"moreThanFourHundred"}},{"kind":"Field","name":{"kind":"Name","value":"moreThanFourHundredPercent"}},{"kind":"Field","name":{"kind":"Name","value":"moreThanOenThousand"}},{"kind":"Field","name":{"kind":"Name","value":"moreThanOneThousandPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalShareholders"}},{"kind":"Field","name":{"kind":"Name","value":"close"}}]}}]}}]} as unknown as DocumentNode<FetchShareholdersQuery, FetchShareholdersQueryVariables>;
export const FetchNewsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchNewsList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aticle"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FetchNewsListQuery, FetchNewsListQueryVariables>;
export const FetchWorldIndexesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchWorldIndexes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worldIndexes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"change"}},{"kind":"Field","name":{"kind":"Name","value":"changePercent"}},{"kind":"Field","name":{"kind":"Name","value":"updateDatetime"}}]}}]}}]} as unknown as DocumentNode<FetchWorldIndexesQuery, FetchWorldIndexesQueryVariables>;
export const FetchMarketRealtimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchMarketRealtime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketRealtime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"dayTrade"}},{"kind":"Field","name":{"kind":"Name","value":"exchange"}},{"kind":"Field","name":{"kind":"Name","value":"limitDown"}},{"kind":"Field","name":{"kind":"Name","value":"limitUp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"updateDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"yesterdayVolume"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeRate"}},{"kind":"Field","name":{"kind":"Name","value":"askPrice"}},{"kind":"Field","name":{"kind":"Name","value":"askVolume"}},{"kind":"Field","name":{"kind":"Name","value":"bidPrice"}},{"kind":"Field","name":{"kind":"Name","value":"bidVolume"}},{"kind":"Field","name":{"kind":"Name","value":"kbars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<FetchMarketRealtimeQuery, FetchMarketRealtimeQueryVariables>;
export const FetchStocksRankDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchStocksRank"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stocksRankArgs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StocksRankArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stocksRank"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stocksRankArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stocksRankArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ts"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"changePrice"}},{"kind":"Field","name":{"kind":"Name","value":"changeType"}},{"kind":"Field","name":{"kind":"Name","value":"averagePrice"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"totalVolume"}},{"kind":"Field","name":{"kind":"Name","value":"yesterdayVolume"}},{"kind":"Field","name":{"kind":"Name","value":"volumeRatio"}}]}}]}}]} as unknown as DocumentNode<FetchStocksRankQuery, FetchStocksRankQueryVariables>;