import { useState, useEffect, useMemo, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
	selectBacktestsInformation,
	SelectBacktestInformation,
} from '../../store/backtests/backtests.select';
import { deleteBacktest } from '../../store/backtests/bcaktests.slice';
import { localStringOptions, localDateStringOptions } from '../../utils/date/date.utils';
import { sxDashboard } from '../../utils/theme/theme.util';
import { FilteringSetting } from '../../utils/data-grid/data-grid.utils';
import { DataGrid, GridColumns, GridActionsCellItem } from '@mui/x-data-grid';
import { GridValueGetterParams } from '@mui/x-data-grid/models';

import { Box, Dialog, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import BacktestTableTitle from '../backtest-table-title/backtest-table-title.component';
import TableFilteringPanel from '../table-filtering-panel/table-filtering-panel.component';

const filteringSettings: FilteringSetting<SelectBacktestInformation>[] = [
	{
		field: 'rangeStartDate',
		fieldName: '開始區間',
		type: 'date',
	},
	{
		field: 'rangeEndDate',
		fieldName: '結束區間',
		type: 'date',
	},
	{
		field: 'stockCode',
		fieldName: '個股',
		type: 'string',
	},
	{
		field: 'stockSelectionStrategyName',
		fieldName: '選股策略',
		type: 'string',
	},
	{
		field: 'tradeStrategyName',
		fieldName: '交易策略',
		type: 'string',
	},
	{
		field: 'startDatetime',
		fieldName: '回測開始',
		type: 'dateTime',
	},
	{
		field: 'endDatetime',
		fieldName: '回測結束',
		type: 'dateTime',
	},
];

type BacktestHistoriesTableProps = {
	setSelectedBacktestId: (value: string | number | null) => void;
};

const BacktestHistoriesTable: FC<BacktestHistoriesTableProps> = ({ setSelectedBacktestId }) => {
	const dispatch = useAppDispatch();
	const backtestsInformation = useAppSelector(selectBacktestsInformation);
	const [filteringRows, setFilteringRows] =
		useState<SelectBacktestInformation[]>(backtestsInformation);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [rowToDelete, setRowToDelete] = useState<SelectBacktestInformation | null>(null);

	const onDialogConfirmButtonClick = () => {
		if (rowToDelete) {
			dispatch(deleteBacktest(rowToDelete.id));
			setRowToDelete(null);
		}
		setIsDialogOpen(false);
	};

	const onDialogCancelButtonClick = () => {
		setIsDialogOpen(false);
	};

	const onDeletButtonClick = (row: SelectBacktestInformation) => {
		return () => {
			setRowToDelete(row);
			setIsDialogOpen(true);
		};
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
	};

	const backtestHistoryGridColumns = useMemo<GridColumns<SelectBacktestInformation>>(
		() => [
			{
				field: 'rangeStartDate',
				headerName: '開始區間',
				width: 100,
				valueGetter: ({ value }: GridValueGetterParams<string>) =>
					value && new Date(value).toLocaleDateString('zh-TW', localDateStringOptions),
			},
			{
				field: 'rangeEndDate',
				headerName: '結束區間',
				width: 100,
				valueGetter: ({ value }: GridValueGetterParams<string>) =>
					value && new Date(value).toLocaleDateString('zh-TW', localDateStringOptions),
			},
			{
				field: 'stockCodeOrSelectionStrategyId',
				headerName: '個股/選股策略',
				width: 110,
				valueGetter: params => params.row.stockCode || params.row.stockSelectionStrategyName,
			},
			{ field: 'tradeStrategyName', headerName: '交易策略' },
			{
				field: 'startDatetime',
				headerName: '回測開始',
				type: 'dateTime',
				width: 160,
				valueGetter: ({ value }) =>
					value && new Date(value).toLocaleString('zh-TW', localStringOptions),
			},
			{
				field: 'endDatetime',
				headerName: '回測結束',
				type: 'dateTime',
				width: 160,
				valueGetter: ({ value }) =>
					value && new Date(value).toLocaleString('zh-TW', localStringOptions),
			},
			{
				field: 'actions',
				type: 'actions',
				width: 50,
				getActions: params => [
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="delete"
						onClick={onDeletButtonClick(params.row)}
					/>,
				],
			},
		],
		[]
	);

	return (
		<Box sx={{ width: '100%' }}>
			<BacktestTableTitle text="回測紀錄" />
			<Box sx={{ ...sxDashboard }}>
				<DataGrid
					disableColumnFilter
					sx={{ height: 350 }}
					columns={backtestHistoryGridColumns}
					rows={filteringRows}
					onSelectionModelChange={newSelectionModel => {
						if (newSelectionModel.length > 0) setSelectedBacktestId(newSelectionModel[0]);
						else setSelectedBacktestId(null);
					}}
					components={{
						Toolbar: TableFilteringPanel,
					}}
					componentsProps={{
						toolbar: {
							originalRows: backtestsInformation,
							filteringSettings: filteringSettings,
							setFilteringRows: setFilteringRows,
						},
					}}
				/>
			</Box>
			<Dialog open={isDialogOpen} onClose={handleDialogClose}>
				<Box sx={{ padding: '20px', minWidth: '300px' }}>
					<Box>
						<Box
							sx={{
								marginBottom: '20px',
								letterSpacing: '1px',
							}}
						>
							<Typography variant="h6" fontStyle={'italic'} fontWeight={600}>
								是否刪除此回測紀錄 ?
							</Typography>
						</Box>
						{rowToDelete && (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '20px',
									marginBottom: '20px',
									letterSpacing: '1px',
									'& > div': {
										display: 'flex',
										gap: '5px',
										'& .MuiTypography-body1:first-of-type': {
											fontWeight: '600',
										},
									},
								}}
							>
								<Box>
									<Typography>開始區間 :</Typography>
									<Typography>
										{new Date(rowToDelete.rangeStartDate).toLocaleDateString(
											'zh-TW',
											localDateStringOptions
										)}
									</Typography>
								</Box>
								<Box>
									<Typography>結束區間 :</Typography>
									<Typography>
										{new Date(rowToDelete.rangeStartDate).toLocaleDateString(
											'zh-TW',
											localDateStringOptions
										)}
									</Typography>
								</Box>
								<Box>
									<Typography>個股/選股策略 :</Typography>
									<Typography>
										{rowToDelete.stockCode || rowToDelete.stockSelectionStrategyName}
									</Typography>
								</Box>
								<Box>
									<Typography>交易策略 :</Typography>
									<Typography>{rowToDelete.tradeStrategyName}</Typography>
								</Box>
							</Box>
						)}
					</Box>
					<Box sx={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
						<Button onClick={onDialogConfirmButtonClick}>刪除</Button>
						<Button onClick={onDialogCancelButtonClick}>取消</Button>
					</Box>
				</Box>
			</Dialog>
		</Box>
	);
};

export default BacktestHistoriesTable;
