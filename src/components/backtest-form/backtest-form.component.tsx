import { useState, useEffect, useRef, FormEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLazyQuery } from '@apollo/client';
import { useMediaQuery } from '@mui/material';
import { QUERY_BACKTEST } from '../../utils/graphql/query.util';
import { BacktestArgs, Backtest } from '../../gql/graphql';
import { addBacktest, setIsLoading, setError } from '../../store/backtests/bcaktests.slice';
import { sxDashboard } from '../../utils/theme/theme.util';
import {
	thunkGetStockSelectionStrategiesDocs,
	thunkGetTradeStrategiesDocs,
} from '../../store/backtests/bcaktests.slice';
import { selectTradeStrategies } from '../../store/backtests/backtests.select';

import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { Box, Button, Divider, CircularProgress, Snackbar, Alert } from '@mui/material';

import BacktestFormInput from '../backtest-form-input/backtest-form-input';
import DateRangePicker from '../date-range-picker/date-range-picker';
import BacktestStockPicker from '../backtest-stock-picker/backtest-stock-picker';
import BacktestStrategyInfo from '../backtest-strategy-info/backtest-strategy-info.component';

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
	tradeStrategyId: number | string | null;
	stockSelectionStrategyId: number | string | null;
	stockCode: string | null;
};

const defaulBacktestFormFields: DefaulBacktestFormFields = {
	startDate: null,
	endDate: null,
	tradeStrategyId: null,
	stockSelectionStrategyId: null,
	stockCode: null,
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
	const dispatch = useAppDispatch();
	const isMediaQueryMatch = useMediaQuery('(max-width : 800px)');
	const tradeStrategies = useAppSelector(selectTradeStrategies);
	const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
	const [formfiledsValue, setFormFiledsVlaue] = useState(defaulBacktestFormFields);
	const [queryBacktestResults, { loading, error, data }] = useLazyQuery(QUERY_BACKTEST);
	const preBacktestResults = useRef<Backtest | null>(null);

	const alertCloseHandler = () => {
		setIsAlertOpen(false);
	};

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
		event.preventDefault();
		if (!loading && checkIsFormFieldsValid(formfiledsValue)) {
			queryBacktestResults({
				variables: {
					backtestArgs: formfiledsValue,
				},
			});
		}
	};

	useEffect(() => {
		dispatch(setIsLoading(loading));
	}, [loading]);

	useEffect(() => {
		if (!loading && data?.backtest && preBacktestResults.current !== data.backtest) {
			setIsAlertOpen(true);
			dispatch(addBacktest(data.backtest));
			preBacktestResults.current = data.backtest;
		}
	}, [data?.backtest]);

	useEffect(() => {
		dispatch(setError(error));
	}, [error]);

	useEffect(() => {
		dispatch(thunkGetTradeStrategiesDocs());
		dispatch(thunkGetStockSelectionStrategiesDocs());
	}, []);

	return (
		<Box
			sx={{
				...sxDashboard,
				display: 'flex',
				gap: '25px',
				flexDirection: isMediaQueryMatch ? 'column' : 'row',
			}}
		>
			<Box
				component="form"
				onSubmit={onFormSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'stretch',
					gap: '20px',
					maxWidth: 500,
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
						value: formfiledsValue.tradeStrategyId || '',
					}}
				/>
				<Button type="submit" variant="outlined" disabled={loading}>
					{loading ? <CircularProgress style={{ width: '20px', height: '20px' }} /> : '回測'}
				</Button>
			</Box>
			<Divider orientation={isMediaQueryMatch ? 'horizontal' : 'vertical'} flexItem />
			<BacktestStrategyInfo
				tradeStrategyId={formfiledsValue.tradeStrategyId}
				stockSelectionStrategyId={formfiledsValue.stockSelectionStrategyId}
			/>
			<Snackbar
				open={isAlertOpen}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={alertCloseHandler}
			>
				<Alert onClose={alertCloseHandler} severity="success" sx={{ width: '100%', boxShadow: 3 }}>
					回測完成，請至回測紀錄查看 !
				</Alert>
			</Snackbar>
			<Snackbar open={loading} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity="info" sx={{ width: '100%', boxShadow: 3 }}>
					回測進行中，請勿關閉頁面或跳至其他分頁 !
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default BacktestForm;
