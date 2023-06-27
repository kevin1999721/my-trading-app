import { useState, useEffect, FC } from 'react';
import {
	Box,
	FormControl,
	Select,
	SelectProps,
	InputLabel,
	ListSubheader,
	MenuItem,
} from '@mui/material';
import { Strategy } from '../../utils/firebase/firebase.utils';

type GroupingStrategies = {
	[x: string]: Strategy[];
};

type InputProps = {
	stratgies: Strategy[];
	inputOptions: SelectProps<any>;
};

const convertStrategyTypeText = (text: string) => {
	switch (text) {
		case 'index':
			return '指數成分股';
		case 'industry':
			return '產業別';
		case 'technical':
			return '技術指標';
		case 'custom':
			return '自訂';
		default:
			return text;
	}
};

const BacktestFormInput: FC<InputProps> = ({ stratgies, inputOptions }) => {
	const [groupingStrategies, setGroupingStrategies] = useState<GroupingStrategies | null>(null);

	useEffect(() => {
		const groupingStrategies = stratgies.reduce<GroupingStrategies>((pre, cur) => {
			if (cur.type in pre) {
				return { ...pre, [cur.type]: [...pre[cur.type], cur] };
			} else {
				return { ...pre, [cur.type]: [cur] };
			}
		}, {});

		setGroupingStrategies(groupingStrategies);
	}, [stratgies]);

	return (
		<FormControl sx={{ minWidth: 150, maxWidth: 200 }}>
			<InputLabel htmlFor={inputOptions.id}>{inputOptions.label}</InputLabel>
			{groupingStrategies && (
				<Select {...inputOptions} defaultValue="">
					{Object.keys(groupingStrategies).map(key => {
						return [
							<ListSubheader sx={{ backgroundColor: 'inherit' }}>
								{convertStrategyTypeText(key)}
							</ListSubheader>,
							...groupingStrategies[key].map(strategy => {
								return (
									<MenuItem key={strategy.id} value={strategy.id}>
										{strategy.name}
									</MenuItem>
								);
							}),
						];
					})}
				</Select>
			)}
		</FormControl>
	);
};

export default BacktestFormInput;
