import { FC } from 'react';
import { Shareholders } from '../../gql/graphql';

import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
	{ field: 'date', headerName: '日期', minWidth: 100, flex: 1, cellClassName: 'date' },
	{ field: 'totalShareholders', headerName: '總股東人數', minWidth: 90, flex: 1 },
	{
		field: 'moreThanFourHundred',
		headerName: '>400張人數',
		minWidth: 100,
		flex: 1,
	},
	{
		field: 'moreThanFourHundredPercent',
		headerName: '>400張持有比',
		minWidth: 110,
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value.toFixed(2)} %`,
	},
	{ field: 'moreThanOenThousand', headerName: '>1000張人數', minWidth: 100, flex: 1 },
	{
		field: 'moreThanOneThousandPercent',
		headerName: '>1000張持有比',
		minWidth: 115,
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value.toFixed(2)} %`,
	},
	{
		field: 'close',
		headerName: '收盤價',
		minWidth: 70,
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<number>) => `${params.value.toFixed(2)}`,
	},
];

type StockShareholdersTableProps = {
	shareholdersList: Shareholders[];
};

const StockShareHoldersTable: FC<StockShareholdersTableProps> = ({ shareholdersList }) => {
	const rows: Shareholders[] = shareholdersList.map(shareholders => {
		return { id: shareholders.date, ...shareholders };
	});

	return (
		<Box sx={{ flexGrow: 1, height: '800px' }}>
			<DataGrid
				sx={{
					'& .date': {
						fontWeight: 500,
					},
				}}
				columns={columns}
				rows={rows}
				density="compact"
			/>
		</Box>
	);
};

export default StockShareHoldersTable;
