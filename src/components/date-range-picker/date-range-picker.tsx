import { useState, useEffect, FC } from 'react';
import { TextField, Box, Paper, TextFieldProps } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const defalutDateRangeField = {
	startDate: null,
	endDate: null,
};

type DateRangePickerProps = {
	setStartDate: (value: Date | null) => void;
	setEndDate: (value: Date | null) => void;
	textFieldProps?: TextFieldProps;
};
const DateRangePicker: FC<DateRangePickerProps> = ({
	setStartDate,
	setEndDate,
	textFieldProps,
}) => {
	const [dateRange, setDateRange] = useState(defalutDateRangeField);

	useEffect(() => {
		setStartDate(dateRange.startDate);
		setEndDate(dateRange.endDate);
	}, [dateRange]);

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				gap: '10px',
			}}
		>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label="開始"
					value={dateRange.startDate}
					onChange={newValue => {
						setDateRange(pre => {
							if (!pre.endDate || (newValue && pre.endDate < newValue))
								return { ...pre, startDate: newValue, endDate: newValue };
							else return { ...pre, startDate: newValue };
						});
					}}
					inputFormat="yyyy/MM/dd"
					renderInput={params => (
						<TextField
							{...textFieldProps}
							sx={{ flex: 1 }}
							{...params}
							inputProps={{ ...params.inputProps, placeholder: 'yyyy/mm/dd', readOnly: true }}
						/>
					)}
				/>
				<DatePicker
					label="結束"
					value={dateRange.endDate}
					onChange={newValue => {
						setDateRange(pre => {
							if (!pre.startDate || (newValue && pre.startDate > newValue))
								return { ...pre, startDate: newValue, endDate: newValue };
							else return { ...pre, endDate: newValue };
						});
					}}
					inputFormat="yyyy/MM/dd"
					renderInput={params => (
						<TextField
							{...textFieldProps}
							sx={{ flex: 1 }}
							{...params}
							inputProps={{ ...params.inputProps, placeholder: 'yyyy/mm/dd', readOnly: true }}
						/>
					)}
				/>
			</LocalizationProvider>
		</Box>
	);
};

export default DateRangePicker;
