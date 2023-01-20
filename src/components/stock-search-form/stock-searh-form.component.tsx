import { useState, useEffect, ReactEventHandler } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_STOCKS } from '../../gql/query';
import { Stock as StockType } from '../../gql/graphql';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const StockSearhForm = () => {
	const { loading, error, data } = useQuery(QUERY_STOCKS);
	const [isOpen, setIsOpen] = useState(false);

	const onInputChage = (e: React.SyntheticEvent, value: string, reason: string) => {
		if (data && data.stocks) {
			if (value.length > 0) setIsOpen(true);
			else setIsOpen(false);
		}
	};

	return (
		<div>
			{data && data.stocks && (
				<Autocomplete
					autoComplete
					id="stock-search-input"
					options={data.stocks}
					open={isOpen}
					sx={{ width: 300 }}
					onInputChange={onInputChage}
					onClose={() => setIsOpen(false)}
					getOptionLabel={(option: StockType) => {
						return option.code;
					}}
					renderInput={params => {
						return <TextField {...params} label="請輸入代號或股名" />;
					}}
					renderOption={(props, option) => {
						return (
							<Box component={'li'} {...props}>
								{option.code + ' ' + option.name}
							</Box>
						);
					}}
					filterOptions={(option, state) => {
						if (state.inputValue) {
							return option.filter(stock => {
								return (
									stock.code.includes(state.inputValue) || stock.name.includes(state.inputValue)
								);
							});
						} else {
							return [];
						}
					}}
				/>
			)}
		</div>
	);
};

export default StockSearhForm;
