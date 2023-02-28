/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n\tquery fetchBackTest($backtestArgs: BacktestArgs!) {\n\t\tbacktest(backtestArgs: $backtestArgs) {\n                  id\n                  information {\n                        startDatetime\n                        endDatetime\n                        dateRange {\n                              startDate\n                              endDate\n                        }\n                        tradeStrategyId\n                        stockSelectionStrategyId\n                        stockCode\n                  }\n                  results {\n                        id\n                        code\n                        name\n                        tradeType\n                        entryPoint\n                        leavePoint\n                        roi\n                        profit\n                        cost\n                  }\n\t\t}\n\t}\n": types.FetchBackTestDocument,
    "\n\tquery fetchKbars($code: String!, $startDate: String!, $endDate: String!) {\n\t\tkbars(code: $code, startDate: $startDate, endDate: $endDate) {\n\t\t\ttimestamp\n\t\t\topen\n\t\t\thigh\n\t\t\tlow\n\t\t\tclose\n\t\t\tvolume\n\t\t\tamount\n\t\t}\n\t}\n": types.FetchKbarsDocument,
    "\n\tquery fetchStocks {\n\t\tstocks {\n            category\n            code\n            dayTrade\n            exchange\n            limitDown\n            limitUp\n            name\n            reference\n            updateDate\n\t\t}\n\t}\n": types.FetchStocksDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery fetchBackTest($backtestArgs: BacktestArgs!) {\n\t\tbacktest(backtestArgs: $backtestArgs) {\n                  id\n                  information {\n                        startDatetime\n                        endDatetime\n                        dateRange {\n                              startDate\n                              endDate\n                        }\n                        tradeStrategyId\n                        stockSelectionStrategyId\n                        stockCode\n                  }\n                  results {\n                        id\n                        code\n                        name\n                        tradeType\n                        entryPoint\n                        leavePoint\n                        roi\n                        profit\n                        cost\n                  }\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchBackTest($backtestArgs: BacktestArgs!) {\n\t\tbacktest(backtestArgs: $backtestArgs) {\n                  id\n                  information {\n                        startDatetime\n                        endDatetime\n                        dateRange {\n                              startDate\n                              endDate\n                        }\n                        tradeStrategyId\n                        stockSelectionStrategyId\n                        stockCode\n                  }\n                  results {\n                        id\n                        code\n                        name\n                        tradeType\n                        entryPoint\n                        leavePoint\n                        roi\n                        profit\n                        cost\n                  }\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery fetchKbars($code: String!, $startDate: String!, $endDate: String!) {\n\t\tkbars(code: $code, startDate: $startDate, endDate: $endDate) {\n\t\t\ttimestamp\n\t\t\topen\n\t\t\thigh\n\t\t\tlow\n\t\t\tclose\n\t\t\tvolume\n\t\t\tamount\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchKbars($code: String!, $startDate: String!, $endDate: String!) {\n\t\tkbars(code: $code, startDate: $startDate, endDate: $endDate) {\n\t\t\ttimestamp\n\t\t\topen\n\t\t\thigh\n\t\t\tlow\n\t\t\tclose\n\t\t\tvolume\n\t\t\tamount\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery fetchStocks {\n\t\tstocks {\n            category\n            code\n            dayTrade\n            exchange\n            limitDown\n            limitUp\n            name\n            reference\n            updateDate\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery fetchStocks {\n\t\tstocks {\n            category\n            code\n            dayTrade\n            exchange\n            limitDown\n            limitUp\n            name\n            reference\n            updateDate\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;