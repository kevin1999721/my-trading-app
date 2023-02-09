import { useState, useEffect, ReactEventHandler, FC } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_STOCKS } from '../../utils/graphql/query';
import { Stock as StockType } from '../../gql/graphql';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

type StockSearhForm = {
	setStockCodeState?: (code: string | null) => void;
};

const StockSearhForm: FC<StockSearhForm> = ({ setStockCodeState }) => {
	const { loading, error, data } = useQuery(QUERY_STOCKS);
	const [isOpen, setIsOpen] = useState(false);

	const onInputChage = (e: React.SyntheticEvent, value: string, reason: string) => {
		if (data && data.stocks) {
			if (value.length > 0) setIsOpen(true);
			else setIsOpen(false);
		}
	};

	const onChange = (e: React.SyntheticEvent, stock: StockType | null, reason: string) => {
		console.log(stock);
		if (setStockCodeState) {
			if (stock) {
				setStockCodeState(stock.code);
			} else setStockCodeState(null);
		}
	};

	return (
		<>
			{data && data.stocks && (
				<Autocomplete
					autoComplete
					id="stock-search-input"
					options={data.stocks as StockType[]}
					open={isOpen}
					sx={{ width: 300 }}
					onInputChange={onInputChage}
					onChange={onChange}
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
		</>
	);
};

export default StockSearhForm;
