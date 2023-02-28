import { useState, useEffect } from 'react';
import { BacktestResult } from '../../gql/graphql';

import Box from '@mui/material/Box';

import BacktestHistoriesTable from '../backtest-histories-table/backtest-histories-table.component';
import BacktestStatisticsTable from '../backtest-statistics-table/backtest-statistics-table.component';
import BacktestResultsTable from '../backtest-results-table/backtest-results-table.component';
import Kbar from '../kbar/kbar.component';

export const localDateStringOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
};

export const localStringOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hour12: false,
};

const BacktestTables = () => {
	const [selectedBacktestId, setSelectedBacktestId] = useState<string | number | null>(null);
	const [filteredBacktestResults, setFilteredBacktestResults] = useState<BacktestResult[]>([]);
	const [selectedBacktestResult, setSelectedBacktestResult] = useState<BacktestResult | null>(null);
	console.log(selectedBacktestResult);

	useEffect(() => {
		setSelectedBacktestResult(null);
	}, [selectedBacktestId]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
			<BacktestHistoriesTable setSelectedBacktestId={setSelectedBacktestId} />
			<BacktestResultsTable
				selectedBacktestId={selectedBacktestId}
				setSelectedBacktestResult={setSelectedBacktestResult}
				setFilteredBacktestResults={setFilteredBacktestResults}
			/>
			<BacktestStatisticsTable backtestResults={filteredBacktestResults} />
			{selectedBacktestResult?.code && (
				<Kbar
					code={selectedBacktestResult.code}
					startDate={new Date(selectedBacktestResult.entryPoint).toLocaleDateString('sv')}
					endDate={new Date(selectedBacktestResult.leavePoint).toLocaleDateString('sv')}
				/>
			)}
		</Box>
	);
};

export default BacktestTables;
