import { gql } from '../../gql/gql';

export const QUERY_BACKTEST = gql(`
	query fetchBackTest($backtestArgs: BacktestArgs!) {
		backtest(backtestArgs: $backtestArgs) {
                  id
                  information {
                        startDatetime
                        endDatetime
                        dateRange {
                              startDate
                              endDate
                        }
                        tradeStrategyId
                        stockSelectionStrategyId
                        stockCode
                  }
                  results {
                        id
                        code
                        name
                        tradeType
                        entryPoint
                        leavePoint
                        roi
                        profit
                        cost
                  }
		}
	}
`);

export const QUERY_KBARS = gql(`
	query fetchKbars($kbarsArgs: KbarsArgs!) {
		kbars(kbarsArgs: $kbarsArgs) {
			timestamp
			open
			high
			low
			close
			volume
			amount
		}
	}
`);

export const QUERY_STOCKS = gql(`
	query fetchStocks {
		stocks {
                  category
                  code
                  dayTrade
                  exchange
                  limitDown
                  limitUp
                  name
                  reference                 
                  updateDate
		}
	}
`);

export const QUERY_STOCK = gql(`
	query fetchStock($code: String!) {
		stock(code : $code) {
                  category
                  code
                  dayTrade
                  exchange
                  limitDown
                  limitUp
                  name
                  reference
                  updateDate
		}
	}
`);

export const QUERY_STOCK_REALTIME = gql(`
	query fetchStockRealtime($code: String!) {
            stockRealtime(code : $code) {
                  info {
                    category
                    code
                    dayTrade
                    exchange
                    limitDown
                    limitUp
                    name
                    reference                    
                    updateDate
                  }
                  kbars {
                        timestamp
                        open
                        high
                        low
                        close
                        volume
                        amount
                  }
                  askPrice
                  askVolume
                  bidPrice
                  bidVolume
                  changePrice
                  changeRate
                  close
                  high
                  low
                  open
                  volume
                  yesterdayVolume
            }
	}
`);

export const QUERY_STOCKS_REALTIME = gql(`
	query fetchStocksRealtime($codes: [String!]!) {
            stocksRealtime(codes : $codes) {
                  info {
                    category
                    code
                    dayTrade
                    exchange
                    limitDown
                    limitUp
                    name
                    reference                    
                    updateDate
                  }
                  kbars {
                        timestamp
                        open
                        high
                        low
                        close
                        volume
                        amount
                  }
                  askPrice
                  askVolume
                  bidPrice
                  bidVolume
                  changePrice
                  changeRate
                  close
                  high
                  low
                  open
                  volume
                  yesterdayVolume
            }
	}
`);

export const QUERY_MAJORS_TRENDS = gql(`
      query fetchMajorTrends($code: String!, $startDate: Date!, $endDate: Date!) {
            majorsTrends(code: $code, startDate: $startDate, endDate: $endDate) {
                  startDate
                  endDate
                  majorsBuyRank {
                        buy
                        diff
                        percentOfVolume
                        securitiesFirm
                        sell
                  }
                  majorsSellRank {
                        buy
                        diff
                        percentOfVolume
                        securitiesFirm
                        sell
                  }
            }
      }
`);

export const QUERY_MAJORS_TREND = gql(`
      query fetchMajorTrend($majorsTrendArgs: MajorsTrendArgs!) {
            majorsTrend(majorsTrendArgs: $majorsTrendArgs) {
                  startDate
                  endDate
                  majorsBuyRank {
                        buy
                        diff
                        percentOfVolume
                        securitiesFirm
                        sell
                  }
                  majorsSellRank {
                        buy
                        diff
                        percentOfVolume
                        securitiesFirm
                        sell
                  }
            }
      }
`);

// export const QUERY_SHAREHOLDERS = gql(`
//       query fetchShareholders($code: String!) {
//             shareholders(code: $code) {
//                   date
//                   data {
//                         id
//                         percentOfTotalShareholders
//                         shareholders
//                         totalShares
//                   }
//             }
//       }
// `);

export const QUERY_SHAREHOLDERS = gql(`
      query fetchShareholders($code: String!) {
            shareholders(code: $code) {
                  date
                  moreThanFourHundred
                  moreThanFourHundredPercent
                  moreThanOenThousand
                  moreThanOneThousandPercent
                  totalShareholders
                  close
            }
      }
`);

export const QUERY_NEWS_LIST = gql(`
      query fetchNewsList($code: String!) {
            newsList(code: $code) {
                  aticle
                  author
                  datetime
                  description
                  title
            }
      }
`);

export const QUERY_WORLD_INDEXES = gql(`
      query fetchWorldIndexes {
            worldIndexes {
                  code
                  name
                  link
                  price
                  change
                  changePercent
                  updateDatetime
            }
      }
`);

export const QUERY_MARKET_REALTIME = gql(`
      query fetchMarketRealtime {
            marketRealtime {
                  info {
                        category
                        code
                        dayTrade
                        exchange
                        limitDown
                        limitUp
                        name
                        reference
                        updateDate
                  }
                  open
                  high
                  low
                  close
                  volume
                  yesterdayVolume
                  changePrice
                  changeRate
                  askPrice
                  askVolume
                  bidPrice
                  bidVolume
                  kbars {
                        timestamp
                        open
                        high
                        low
                        close
                        volume
                        amount
                  }
            }
      }
`);

export const QUERY_STOCKS_RANK = gql(`
      query fetchStocksRank($stocksRankArgs: StocksRankArgs!){
            stocksRank(stocksRankArgs: $stocksRankArgs){
                  date
                  code
                  name
                  ts
                  open
                  high
                  low
                  close
                  changePrice
                  changeType
                  averagePrice
                  volume
                  totalVolume
                  yesterdayVolume
                  volumeRatio
            }
      }
`);
