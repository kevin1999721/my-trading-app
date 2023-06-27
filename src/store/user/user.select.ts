import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector([selectUserReducer], user => user.currentUser);

export const selectIsAuthenticationFormOpen = createSelector(
	[selectUserReducer],
	user => user.isAuthenticationFormOpen
);
