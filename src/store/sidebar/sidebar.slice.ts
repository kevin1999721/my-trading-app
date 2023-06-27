import { createSlice } from '@reduxjs/toolkit';

type SidebarState = {
	isSidebarOpen: boolean;
};

const initialState: SidebarState = {
	isSidebarOpen: false,
};

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		toggleIsSidebarOpen: state => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
	},
});

export const { toggleIsSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
