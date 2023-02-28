import { useState, useEffect, FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
	selectIsLoading,
	selectBacktests,
	selectBacktestsInformation,
} from '../../store/backtests/backtests.select';
import { Backtest, BacktestResult } from '../../gql/graphql';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid/models';
import {
	localStringOptions,
	localDateStringOptions,
} from '../backtest-tables/bcaktest-tables.component';

import Box from '@mui/material/Box';

import BacktestTableTitle from '../backtest-table-title/backtest-table-title.component';

const dataGridColumn: GridColDef[] = [
	{ field: 'code', headerName: '股號' },
	{
		field: 'tradeType',
		headerName: '交易方向',
		valueFormatter: ({ value }: GridValueFormatterParams<Number>) => (value === 1 ? '多' : '空'),
	},
	{
		field: 'entryPoint',
		headerName: '進場點',
		type: 'dateTime',
		width: 200,
		valueGetter: ({ value }) =>
			value && new Date(value).toLocaleString('zh-tw', localStringOptions),
	},
	{
		field: 'leavePoint',
		headerName: '出場點',
		width: 200,
		valueGetter: ({ value }) =>
			value && new Date(value).toLocaleString('zh-tw', localStringOptions),
	},
	{
		field: 'roi',
		headerName: '投報率',
		valueFormatter: ({ value }: GridValueFormatterParams<Number>) => `${value} % `,
	},
	{ field: 'profit', headerName: '獲利' },
	{ field: 'cost', headerName: '成本' },
];

export type GetDataById<T> = (dataset: T[], id: string | number | null) => T | null;

const getBacktestById: GetDataById<Backtest> = (dataset, id) => {
	return dataset.find(data => data.id === id) || null;
};

const getBacktestResultById: GetDataById<BacktestResult> = (dataset, id) => {
	return dataset.find(data => data.id === id) || null;
};

type BacktestResultsTableProps = {
	selectedBacktestId: string | number | null;
	setSelectedBacktestResult: (value: BacktestResult | null) => void;
	setFilteredBacktestResults: (value: BacktestResult[]) => void;
};

const BacktestResultsTable: FC<BacktestResultsTableProps> = ({
	selectedBacktestId,
	setSelectedBacktestResult,
	setFilteredBacktestResults,
}) => {
	const backtests = useAppSelector(selectBacktests);
	const [selectedBacktest, setSelectedBacktest] = useState<Backtest | null>(null);
	const [backtestResults, setBacktestResults] = useState<BacktestResult[]>([]);

	useEffect(() => {
		setSelectedBacktest(getBacktestById(backtests, selectedBacktestId));
	}, [selectedBacktestId]);

	useEffect(() => {
		if (selectedBacktest) {
			setBacktestResults(selectedBacktest.results);
			setFilteredBacktestResults(selectedBacktest.results);
		} else {
			setBacktestResults([]);
			setFilteredBacktestResults([]);
		}
	}, [selectedBacktest]);

	return (
		<Box sx={{ width: '100%' }}>
			<BacktestTableTitle text="回測結果" />
			<DataGrid
				sx={{ height: 350 }}
				columns={dataGridColumn}
				rows={backtestResults}
				onSelectionModelChange={newSelectionModel => {
					if (newSelectionModel.length > 0)
						setSelectedBacktestResult(getBacktestResultById(backtestResults, newSelectionModel[0]));
					else setSelectedBacktestResult(null);
				}}
			/>
		</Box>
	);
};

export default BacktestResultsTable;
