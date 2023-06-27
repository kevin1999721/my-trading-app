import { useState, useEffect, ReactEventHandler, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_STOCKS } from '../../utils/graphql/query.util';
import { Stock as StockType } from '../../gql/graphql';

import { Box, Autocomplete, TextField, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type StockSearhForm = {
	setStockCodeState?: (code: string | null) => void;
	searchType?: 'setState' | 'navigateToStock';
	inputType?: 'customBaseInput';
};

const StockSearhForm: FC<StockSearhForm> = ({
	setStockCodeState,
	searchType = 'setState',
	inputType,
}) => {
	const { loading, error, data } = useQuery(QUERY_STOCKS);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const onInputChage = (e: React.SyntheticEvent, value: string, reason: string) => {
		if (data && data.stocks) {
			if (value.length > 0) setIsOpen(true);
			else setIsOpen(false);
		}
	};

	const onChange = (e: React.SyntheticEvent, stock: StockType | null, reason: string) => {
		if (searchType === 'navigateToStock' && stock) {
			navigate(`/stock/${stock.code}`);
		}

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
					sx={{ width: 200, flexGrow: '1' }}
					onInputChange={onInputChage}
					onChange={onChange}
					onClose={() => setIsOpen(false)}
					getOptionLabel={(option: StockType) => {
						return option.code;
					}}
					renderInput={params => {
						if (inputType === 'customBaseInput') {
							const { InputLabelProps, InputProps, ...otherProps } = params;

							return (
								<Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '300px' }}>
									<InputBase
										{...{ ...InputProps, endAdornment: undefined }}
										{...otherProps}
										placeholder="請輸入代號或股名"
									></InputBase>
									<SearchIcon sx={{ margin: '0 10px 0 0' }}></SearchIcon>
								</Box>
							);
						} else {
							return <TextField {...params} label="請輸入代號或股名" />;
						}
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
