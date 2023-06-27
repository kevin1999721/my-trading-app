import { FC, useState, useEffect, useMemo } from 'react';
import { MajorsTrend } from '../../gql/graphql';

import { Box } from '@mui/material';
import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridColumnGroupingModel,
	GridValueFormatterParams,
} from '@mui/x-data-grid';

type StockMajorTableProps = {
	majorsTrend: MajorsTrend;
};

const createColumns = (title: string) => {
	const columns: GridColDef[] = [
		{
			field: 'securitiesFirm',
			headerName: '券商',
			flex: 1,
			minWidth: 100,
			cellClassName: 'securities-firm',
		},
		{ field: 'buy', headerName: '買進', flex: 1, minWidth: 70 },
		{ field: 'sell', headerName: '賣出', flex: 1, minWidth: 70 },
		{ field: 'diff', headerName: title, flex: 1, minWidth: 70 },
		{
			field: 'percentOfVolume',
			headerName: '佔成交比重',
			flex: 1,
			minWidth: 100,
			valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value.toFixed(2)} %`,
		},
	];
	return columns;
};

const createColumnGroupingModel = (title: string) => {
	const columnGroupingModel: GridColumnGroupingModel = [
		{
			groupId: title,
			description: title,
			headerAlign: 'center',
			children: [
				{ field: 'id' },
				{ field: 'securitiesFirm' },
				{ field: 'buy' },
				{ field: 'sell' },
				{ field: 'diff' },
				{ field: 'percentOfVolume' },
			],
		},
	];

	return columnGroupingModel;
};

type TypeDataGrid = {
	columns: GridColDef[];
	rows: GridRowsProp;
	columnGroupingModel: GridColumnGroupingModel;
};

const StockMajorTable: FC<StockMajorTableProps> = ({ majorsTrend }) => {
	const dataGrids: TypeDataGrid[] = [
		{
			columns: createColumns('買超'),
			columnGroupingModel: createColumnGroupingModel('買超'),
			rows: majorsTrend.majorsBuyRank.map((major, index) => {
				return { id: index, ...major };
			}),
		},
		{
			columns: createColumns('賣超'),
			columnGroupingModel: createColumnGroupingModel('賣超'),
			rows: majorsTrend.majorsSellRank.map((major, index) => {
				return { id: index, ...major };
			}),
		},
	];

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap',
				gap: '10px',
			}}
		>
			{dataGrids.map((grid, index) => {
				return (
					<Box
						key={index}
						sx={{
							width: '450px',
							flexGrow: 1,
						}}
					>
						<DataGrid
							sx={{
								'& .securities-firm': {
									fontWeight: 500,
								},
							}}
							autoHeight
							experimentalFeatures={{ columnGrouping: true }}
							columns={grid.columns}
							rows={grid.rows}
							columnGroupingModel={grid.columnGroupingModel}
							// rowHeight={40}
							density="compact"
						/>
					</Box>
				);
			})}
		</Box>
	);
};

export default StockMajorTable;
