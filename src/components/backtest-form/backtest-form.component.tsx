import { FormEventHandler, useState, useEffect } from 'react';
import { QUERY_BACKTEST } from '../../utils/graphql/query';
import { useLazyQuery } from '@apollo/client';
import { BacktestArgs } from '../../gql/graphql';
import { useAppDispatch } from '../../store/hooks';
import { addBacktest, setIsLoading, setError } from '../../store/backtests/bcaktests.slice';

import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { Box, Button } from '@mui/material';
import BacktestFormInput from '../backtest-form-input/backtest-form-input';
import DateRangePicker from '../date-range-picker/date-range-picker';
import BacktestStockPicker from '../backtest-stock-picker/backtest-stock-picker';

export const backtestFormFieldsName = {
	startDate: 'startDate',
	endDate: 'endDate',
	tradeStrategyId: 'tradeStrategyId',
	stockSelectionStrategyId: 'stockSelectionStrategyId',
	stockCode: 'stockCode',
};

type DefaulBacktestFormFields = {
	startDate: string | null;
	endDate: string | null;
	tradeStrategyId: number | null;
	stockSelectionStrategyId: number | null;
	stockCode: string | null;
};

const defaulBacktestFormFields: DefaulBacktestFormFields = {
	startDate: null,
	endDate: null,
	tradeStrategyId: null,
	stockSelectionStrategyId: null,
	stockCode: null,
};

const tradeStrategies = [
	{
		id: 1,
		type: 1,
		name: '自訂策略 1',
		description: '運用很多條件 ...',
	},
	{
		id: 2,
		type: 0,
		name: 'KD',
		description: 'KD技術指標',
	},
	{
		id: 3,
		type: 0,
		name: 'MACD',
		description: 'MACD技術指標',
	},
];

export type Strategy = {
	id: number;
	type: number;
	name: string;
	description: string;
};

const checkIsFormFieldsValid = (
	formFields: DefaulBacktestFormFields | BacktestArgs
): formFields is BacktestArgs => {
	if (!formFields.startDate) {
		alert('請選擇正確起始日期');
		return false;
	} else if (!formFields.endDate) {
		alert('請選擇正確結束日期');
		return false;
	} else if (!formFields.tradeStrategyId) {
		alert('請選擇策略');
		return false;
	} else if (!formFields.stockSelectionStrategyId && !formFields.stockCode) {
		alert('請選擇選股策略或單一個股');
		return false;
	}

	return true;
};

const BacktestForm = () => {
	const [queryBacktestResults, { loading, error, data }] = useLazyQuery(QUERY_BACKTEST);
	const [formfiledsValue, setFormFiledsVlaue] = useState(defaulBacktestFormFields);
	const dispatch = useAppDispatch();
	// console.log(loading, error, data);
	console.log(formfiledsValue);

	useEffect(() => {
		console.log('setIsLoading fired!');
		dispatch(setIsLoading(loading));
	}, [loading]);

	useEffect(() => {
		console.log('addBacktest fired!');
		if (!loading && data && data.backtest) dispatch(addBacktest(data.backtest));
	}, [loading]);

	useEffect(() => {
		console.log('setError fired!');
		dispatch(setError(error));
	}, [error]);

	const onSelectChange: SelectInputProps<number>['onChange'] = event => {
		const { name, value } = event.target;
		setFormFiledsVlaue(pre => {
			return { ...formfiledsValue, [name]: value };
		});
	};

	const setStartDate = (value: Date | null) => {
		const stringDate = value && value.toLocaleDateString('sv');
		setFormFiledsVlaue(pre => {
			return { ...pre, startDate: stringDate };
		});
	};

	const setEndDate = (value: Date | null) => {
		const stringDate = value && value.toLocaleDateString('sv');
		setFormFiledsVlaue(pre => {
			return { ...pre, endDate: stringDate };
		});
	};

	const setSelectedStockCode = (code: string | null) => {
		setFormFiledsVlaue(pre => {
			return {
				...formfiledsValue,
				stockSelectionStrategyId: null,
				stockCode: code,
			};
		});
	};

	const resetStcoks = () => {
		setFormFiledsVlaue(pre => {
			return { ...formfiledsValue, stockSelectionStrategyId: null, stockCode: null };
		});
	};

	const onFormSubmit: FormEventHandler<HTMLFormElement> = event => {
		console.log('form submit');
		event.preventDefault();
		if (checkIsFormFieldsValid(formfiledsValue)) {
			queryBacktestResults({
				variables: {
					backtestArgs: formfiledsValue,
				},
			});
		}
	};

	return (
		<Box
			component="form"
			onSubmit={onFormSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: '10px',
				maxWidth: 600,
				padding: '10px',
			}}
		>
			<DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} />
			<BacktestStockPicker
				onSelectChange={onSelectChange}
				setSelectedStockCode={setSelectedStockCode}
				resetStcoks={resetStcoks}
			/>
			<BacktestFormInput
				key="trade-strategy-select"
				stratgies={tradeStrategies}
				inputOptions={{
					id: 'trade-strategy-select',
					label: '交易策略',
					onChange: onSelectChange,
					name: backtestFormFieldsName.tradeStrategyId,
				}}
			/>
			<Button type="submit" variant="outlined">
				回測
			</Button>
		</Box>
	);
};

export default BacktestForm;
