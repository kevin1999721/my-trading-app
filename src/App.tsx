import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Backtest from './routes/bcaktest/backtest.component';
import Stock from './routes/stock/stock.component';

import './App.css';

function App() {
	return (
		<Routes>
			<Route path="/backtest" element={<Backtest />} />
			<Route path="/sotck" element={<Stock />} />
		</Routes>
	);
}

export default App;
