import { gql } from '../../gql/gql';

export const QUERY_BACKTEST = gql(`
	query fetchBackTest($backtestArgs: BacktestArgs!) {
		backtest(backtestArgs: $backtestArgs) {
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
	query fetchKbars($code: String!, $startDate: String!, $endDate: String!) {
		kbars(code: $code, startDate: $startDate, endDate: $endDate) {
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
