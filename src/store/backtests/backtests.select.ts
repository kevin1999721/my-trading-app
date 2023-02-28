import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectBacktestsReducer = (state: RootState) => state.backtests;

export const selectBacktests = createSelector(
	[selectBacktestsReducer],
	backtestsReducer => backtestsReducer.backtests
);

export const selectBacktestsInformation = createSelector([selectBacktests], backtests => {
	return backtests.map(backtest => {
		return { id: backtest.id, ...backtest.information };
	});
});

export const selectIsLoading = createSelector(
	[selectBacktestsReducer],
	backtestsReducer => backtestsReducer.isLoading
);
