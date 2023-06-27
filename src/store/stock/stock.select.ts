import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectStockReducer = (rootState: RootState) => rootState.stock;

export const selectStockRealtime = createSelector([selectStockReducer], stock => stock.realtime);
