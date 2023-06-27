import { useState, FC, ChangeEvent } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { useAppSelector } from '../../store/hooks';
import { selectStockSelectionStrategies } from '../../store/backtests/backtests.select';

import BacktestFormInput from '../backtest-form-input/backtest-form-input';
import StockSearhForm from '../stock-search-form/stock-searh-form.component';

const backtestFormFieldsName = {
	startDate: 'startDate',
	endDate: 'endDate',
	tradeStrategyId: 'tradeStrategyId',
	stockSelectionStrategyId: 'stockSelectionStrategyId',
	stocksCode: 'stocksCode',
};

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
	const stockSelectionStrategies = useAppSelector(selectStockSelectionStrategies);
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
				flexDirection: 'column',
			}}
		>
			<FormControl>
				<RadioGroup
					sx={{
						marginBottom: '10px',
						'& .MuiFormControlLabel-labelPlacementEnd': {
							marginLeft: 'unset',
						},
						'& .MuiFormControlLabel-labelPlacementEnd .MuiRadio-root': {
							padding: 'unset',
						},
					}}
					row
					defaultValue="0"
					onChange={onRadioGroupChange}
				>
					<FormControlLabel value="0" control={<Radio />} label="選股策略" />
					<FormControlLabel value="1" control={<Radio />} label="個股" />
				</RadioGroup>
			</FormControl>
			{renderStockPicker}
		</Box>
	);
};

export default BacktestStockPicker;
