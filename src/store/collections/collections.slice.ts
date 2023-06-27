import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CollectionsState = {
	stockCodes: string[];
};

const initialState: CollectionsState = {
	stockCodes: [],
};

export const collectionsSlice = createSlice({
	name: 'collections',
	initialState,
	reducers: {
		addStockCode: (state, action: PayloadAction<string>) => {
			state.stockCodes.push(action.payload);
		},
		removeStockCode: (state, action: PayloadAction<string>) => {
			const index = state.stockCodes.indexOf(action.payload);
			if (index > -1) state.stockCodes.splice(index, 1);
		},
		updateStockCode: (state, action: PayloadAction<string>) => {
			const index = state.stockCodes.indexOf(action.payload);
			if (index > -1) state.stockCodes.splice(index, 1);
			else state.stockCodes.push(action.payload);
		},
	},
});

export const { addStockCode, removeStockCode, updateStockCode } = collectionsSlice.actions;
export default collectionsSlice.reducer;
