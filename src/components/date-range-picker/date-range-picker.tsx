import { useState, useEffect, FC } from 'react';
import { TextField, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const defalutDateRangeField = {
	startDate: null,
	endDate: null,
};

type DateRangePickerProps = {
	setStartDate: (value: Date | null) => void;
	setEndDate: (value: Date | null) => void;
};

const DateRangePicker: FC<DateRangePickerProps> = ({ setStartDate, setEndDate }) => {
	const [dateRange, setDateRange] = useState(defalutDateRangeField);

	useEffect(() => {
		setStartDate(dateRange.startDate);
		setEndDate(dateRange.endDate);
	}, [dateRange]);

	// if (dateRange.startDate)
	// 	console.log(dateRange.startDate.toISOString())

	return (
		<div>
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
					renderInput={params => <TextField {...params} />}
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
					renderInput={params => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</div>
	);
};

export default DateRangePicker;
