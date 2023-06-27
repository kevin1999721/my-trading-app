import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SelectBacktestInformation = {
	id: string;
	rangeStartDate: any;
	rangeEndDate: any;
	stockCode?: string | null;
	stockSelectionStrategyName?: string | null;
	tradeStrategyName: string;
	startDatetime: any;
	endDatetime: any;
};

const selectBacktestsReducer = (state: RootState) => state.backtests;

export const selectBacktests = createSelector(
	[selectBacktestsReducer],
	backtestsReducer => backtestsReducer.backtests
);

export const selectTradeStrategies = createSelector(
	[selectBacktestsReducer],
	backtestReducer => backtestReducer.tradeStrategies
);

export const selectStockSelectionStrategies = createSelector(
	[selectBacktestsReducer],
	backtestReducer => backtestReducer.stockSelectionStrategies
);

export const selectBacktestsInformation = createSelector(
	[selectBacktests, selectTradeStrategies, selectStockSelectionStrategies],
	(backtests, tradeStrategies, stockSelectionStrategies): SelectBacktestInformation[] => {
		return backtests.map(backtest => {
			const { dateRange, stockSelectionStrategyId, tradeStrategyId, ...elseInformation } =
				backtest.information;
			const stockSelectionStrategy = stockSelectionStrategies.find(
				strategy => strategy.id === stockSelectionStrategyId
			);
			const tradeStrategy = tradeStrategies.find(strategy => strategy.id === tradeStrategyId);

			return {
				id: backtest.id,
				rangeStartDate: dateRange.startDate,
				rangeEndDate: dateRange.endDate,
				stockSelectionStrategyName:
					(stockSelectionStrategy && stockSelectionStrategy.name) || stockSelectionStrategyId,
				tradeStrategyName: (tradeStrategy && tradeStrategy.name) || tradeStrategyId,
				...elseInformation,
			};
		});
	}
);

export const selectIsLoading = createSelector(
	[selectBacktestsReducer],
	backtestsReducer => backtestsReducer.isLoading
);
