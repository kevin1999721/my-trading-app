import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Backtest } from '../../gql/graphql';
import { ApolloError } from '@apollo/client';

type BacktestsState = {
	backtests: Backtest[];
	isLoading: boolean;
	error: ApolloError | null;
};

const initialState: BacktestsState = {
	backtests: [],
	isLoading: false,
	error: null,
};

export const backtestsSlice = createSlice({
	name: 'backtests',
	initialState,
	reducers: {
		addBacktest: (state, action: PayloadAction<Backtest>) => {
			state.backtests.push(action.payload);
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<any>) => {
			state.error = action.payload;
		},
	},
});

export const { addBacktest, setIsLoading, setError } = backtestsSlice.actions;
export default backtestsSlice.reducer;
