import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Backtest } from '../../gql/graphql';
import { ApolloError } from '@apollo/client';
import {
	getTradeStrategiesDocs,
	getStockSelectionStrategiesDocs,
	Strategy,
} from '../../utils/firebase/firebase.utils';

type BacktestsState = {
	backtests: Backtest[];
	tradeStrategies: Strategy[];
	stockSelectionStrategies: Strategy[];
	isLoading: boolean;
	error: ApolloError | null;
};

const initialState: BacktestsState = {
	backtests: [],
	tradeStrategies: [],
	stockSelectionStrategies: [],
	isLoading: false,
	error: null,
};

export const thunkGetTradeStrategiesDocs = createAsyncThunk<Strategy[], void>(
	'backtest/GetBacktestStrategies',
	async (_, thunkapi) => {
		const strategies = await getTradeStrategiesDocs();
		return strategies;
	}
);

export const thunkGetStockSelectionStrategiesDocs = createAsyncThunk<Strategy[], void>(
	'backtest/GetSelectionStrategiesDocs',
	async (_, thunkapi) => {
		const strategies = await getStockSelectionStrategiesDocs();
		return strategies;
	}
);

export const backtestsSlice = createSlice({
	name: 'backtests',
	initialState,
	reducers: {
		addBacktest: (state, action: PayloadAction<Backtest>) => {
			state.backtests.push(action.payload);
		},
		deleteBacktest: (state, action: PayloadAction<string>) => {
			const index = state.backtests.findIndex(backtest => backtest.id === action.payload);
			if (index > -1) state.backtests.splice(index, 1);
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<any>) => {
			state.error = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(thunkGetTradeStrategiesDocs.fulfilled, (state, action) => {
			state.tradeStrategies = action.payload;
		});

		builder.addCase(thunkGetStockSelectionStrategiesDocs.fulfilled, (state, action) => {
			state.stockSelectionStrategies = action.payload;
		});
	},
});

export const { addBacktest, deleteBacktest, setIsLoading, setError } = backtestsSlice.actions;
export default backtestsSlice.reducer;
