import { useState, useEffect, useMemo, FC } from 'react';
import { useTheme } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectBacktests } from '../../store/backtests/backtests.select';
import { Backtest, BacktestResult } from '../../gql/graphql';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridValueFormatterParams } from '@mui/x-data-grid/models';
import { localStringOptions } from '../../utils/date/date.utils';
import { sxDashboard } from '../../utils/theme/theme.util';
import { FilteringSetting } from '../../utils/data-grid/data-grid.utils';

import Box from '@mui/material/Box';

import BacktestTableTitle from '../backtest-table-title/backtest-table-title.component';
import TableFilteringPanel from '../table-filtering-panel/table-filtering-panel.component';

const dataGridColumn: GridColDef<BacktestResult>[] = [
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

const filteringSettings: FilteringSetting<BacktestResult>[] = [
	{
		field: 'code',
		fieldName: '股號',
		type: 'string',
	},
	{
		field: 'tradeType',
		fieldName: '交易方向',
		type: 'string',
		valueGetter: value => (value === 1 ? '多' : '空'),
	},
	{
		field: 'entryPoint',
		fieldName: '進場點',
		type: 'dateTime',
	},
	{
		field: 'leavePoint',
		fieldName: '出場點',
		type: 'dateTime',
	},
	{
		field: 'roi',
		fieldName: '投報率',
		type: 'number',
	},
	{
		field: 'profit',
		fieldName: '獲利',
		type: 'number',
	},
	{
		field: 'cost',
		fieldName: '成本',
		type: 'number',
	},
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
	const selectedBacktest = useMemo<Backtest | null>(
		() => getBacktestById(backtests, selectedBacktestId),
		[backtests, selectedBacktestId]
	);
	const backtestResults = useMemo(
		() => (selectedBacktest ? selectedBacktest.results : []),
		[selectedBacktest]
	);
	const [filteringRows, setFilteringRows] = useState<BacktestResult[]>(backtestResults);

	const { palette } = useTheme();

	useEffect(() => {
		setFilteredBacktestResults(filteringRows);
	}, [filteringRows]);

	return (
		<Box sx={{ width: '100%' }}>
			<BacktestTableTitle text="回測結果" />
			<Box sx={{ ...sxDashboard }}>
				<DataGrid
					disableColumnFilter
					sx={{
						height: 350,
						'& .MuiDataGrid-row.positive, & .MuiDataGrid-row.positive.Mui-selected:hover': {
							backgroundColor: palette.red.main + '80',
						},
						'& .MuiDataGrid-row.negative, & .MuiDataGrid-row.negative.Mui-selected:hover': {
							backgroundColor: palette.green.main + '50',
						},
						'& .MuiDataGrid-row.Mui-selected': {
							border: '1px solid',
							borderColor: palette.primary.light,
						},
						'& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell': {
							borderBottom: 'unset',
						},
						'& .MuiDataGrid-cell:focus': {
							outline: 'unset',
						},
					}}
					columns={dataGridColumn}
					rows={filteringRows}
					getRowClassName={params =>
						params.row.profit > 0 ? 'positive' : params.row.profit < 0 ? 'negative' : ''
					}
					onSelectionModelChange={newSelectionModel => {
						if (newSelectionModel.length > 0) {
							setSelectedBacktestResult(
								getBacktestResultById(backtestResults, newSelectionModel[0])
							);
							setTimeout(
								() => document.querySelector('#kbar')?.scrollIntoView({ behavior: 'smooth' }),
								0
							);
						} else setSelectedBacktestResult(null);
					}}
					components={{
						Toolbar: TableFilteringPanel,
					}}
					componentsProps={{
						toolbar: {
							originalRows: backtestResults,
							filteringSettings: filteringSettings,
							setFilteringRows: setFilteringRows,
						},
					}}
				/>
			</Box>
		</Box>
	);
};

export default BacktestResultsTable;
