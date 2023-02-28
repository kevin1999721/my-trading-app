import { useState, useEffect, FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
	selectIsLoading,
	selectBacktests,
	selectBacktestsInformation,
} from '../../store/backtests/backtests.select';
import { BacktestResult, BacktestInformation, DateRange } from '../../gql/graphql';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid/models';

import Box from '@mui/material/Box';
import BacktestTableTitle from '../backtest-table-title/backtest-table-title.component';

const statisticDataGridColumn: GridColDef[] = [
	{
		field: 'tradeType',
		headerName: '',
		valueFormatter: ({ value }: GridValueFormatterParams<Number>) => {
			if (value === 0) return '全部';
			else if (value === 1) return '多';
			else if (value === 2) return '空';
		},
	},
	{ field: 'roi', headerName: '投報率' },
	{ field: 'totalProfit', headerName: '總獲利' },
	{ field: 'totalCost', headerName: '總成本' },
	{
		field: 'winningPercentage',
		headerName: '勝率',
		valueFormatter: ({ value }: GridValueFormatterParams<Number>) => `${value} % `,
	},
];

type StatisticalData = {
	id: string | number;
	tradeType: number;
	roi: number;
	totalProfit: number;
	totalCost: number;
	winningPercentage: number;
	winningNumber: number;
	TradeNumber: number;
};

const countBackTestResults = (dataset: BacktestResult[]) => {
	let statisticalData: StatisticalData[] = [];
	for (let i = 0; i < 3; i++) {
		statisticalData.push({
			id: i,
			tradeType: i,
			roi: 0,
			totalProfit: 0,
			totalCost: 0,
			winningPercentage: 0,
			winningNumber: 0,
			TradeNumber: 0,
		});
	}

	dataset.forEach(data => {
		statisticalData[0].totalCost += data.cost;
		statisticalData[0].totalProfit += data.profit;
		statisticalData[0].winningNumber += data.profit > 0 ? 1 : 0;
		statisticalData[0].TradeNumber += 1;

		statisticalData[data.tradeType].totalCost += data.cost;
		statisticalData[data.tradeType].totalProfit += data.profit;
		statisticalData[data.tradeType].winningNumber += data.profit > 0 ? 1 : 0;
		statisticalData[data.tradeType].TradeNumber += 1;
	});

	statisticalData = statisticalData.map(data => {
		let roi = Math.round((data.totalProfit / data.totalCost) * 10000) / 100;
		let winningPercentage = Math.round((data.winningNumber / data.TradeNumber) * 10000) / 100;
		return { ...data, roi, winningPercentage };
	});

	return statisticalData;
};

type BacktestStatisticsTableProps = {
	backtestResults: BacktestResult[];
};

const BacktestStatisticsTable: FC<BacktestStatisticsTableProps> = ({ backtestResults }) => {
	return (
		<>
			{backtestResults.length > 0 && (
				<Box sx={{ width: 500 }}>
					<BacktestTableTitle text={'統計'} />
					<DataGrid
						autoHeight
						columns={statisticDataGridColumn}
						rows={countBackTestResults(backtestResults)}
					/>
				</Box>
			)}
		</>
	);
};

export default BacktestStatisticsTable;
