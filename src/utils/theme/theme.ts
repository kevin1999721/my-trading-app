import { createTheme } from '@mui/material/styles';
import { zhTW } from '@mui/material/locale';
import { zhTW as dataGridZhtw } from '@mui/x-data-grid';
import { zhCN } from '@mui/x-date-pickers';

export const theme = createTheme(
	{
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
		},
		palette: {
			primary: { main: '#1976d2' },
		},
		spacing: 0,
	},
	dataGridZhtw,
	zhTW,
	zhCN
);
