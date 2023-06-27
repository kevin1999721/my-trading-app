import { useState, useEffect, useCallback } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectStockCodes } from '../../store/collections/collections.select';
import { selectIsSidebarOpen } from '../../store/sidebar/sidebar.select';
import { QUERY_STOCKS_REALTIME } from '../../utils/graphql/query.util';
import { StockRealtime } from '../../gql/graphql';
import { useQueryRefetch } from '../../hooks/useQueryRefetch.hook';

import { Box, List, ListItem, ListItemText, ListItemButton, ListSubheader } from '@mui/material';
import Progress from '../progress/progress.component';

const CollectionsList = () => {
	const navigate = useNavigate();
	const [stocksRealtime, setStocksRealtime] = useState<StockRealtime[]>([]);
	const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
	const stockCodes = useAppSelector(selectStockCodes);
	const [queryStocksRealtime, { loading, error, data }] = useLazyQuery(QUERY_STOCKS_REALTIME, {
		fetchPolicy: 'no-cache',
		notifyOnNetworkStatusChange: true,
	});
	const refetchCallback = useCallback(() => {
		queryStocksRealtime({ variables: { codes: stockCodes } });
	}, [queryStocksRealtime, stockCodes]);
	const isStartTorefetch = stockCodes.length > 0 && isSidebarOpen;
	useQueryRefetch(refetchCallback, 5000, isStartTorefetch, true);

	const theme = useTheme();
	const { palette } = theme;

	useEffect(() => {
		if (data?.stocksRealtime && !loading) {
			setStocksRealtime(data.stocksRealtime);
		}
	}, [data]);

	return (
		<Box sx={{ position: 'relative' }}>
			{loading && stocksRealtime.length === 0 && <Progress />}
			{stocksRealtime.length > 0 && (
				<List
					sx={{
						maxHeight: '300px',
						overflow: 'auto',
					}}
					subheader={<ListSubheader component="div">自選清單</ListSubheader>}
				>
					{stocksRealtime.map(stockRealtime => {
						const onStockRealtimeClick = () => {
							navigate(`/stock/${stockRealtime.info.code}`);
						};

						return (
							<ListItem key={stockRealtime.info.code} disablePadding>
								<ListItemButton
									sx={{
										justifyContent: 'space-between',
										'& > div': {
											flex: '0 1 auto',
										},
									}}
									onClick={onStockRealtimeClick}
								>
									<ListItemText
										sx={{
											padding: '1px 5px',
											borderRadius: '3px',
											backgroundColor: `${palette.background.default}`,
										}}
										primaryTypographyProps={{
											fontWeight: '500',
										}}
										primary={`${stockRealtime.info.name}`}
									/>
									<ListItemText
										primaryTypographyProps={{
											letterSpacing: '1px',
											color: stockRealtime.changeRate >= 0 ? palette.red.main : palette.green.main,
										}}
										primary={`${stockRealtime.changeRate.toFixed(2)} %`}
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			)}
		</Box>
	);
};

export default CollectionsList;
