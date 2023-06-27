import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getDesignTokens } from './utils/theme/theme.util';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectThemeMode } from './store/theme/theme.select';
import { getCurrenetSigninUser } from './store/user/user.slice';
import { zhTW } from '@mui/material/locale';
import { zhTW as dataGridZhtw } from '@mui/x-data-grid';
import { CssBaseline } from '@mui/material';

import Default from './routes/default/default.component';
import Homepage from './routes/homepage/homepage.component';
import Backtest from './routes/bcaktest/backtest.component';
import Stock from './routes/stock/stock.component';
import StockRealtime from './routes/stock-realtime/stock-realtime.component';
import StockTechnical from './routes/stock-technical/sotck-technical.component';
import StockMajor from './routes/stock-major/stock-major.component';
import StockShareholders from './routes/stock-shareholders/stock-shareholders.component';

function App() {
	const dispatch = useAppDispatch();
	const themeMode = useAppSelector(selectThemeMode);
	const theme = createTheme(getDesignTokens(themeMode), ...[zhTW, dataGridZhtw]);

	useEffect(() => {
		dispatch(getCurrenetSigninUser());
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Default />}>
					<Route index element={<Homepage />}></Route>
					<Route path="/backtest" element={<Backtest />} />
					<Route path="/stock/:stockCode" element={<Stock />}>
						<Route index element={<StockRealtime />} />
						<Route path="/stock/:stockCode/technical" element={<StockTechnical />} />
						<Route path="/stock/:stockCode/major" element={<StockMajor />} />
						<Route path="/stock/:stockCode/shareholders" element={<StockShareholders />} />
					</Route>
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
