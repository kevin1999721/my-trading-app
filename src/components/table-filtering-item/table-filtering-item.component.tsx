import { useState, useEffect, FC } from 'react';
import {
	Operator,
	FieldType,
	FilteringSetting,
	FilteringCondition,
	fieldTypeOperators,
} from '../../utils/data-grid/data-grid.utils';

import {
	Box,
	TextField,
	FormControl,
	Select,
	MenuItem,
	SelectChangeEvent,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { LocalizationProvider, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const switchOperatorText = (operator: Operator) => {
	switch (operator) {
		case 'contains':
			return '包含';
		case 'notContains':
			return '不包含';
		default:
			return operator;
	}
};

type TableFilteringItemProps = {
	filteringSettings: FilteringSetting[];
	itemKey: number;
	setFilteringConditions: React.Dispatch<React.SetStateAction<FilteringCondition[]>>;
	setFilteringItems: React.Dispatch<React.SetStateAction<number[]>>;
};

const TableFilteringItem: FC<TableFilteringItemProps> = ({
	filteringSettings,
	itemKey,
	setFilteringConditions,
	setFilteringItems,
}) => {
	const [selectField, setSelectField] = useState<string>('');
	const [selectFieldType, setSelectFieldType] = useState<FieldType | ''>('');
	const [selectOperator, setSelectOperator] = useState<Operator | ''>('');
	const [compareValue, setCompareValue] = useState<string | number | null | ''>('');

	const onSelectFieldChange = (event: SelectChangeEvent) => {
		const value = event.target.value as string;
		const filteringSetting = filteringSettings.find(
			filteringSetting => filteringSetting.field === value
		);

		setSelectField(value);
		setSelectFieldType(filteringSetting ? filteringSetting.type : '');
		setCompareValue(null);
		setSelectOperator('');
	};

	const onSelectOperatorChange = (event: SelectChangeEvent) => {
		setSelectOperator(event.target.value as Operator | '');

		if (
			compareValue &&
			(selectFieldType === 'date' || selectFieldType === 'dateTime') &&
			(selectOperator === 'contains' || selectOperator === 'notContains') &&
			!(event.target.value === 'contains' || event.target.value === 'notContains')
		)
			setCompareValue(null);
	};

	const onTextfieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompareValue(event.target.value);
	};

	const onCloseButtonClick = () => {
		setFilteringConditions(current => {
			const conditionIndex = current.findIndex(condition => condition.key === itemKey);
			if (conditionIndex > -1) {
				return [...current.slice(0, conditionIndex), ...current.slice(conditionIndex + 1)];
			} else {
				return current;
			}
		});

		setFilteringItems(current => {
			const conditionIndex = current.findIndex(key => key === itemKey);
			if (conditionIndex > -1) {
				return [...current.slice(0, conditionIndex), ...current.slice(conditionIndex + 1)];
			} else {
				return current;
			}
		});
	};

	useEffect(() => {
		if (selectField && selectOperator && compareValue) {
			setFilteringConditions(current => {
				const newCondition = {
					key: itemKey,
					field: selectField,
					operator: selectOperator,
					value: compareValue,
				};

				const conditionIndex = current.findIndex(condition => condition.key === itemKey);
				if (conditionIndex > -1) {
					return [
						...current.slice(0, conditionIndex),
						newCondition,
						...current.slice(conditionIndex + 1),
					];
				} else {
					return [...current, newCondition];
				}
			});
		} else {
			setFilteringConditions(current => {
				const conditionIndex = current.findIndex(condition => condition.key === itemKey);
				if (conditionIndex > -1) {
					return [...current.slice(0, conditionIndex), ...current.slice(conditionIndex + 1)];
				} else {
					return current;
				}
			});
		}
	}, [selectField, selectOperator, compareValue]);

	return (
		<Box
			sx={{
				display: 'flex',
				gap: '10px',
				alignItems: 'center',
			}}
		>
			<IconButton sx={{ padding: '0px' }} onClick={onCloseButtonClick}>
				<CloseIcon />
			</IconButton>
			<FormControl
				sx={{
					maxWidth: '100px',
					flex: 1,
				}}
				variant="standard"
			>
				<Select value={selectField} onChange={onSelectFieldChange} size="small">
					<MenuItem value="">無</MenuItem>
					{filteringSettings.map(filteringSetting => {
						const { field, fieldName, type } = filteringSetting;
						return (
							<MenuItem key={field as string} value={field as string}>
								{fieldName}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<FormControl
				variant="standard"
				sx={{
					maxWidth: '80px',
					flex: 1,
				}}
			>
				<Select value={selectOperator} onChange={onSelectOperatorChange} size="small">
					<MenuItem value="">無</MenuItem>
					{selectFieldType &&
						fieldTypeOperators[selectFieldType].map(operators => {
							return (
								<MenuItem key={operators} value={operators}>
									{switchOperatorText(operators)}
								</MenuItem>
							);
						})}
				</Select>
			</FormControl>
			{(selectFieldType === 'date' || selectFieldType === 'dateTime') &&
			!(selectOperator === 'contains' || selectOperator === 'notContains') ? (
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					{selectFieldType === 'date' ? (
						<DatePicker
							value={compareValue}
							onChange={newValue => {
								setCompareValue(newValue);
							}}
							inputFormat="yyyy/MM/dd"
							renderInput={params => (
								<TextField
									size="small"
									variant="standard"
									{...params}
									inputProps={{
										...params.inputProps,
										placeholder: '',
										readOnly: true,
									}}
									sx={{
										maxWidth: '170px',
										flex: 1,
									}}
								/>
							)}
						/>
					) : (
						<DateTimePicker
							value={compareValue}
							onChange={newValue => {
								setCompareValue(newValue);
							}}
							inputFormat="yyyy/MM/dd HH:mm"
							renderInput={params => (
								<TextField
									size="small"
									variant="standard"
									{...params}
									inputProps={{
										...params.inputProps,
										placeholder: '',
										readOnly: true,
									}}
									sx={{
										maxWidth: '170px',
										flex: 1,
									}}
								/>
							)}
						/>
					)}
				</LocalizationProvider>
			) : (
				<TextField
					sx={{
						maxWidth: '170px',
						flex: 1,
					}}
					value={compareValue || ''}
					onChange={onTextfieldChange}
					disabled={selectField ? false : true}
					size="small"
					variant="standard"
				/>
			)}
		</Box>
	);
};

export default TableFilteringItem;
