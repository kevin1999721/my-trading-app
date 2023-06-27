import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectCollectionsReducer = (state: RootState) => state.collections;

export const selectStockCodes = createSelector(
	[selectCollectionsReducer],
	collections => collections.stockCodes
);
