import { useState, useEffect, ReactEventHandler } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectIsLoading, selectBacktests } from '../../store/backtests/backtests.select';
import { BacktestResult } from '../../gql/graphql';

// import { testData } from './testData';

import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { GridValueFormatterParams } from '@mui/x-data-grid/models';
import Kbar from '../kbar/kbar.component';

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
		width: 200,
		type: 'dateTime',
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: 'leavePoint',
		headerName: '出場點',
		width: 200,
		type: 'dateTime',
		valueGetter: ({ value }) => value && new Date(value),
	},
	{
		field: 'roi',
		headerName: '投報率',
		valueFormatter: ({ value }: GridValueFormatterParams<Number>) => (value ? `${value} % ` : ''),
	},
	{ field: 'profit', headerName: '獲利' },
	{ field: 'cost', headerName: '成本' },
];

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
	{ field: 'winningPercentage', headerName: '勝率' },
];

type statisticalData = {
	id: string | number;
	tradeType: number;
	roi: number;
	totalProfit: number;
	totalCost: number;
	winningPercentage: number;
	winningNumber: number;
	TradeNumber: number;
};

type GetDataById<T> = (dataset: T[], id: string | number) => T | null;

const getDataById: GetDataById<BacktestResult> = (dataset, id) => {
	return dataset.find(data => data.id === id) || null;
};

const countBackTestResults = (dataset: BacktestResult[]) => {
	let statisticalData: statisticalData[] = [];
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

const TestResultsTable = () => {
	const isLoading = useAppSelector(selectIsLoading);
	const backtests = useAppSelector(selectBacktests);
	console.log(isLoading, backtests);
	// const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
	const [selectedData, setSelectedData] = useState<BacktestResult | null>(null);
	return (
		<div>
			{isLoading && <span>isloading ...</span>}
			{backtests.length > 0 && (
				<>
					<div style={{ height: 350, width: '100%' }}>
						<DataGrid
							columns={dataGridColumn}
							rows={backtests[backtests.length - 1].results}
							onSelectionModelChange={newSelectionModel => {
								if (newSelectionModel.length > 0)
									setSelectedData(
										getDataById(backtests[backtests.length - 1].results, newSelectionModel[0])
									);
							}}
						/>
					</div>
					<div style={{ height: 350, width: 500 }}>
						<DataGrid
							columns={statisticDataGridColumn}
							rows={countBackTestResults(backtests[backtests.length - 1].results)}
						/>
					</div>
				</>
			)}

			{selectedData?.code && (
				<Kbar
					code={selectedData.code}
					startDate={new Date(selectedData.entryPoint).toLocaleDateString('sv')}
					endDate={new Date(selectedData.leavePoint).toLocaleDateString('sv')}
				/>
			)}
		</div>
	);
};

export default TestResultsTable;
