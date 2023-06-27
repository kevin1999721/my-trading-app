import { createSlice } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

type ThemeState = {
	mode: PaletteMode;
};

const initialState: ThemeState = {
	mode: 'light',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleThemePaletteMode: state => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
	},
});

export const { toggleThemePaletteMode } = themeSlice.actions;
export default themeSlice.reducer;
