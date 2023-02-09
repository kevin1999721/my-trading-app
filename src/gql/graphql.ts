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
  /** Date with time (isoformat) */
  DateTime: any;
};

export type Backtest = {
  __typename?: 'Backtest';
  information: BacktestInformation;
  results: Array<BacktestResult>;
};

export type BacktestArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  stockCode?: InputMaybe<Scalars['String']>;
  stockSelectionStrategyId?: InputMaybe<Scalars['Int']>;
  tradeStrategyId: Scalars['Int'];
};

export type BacktestInformation = {
  __typename?: 'BacktestInformation';
  dateRange: DateRange;
  endDatetime: Scalars['DateTime'];
  startDatetime: Scalars['DateTime'];
  stockCode?: Maybe<Scalars['String']>;
  stockSelectionStrategyId?: Maybe<Scalars['Int']>;
  tradeStrategyId: Scalars['Int'];
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

export type Query = {
  __typename?: 'Query';
  backtest: Backtest;
  kbars: Array<Kbar>;
  stocks: Array<Stock>;
};


export type QueryBacktestArgs = {
  backtestArgs: BacktestArgs;
};


export type QueryKbarsArgs = {
  code: Scalars['String'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
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

export type FetchBackTestQueryVariables = Exact<{
  backtestArgs: BacktestArgs;
}>;


export type FetchBackTestQuery = { __typename?: 'Query', backtest: { __typename?: 'Backtest', information: { __typename?: 'BacktestInformation', startDatetime: any, endDatetime: any, tradeStrategyId: number, stockSelectionStrategyId?: number | null, stockCode?: string | null, dateRange: { __typename?: 'DateRange', startDate: any, endDate: any } }, results: Array<{ __typename?: 'BacktestResult', id: string, code: string, name: string, tradeType: number, entryPoint: any, leavePoint: any, roi: number, profit: number, cost: number }> } };

export type FetchKbarsQueryVariables = Exact<{
  code: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
}>;


export type FetchKbarsQuery = { __typename?: 'Query', kbars: Array<{ __typename?: 'Kbar', timestamp: number, open: number, high: number, low: number, close: number, volume: number, amount: number }> };

export type FetchStocksQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchStocksQuery = { __typename?: 'Query', stocks: Array<{ __typename?: 'Stock', category: string, code: string, dayTrade: boolean, exchange: string, limitDown: number, limitUp: number, name: string, reference: number, updateDate: string }> };


export const FetchBackTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBackTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"backtestArgs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"backtestArgs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"backtestArgs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"information"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDatetime"}},{"kind":"Field","name":{"kind":"Name","value":"endDatetime"}},{"kind":"Field","name":{"kind":"Name","value":"dateRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tradeStrategyId"}},{"kind":"Field","name":{"kind":"Name","value":"stockSelectionStrategyId"}},{"kind":"Field","name":{"kind":"Name","value":"stockCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tradeType"}},{"kind":"Field","name":{"kind":"Name","value":"entryPoint"}},{"kind":"Field","name":{"kind":"Name","value":"leavePoint"}},{"kind":"Field","name":{"kind":"Name","value":"roi"}},{"kind":"Field","name":{"kind":"Name","value":"profit"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}}]}}]}}]}}]} as unknown as DocumentNode<FetchBackTestQuery, FetchBackTestQueryVariables>;
export const FetchKbarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchKbars"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kbars"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"close"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<FetchKbarsQuery, FetchKbarsQueryVariables>;
export const FetchStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchStocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"dayTrade"}},{"kind":"Field","name":{"kind":"Name","value":"exchange"}},{"kind":"Field","name":{"kind":"Name","value":"limitDown"}},{"kind":"Field","name":{"kind":"Name","value":"limitUp"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"updateDate"}}]}}]}}]} as unknown as DocumentNode<FetchStocksQuery, FetchStocksQueryVariables>;