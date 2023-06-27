import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { FetchStocksRankQuery } from '../../gql/graphql';
import clsx from 'clsx';

import { Box } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridValueFormatterParams,
	GridCellParams,
	GridSelectionModel,
} from '@mui/x-data-grid';

type QueryStockRank = FetchStocksRankQuery['stocksRank'][number];

const columns: GridColDef<QueryStockRank>[] = [
	{
		field: 'stock',
		headerName: '個股',
		minWidth: 125,
		flex: 1,
		valueGetter: params => {
			const { code, name } = params.row;
			return `${code} ${name}`;
		},
		cellClassName: (params: GridCellParams<string, QueryStockRank>) => {
			return 'stock-name';
		},
	},
	{
		field: 'close',
		headerName: '成交價',
		minWidth: 80,
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<number>) => params.value.toFixed(2),
		cellClassName: (params: GridCellParams<number, QueryStockRank>) => {
			const { changeType } = params.row;
			return clsx('close', {
				'limit-up': changeType === 1,
				up: changeType === 2,
				unchanged: changeType === 3,
				down: changeType === 4,
				'limit-down': changeType === 5,
			});
		},
	},
	{
		field: 'changePrice',
		headerName: '漲跌',
		minWidth: 80,
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<number>) => params.value.toFixed(2),
		cellClassName: (params: GridCellParams<number, QueryStockRank>) => {
			const { changeType } = params.row;
			return clsx('change-price', {
				up: changeType === 1 || changeType === 2,
				unchanged: changeType === 3,
				down: changeType === 4 || changeType === 5,
			});
		},
	},
	{
		field: 'changePricePercent',
		headerName: '漲跌幅',
		minWidth: 100,
		flex: 1,
		valueGetter: params => {
			const { changePrice, close } = params.row;
			return Math.round((changePrice * 10000) / (close - changePrice)) / 100;
		},
		valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value.toFixed(2)} %`,
		cellClassName: (params: GridCellParams<number, QueryStockRank>) => {
			const { changeType } = params.row;
			return clsx('change-price-percent', {
				up: changeType === 1 || changeType === 2,
				unchanged: changeType === 3,
				down: changeType === 4 || changeType === 5,
			});
		},
	},
	{
		field: 'totalVolume',
		headerName: '成交量',
		minWidth: 80,
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<number>) =>
			params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
	},
];

type StockRankRow = {
	id: string;
} & QueryStockRank;

const convertStocksRnakToDataGridRows = (
	stocksRnak: FetchStocksRankQuery['stocksRank']
): StockRankRow[] => {
	return stocksRnak.map(stock => ({ id: stock.code, ...stock }));
};

type StocksRankTableProps = {
	stocksRnak: FetchStocksRankQuery['stocksRank'];
};

const StocksRankTable: FC<StocksRankTableProps> = ({ stocksRnak }) => {
	const navigate = useNavigate();
	const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
	const dataGridRows: StockRankRow[] = convertStocksRnakToDataGridRows(stocksRnak);

	const theme = useTheme();
	const { palette } = theme;

	useEffect(() => {
		if (selectionModel.length > 0 && selectionModel[0]) {
			navigate(`/stock/${selectionModel[0]}`);
		}
	}, [selectionModel]);

	return (
		<Box>
			<Box sx={{ height: 450, width: '100%' }}>
				<DataGrid
					sx={{
						'& .MuiDataGrid-row': {
							cursor: 'pointer',
						},
						'& .stock-name': {
							fontWeight: '500',
						},
						'& .close.limit-up > .MuiDataGrid-cellContent': {
							padding: '1px 5px',
							borderRadius: '3px',
							color: '#fff',
							backgroundColor: palette.red.main,
						},
						'& .close.up,> .MuiDataGrid-cellContent, & .change-price.up,> .MuiDataGrid-cellContent, & .change-price-percent.up,> .MuiDataGrid-cellContent':
							{
								color: palette.red.main,
							},
						'& .close.limit-down > .MuiDataGrid-cellContent': {
							padding: '1px 5px',
							borderRadius: '3px',
							color: '#fff',
							backgroundColor: palette.green.main,
						},
						'& .close.down > .MuiDataGrid-cellContent, & .change-price.down > .MuiDataGrid-cellContent, & .change-price-percent.down > .MuiDataGrid-cellContent ':
							{
								color: palette.green.main,
							},
					}}
					onSelectionModelChange={newSelectionModel => {
						setSelectionModel(newSelectionModel);
					}}
					selectionModel={selectionModel}
					columns={columns}
					rows={dataGridRows}
				/>
			</Box>
		</Box>
	);
};

export default StocksRankTable;
