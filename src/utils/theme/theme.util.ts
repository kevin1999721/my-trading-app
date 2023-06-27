import { PaletteMode, ThemeOptions, SxProps } from '@mui/material';
import { blue, red, green, grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
	interface Palette {
		red: Palette['primary'];
		green: Palette['primary'];
		boreder: Palette['primary'];
		shadow: Palette['primary'];
	}

	interface PaletteOptions {
		red?: PaletteOptions['primary'];
		green?: PaletteOptions['primary'];
		boreder?: PaletteOptions['primary'];
		shadow?: PaletteOptions['primary'];
	}
}

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
	return {
		palette: {
			mode: mode,
			...(mode === 'light'
				? {
						primary: {
							main: blue[700],
						},
						red: {
							main: red[700],
						},
						green: {
							main: green[500],
						},
						boreder: {
							main: grey[300],
						},
						shadow: {
							main: 'rgba(0,0,0,0.2)',
						},
						background: {
							paper: '#fcfcfc',
							default: '#f6f6f6',
						},
				  }
				: {
						primary: {
							main: blue[400],
						},
						red: {
							main: red[500],
						},
						green: {
							main: green[300],
						},
						boreder: {
							main: 'rgba(80, 80, 80, 0.6)',
						},
						shadow: {
							main: 'rgba(0,0,0,0.2)',
						},
						background: {
							paper: '#142434',
							default: '#0a1929',
						},
				  }),
		},
		typography: {
			fontFamily: [
				'"Noto Sans TC"',
				'sans-serif',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
			h1: {
				fontSize: '40px',
			},
			h2: {
				fontSize: '36px',
			},
			h3: {
				fontSize: '32px',
			},
			h4: {
				fontSize: '28px',
				fontWeight: 500,
			},
			h5: {
				fontSize: '24px',
				fontWeight: 500,
			},
			h6: {
				fontSize: '20px',
			},
			body1: {
				fontSize: '16px',
			},
			body2: {
				fontSize: '14px',
			},
		},
	};
};

export const sxDashboard: SxProps = {
	padding: '10px',
	borderRadius: '10px',
	backgroundColor: 'background.paper',
	boxShadow: 4,
};
