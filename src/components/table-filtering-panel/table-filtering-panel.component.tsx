import { useState, useEffect, useRef, FC } from 'react';
import { useTheme } from '@mui/material';
import {
	Operator,
	FieldType,
	FilteringSetting,
	FilteringCondition,
} from '../../utils/data-grid/data-grid.utils';
import { sxDashboard } from '../../utils/theme/theme.util';
import { localStringOptions } from '../../utils/date/date.utils';

import { Box, Button, IconButton, Typography } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import FilterListIcon from '@mui/icons-material/FilterList';

import TableFilteringItem from '../table-filtering-item/table-filtering-item.component';

const isConditionMatch = (
	fieldValue: any,
	conditionOperator: Operator,
	conditionValue: any,
	fieldType: FieldType
) => {
	if (fieldType === 'string') {
		switch (conditionOperator) {
			case 'contains':
				return String(fieldValue).includes(conditionValue);
			case 'notContains':
				return !String(fieldValue).includes(conditionValue);
		}
	} else if (fieldType === 'date' || fieldType === 'dateTime') {
		const covertedFieldValue = new Date(fieldValue);

		switch (conditionOperator) {
			case '>=':
				return covertedFieldValue >= conditionValue;
			case '<=':
				return covertedFieldValue <= conditionValue;
			case '=':
				return !(covertedFieldValue > conditionValue) && !(covertedFieldValue < conditionValue);
			case 'contains':
				return covertedFieldValue
					.toLocaleString('zh-TW', localStringOptions)
					.includes(conditionValue);
			case 'notContains':
				return !covertedFieldValue
					.toLocaleString('zh-TW', localStringOptions)
					.includes(conditionValue);
		}
	} else if (fieldType === 'number') {
		if (conditionValue === '' || Number.isNaN(Number(conditionValue))) return false;
		switch (conditionOperator) {
			case '>=':
				return fieldValue >= conditionValue;
			case '<=':
				return fieldValue <= conditionValue;
			case '=':
				return fieldValue === conditionValue;
		}
	}
};

type TableFilteringPanelProps = {
	originalRows: any[];
	filteringSettings: FilteringSetting[];
	setFilteringRows: React.Dispatch<React.SetStateAction<any[]>>;
};

const TableFilteringPanel: FC<TableFilteringPanelProps> = ({
	originalRows,
	filteringSettings,
	setFilteringRows,
}) => {
	const filteringPanelRef = useRef<HTMLDivElement>();
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [filteringConditions, setFilteringConditions] = useState<FilteringCondition[]>([]);
	const [filteringItemKey, setFilteringItemKey] = useState<number>(0);
	const [filteringItems, setFilteringItems] = useState<number[]>([]);
	const { palette } = useTheme();

	const onCloseButtonClick = () => {
		setIsPanelOpen(false);
	};

	const onFilteringButtonClick = () => {
		setIsPanelOpen(current => !current);
	};

	const onButtonClick = () => {
		setFilteringItemKey(current => current + 1);
	};

	useEffect(() => {
		setFilteringItems(current => {
			if (current.findIndex(key => key === filteringItemKey) > -1) return current;
			else return [...current, filteringItemKey];
		});
	}, [filteringItemKey]);

	useEffect(() => {
		setFilteringItems([]);
		setFilteringConditions([]);
		setIsPanelOpen(false);
	}, [originalRows]);

	useEffect(() => {
		const filteringRows = originalRows.filter(row => {
			return (
				filteringConditions
					.map(condition => {
						const filteringSetting = filteringSettings.find(
							setting => setting.field === condition.field
						);

						return filteringSetting
							? isConditionMatch(
									filteringSetting?.valueGetter
										? filteringSetting.valueGetter(row[filteringSetting.field])
										: row[filteringSetting.field],
									condition.operator,
									condition.value,
									filteringSetting.type
							  )
							: false;
					})
					.indexOf(false) === -1
			);
		});

		setFilteringRows(filteringRows);
	}, [filteringConditions]);

	return (
		<GridToolbarContainer sx={{ padding: '0 0px', position: 'relative' }}>
			<IconButton
				sx={{
					position: 'relative',
				}}
				color="primary"
				onClick={onFilteringButtonClick}
			>
				<FilterListIcon />
				<Typography variant="button">篩選</Typography>
				{filteringConditions.length > 0 && (
					<Typography
						sx={{
							position: 'absolute',
							top: '1px',
							left: '1px',
							backgroundColor: palette.primary.main,
							width: '20px',
							height: '20px',
							lineHeight: '20px',
							borderRadius: '50%',
							color: palette.text.primary,
							fontSize: '12px',
						}}
					>
						{filteringConditions.length}
					</Typography>
				)}
			</IconButton>
			<Box
				sx={{
					...sxDashboard,
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
					width: 'calc(100% - 20px)',
					maxWidth: '450px',
					borderRadius: '5px',
					position: 'absolute',
					left: '10px',
					top: '100%',
					visibility: isPanelOpen ? 'visible' : 'hidden',
					zIndex: '10',
				}}
				ref={filteringPanelRef}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}
				>
					{filteringItems.map(key => {
						return (
							<TableFilteringItem
								key={key}
								itemKey={key}
								filteringSettings={filteringSettings}
								setFilteringConditions={setFilteringConditions}
								setFilteringItems={setFilteringItems}
							/>
						);
					})}
				</Box>
				<Box
					sx={{
						alignSelf: 'flex-end',
					}}
				>
					<Button onClick={onButtonClick}>新增條件</Button>
					<Button onClick={onCloseButtonClick}>關閉</Button>
				</Box>
			</Box>
		</GridToolbarContainer>
	);
};

export default TableFilteringPanel;
