import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockRealtime } from '../../gql/graphql';

type StockState = {
	realtime: StockRealtime | null;
};

const initialState: StockState = {
	realtime: null,
};

export const stockSlice = createSlice({
	name: 'stock',
	initialState,
	reducers: {
		updateStockRealtime: (state, action: PayloadAction<StockRealtime | null>) => {
			state.realtime = action.payload;
		},
	},
});

export const { updateStockRealtime } = stockSlice.actions;
export default stockSlice.reducer;
