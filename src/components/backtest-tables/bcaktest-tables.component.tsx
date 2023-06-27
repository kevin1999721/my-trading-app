import { useState, useEffect } from 'react';
import { BacktestResult } from '../../gql/graphql';
import { KbarFrequency } from '../../utils/highcharts/highcharts.util';

import Box from '@mui/material/Box';

import BacktestHistoriesTable from '../backtest-histories-table/backtest-histories-table.component';
import BacktestStatisticsTable from '../backtest-statistics-table/backtest-statistics-table.component';
import BacktestResultsTable from '../backtest-results-table/backtest-results-table.component';
import Kbar from '../kbar/kbar.component';

const BacktestTables = () => {
	const [selectedBacktestId, setSelectedBacktestId] = useState<string | number | null>(null);
	const [filteredBacktestResults, setFilteredBacktestResults] = useState<BacktestResult[]>([]);
	const [selectedBacktestResult, setSelectedBacktestResult] = useState<BacktestResult | null>(null);

	useEffect(() => {
		setSelectedBacktestResult(null);
	}, [selectedBacktestId]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<BacktestHistoriesTable setSelectedBacktestId={setSelectedBacktestId} />
			<BacktestResultsTable
				selectedBacktestId={selectedBacktestId}
				setSelectedBacktestResult={setSelectedBacktestResult}
				setFilteredBacktestResults={setFilteredBacktestResults}
			/>
			<BacktestStatisticsTable backtestResults={filteredBacktestResults} />
			{selectedBacktestResult?.code && (
				<Kbar
					kbarsArgs={{
						code: selectedBacktestResult.code,
						startDate: new Date(selectedBacktestResult.entryPoint).toLocaleDateString('sv'),
						endDate: new Date(selectedBacktestResult.leavePoint).toLocaleDateString('sv'),
						period: 5,
						frequency: KbarFrequency.T,
						requiredPreTradeDays: 5,
					}}
					title={`${selectedBacktestResult.name} ${selectedBacktestResult.code}`}
					flags={{
						type: 'flags',
						id: 'flags',
						data: [
							{
								x:
									new Date(selectedBacktestResult.entryPoint).getTime() -
									new Date().getTimezoneOffset() * 60000,
								title: '進場點',
							},
							{
								x:
									new Date(selectedBacktestResult.leavePoint).getTime() -
									new Date().getTimezoneOffset() * 60000,
								title: '出場點',
							},
						],
						onSeries: 'candlestick',
						shape: 'squarepin',
						width: 45,
						y: -30,
					}}
				/>
			)}
		</Box>
	);
};

export default BacktestTables;
