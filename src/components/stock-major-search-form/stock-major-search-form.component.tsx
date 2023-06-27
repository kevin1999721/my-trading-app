import { FC, useState } from 'react';
import { MajorsTrendArgs, MajorsTrendArgsType } from '../../gql/graphql';

import {
	Box,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material';
import DateRangePicker from '../date-range-picker/date-range-picker';

type StockMajorSearchFormProps = {
	setMajorsTrendArgs: React.Dispatch<React.SetStateAction<MajorsTrendArgs>>;
};

const selectOptions = [
	{
		value: '1',
		text: '近1日',
	},
	{
		value: '5',
		text: '近5日',
	},
	{
		value: '10',
		text: '近10日',
	},
];

const StockMajorSearchForm: FC<StockMajorSearchFormProps> = ({ setMajorsTrendArgs }) => {
	const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
	const [selectValue, setSelectValue] = useState(selectOptions[0].value);

	const setStartDate = (value: Date | null) => {
		const stringDate = value && (value.toLocaleDateString('sv') as string);
		setDateRange(pre => {
			return { ...pre, startDate: stringDate || '' };
		});
	};

	const setEndDate = (value: Date | null) => {
		const stringDate = value && value.toLocaleDateString('sv');
		setDateRange(pre => {
			return { ...pre, endDate: stringDate || '' };
		});
	};

	const onButtonClick = () => {
		if (!dateRange.startDate) {
			alert('請選擇正確起始日期');
			return false;
		} else if (!dateRange.endDate) {
			alert('請選擇正確結束日期');
			return false;
		}

		setMajorsTrendArgs(pre => {
			return {
				type: MajorsTrendArgsType.DateRange,
				code: pre.code,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
			};
		});
	};

	const onSelectChange = (event: SelectChangeEvent) => {
		setSelectValue(event.target.value);
		setMajorsTrendArgs(pre => {
			return {
				type: MajorsTrendArgsType.TradeDays,
				code: pre.code,
				tradeDays: Number(event.target.value),
			};
		});
	};

	return (
		<Box
			sx={{
				display: 'flex',
				gap: '10px',
				justifyContent: 'space-between',
				alignItems: 'center',
				flexWrap: 'wrap',
			}}
		>
			<Box>
				<FormControl sx={{ minWidth: 120 }} size="small">
					<Select value={selectValue} onChange={onSelectChange}>
						{selectOptions.map(option => {
							return (
								<MenuItem key={option.value} value={option.value}>
									{option.text}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: '10px',
					maxWidth: '400px',
				}}
			>
				<DateRangePicker
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					textFieldProps={{ size: 'small' }}
				/>
				<Button variant="outlined" onClick={onButtonClick}>
					查詢
				</Button>
			</Box>
		</Box>
	);
};

export default StockMajorSearchForm;
