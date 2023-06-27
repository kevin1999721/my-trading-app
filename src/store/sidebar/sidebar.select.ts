import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSidebarReducer = (state: RootState) => state.sidebar;

export const selectIsSidebarOpen = createSelector(
	[selectSidebarReducer],
	sidebar => sidebar.isSidebarOpen
);
