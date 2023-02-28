import { useState, useEffect, FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectBacktestsInformation } from '../../store/backtests/backtests.select';
import { DateRange } from '../../gql/graphql';
import {
	localStringOptions,
	localDateStringOptions,
} from '../backtest-tables/bcaktest-tables.component';

import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid/models';

import Box from '@mui/material/Box';

import BacktestTableTitle from '../backtest-table-title/backtest-table-title.component';

const backtestHistoryGridColumn: GridColDef[] = [
	{
		field: 'dateRange',
		headerName: '回測區間',
		width: 200,
		valueGetter: ({ value }: GridValueGetterParams<DateRange>) =>
			value &&
			`${new Date(value.startDate).toLocaleDateString(
				'zh-TW',
				localDateStringOptions
			)} ~ ${new Date(value.endDate).toLocaleDateString('zh-TW', localDateStringOptions)}`,
	},
	{
		field: 'stockCodeOrSelectionStrategyId',
		headerName: '股號或選股策略',
		valueGetter: (params: GridValueGetterParams) =>
			params.row.stockCode || params.row.stockSelectionStrategyId,
	},
	{ field: 'tradeStrategyId', headerName: '交易策略' },
	{
		field: 'startDatetime',
		headerName: '回測開始',
		width: 180,
		valueGetter: ({ value }) =>
			value && new Date(value).toLocaleString('zh-TW', localStringOptions),
	},
	{
		field: 'endDatetime',
		headerName: '回測結束',
		width: 180,
		valueGetter: ({ value }) =>
			value && new Date(value).toLocaleString('zh-TW', localStringOptions),
	},
];

type BacktestHistoriesTableProps = {
	setSelectedBacktestId: (value: string | number | null) => void;
};

const BacktestHistoriesTable: FC<BacktestHistoriesTableProps> = ({ setSelectedBacktestId }) => {
	const backtestsInformation = useAppSelector(selectBacktestsInformation);

	return (
		<Box sx={{ width: '100%' }}>
			<BacktestTableTitle text="回測紀錄" />
			<DataGrid
				sx={{ height: 350 }}
				columns={backtestHistoryGridColumn}
				rows={backtestsInformation}
				onSelectionModelChange={newSelectionModel => {
					if (newSelectionModel.length > 0) setSelectedBacktestId(newSelectionModel[0]);
					else setSelectedBacktestId(null);
				}}
			/>
		</Box>
	);
};

export default BacktestHistoriesTable;
