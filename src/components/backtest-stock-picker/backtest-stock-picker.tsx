import { useState, FC, ChangeEvent } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

import BacktestFormInput from '../backtest-form-input/backtest-form-input';
import StockSearhForm from '../stock-search-form/stock-searh-form.component';

const backtestFormFieldsName = {
	startDate: 'startDate',
	endDate: 'endDate',
	tradeStrategyId: 'tradeStrategyId',
	stockSelectionStrategyId: 'stockSelectionStrategyId',
	stocksCode: 'stocksCode',
};

const stockSelectionStrategies = [
	{
		id: 1,
		type: 1,
		name: '自訂選股策略 1',
		description: '自訂選股策略 1 ...',
	},
	{
		id: 2,
		type: 0,
		name: '半導體',
		description: '導體類股 ...',
	},
	{
		id: 3,
		type: 0,
		name: '生醫',
		description: '生醫類股 ...',
	},
];

type BacktestStockPicker = {
	onSelectChange?: SelectInputProps<number>['onChange'];
	setSelectedStockCode: (code: string | null) => void;
	resetStcoks: () => void;
};

const BacktestStockPicker: FC<BacktestStockPicker> = ({
	onSelectChange,
	setSelectedStockCode,
	resetStcoks,
}) => {
	const [radioValue, setRadioValue] = useState('0');
	const onRadioGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRadioValue(event.target.value);
		resetStcoks();
	};

	let renderStockPicker = null;
	if (radioValue === '0') {
		renderStockPicker = (
			<BacktestFormInput
				key="stock-selection-strategy-select"
				stratgies={stockSelectionStrategies}
				inputOptions={{
					id: 'stock-selection-strategy-select',
					label: '選股策略',
					onChange: onSelectChange,
					name: backtestFormFieldsName.stockSelectionStrategyId,
				}}
			/>
		);
	} else if (radioValue === '1') {
		renderStockPicker = <StockSearhForm setStockCodeState={setSelectedStockCode} />;
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<FormControl>
				{/* <FormLabel>Gender</FormLabel> */}
				<RadioGroup row defaultValue="0" onChange={onRadioGroupChange}>
					<FormControlLabel value="0" control={<Radio />} label="選股策略" />
					<FormControlLabel value="1" control={<Radio />} label="個股" />
				</RadioGroup>
			</FormControl>
			{renderStockPicker}
		</Box>
	);
};

export default BacktestStockPicker;
