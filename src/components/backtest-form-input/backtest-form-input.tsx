import { useState, FC } from 'react';
import {
	FormControl,
	Select,
	SelectProps,
	InputLabel,
	ListSubheader,
	MenuItem,
} from '@mui/material';
import { Strategy } from '../backtest-form/backtest-form.component';

type InputProps = {
	stratgies: Strategy[];
	inputOptions: SelectProps<any>;
};

const BacktestFormInput: FC<InputProps> = ({ stratgies, inputOptions }) => {
	return (
		<FormControl sx={{ m: 1, minWidth: 150 }}>
			<InputLabel htmlFor={inputOptions.id}>{inputOptions.label}</InputLabel>
			<Select {...inputOptions} defaultValue="">
				{stratgies.map(strategy => {
					return (
						<MenuItem key={strategy.id} value={strategy.id}>
							{strategy.name}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

export default BacktestFormInput;
