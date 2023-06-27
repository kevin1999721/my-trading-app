import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectThemeReducer = (state: RootState) => state.theme;

export const selectThemeMode = createSelector(
	[selectThemeReducer],
	themeReducer => themeReducer.mode
);
