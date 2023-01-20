import { gql } from './gql';

export const QUERY_BACKTEST_RESULTS = gql(`
	query fetchTestResults{
		testResults {
            startTime
            endTime
            results{
                code
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
