import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { QUERY_MARKET_REALTIME } from '../../utils/graphql/query.util';
import { updateStockRealtime } from '../../store/stock/stock.slice';
import { sxDashboard } from '../../utils/theme/theme.util';
import { useQueryRefetch } from '../../hooks/useQueryRefetch.hook';

import { Box, Typography, Tabs, Tab } from '@mui/material';

import StockRealtimeChart from '../stock-realtime-chart/stock-realtime-chart.component';
import Progress from '../progress/progress.component';

const MarketRealtime = () => {
	const dispatch = useAppDispatch();
	const [tabValue, setTabValue] = useState('');
	const { loading, error, data, refetch } = useQuery(QUERY_MARKET_REALTIME, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: false,
	});
	const refetchCallback = useCallback(() => {
		refetch();
	}, [refetch]);
	useQueryRefetch(refetchCallback, 3000);

	const isMedialQueryMatch = useMediaQuery('(max-width: 800px)');
	const theme = useTheme();
	const { palette } = theme;

	const onTabsChange = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		if (!loading && data?.marketRealtime) {
			setTabValue(current => current || data.marketRealtime[0].info.code);
		}
	}, [data?.marketRealtime]);

	useEffect(() => {
		if (!loading && data?.marketRealtime && tabValue) {
			const stockRealtime = data.marketRealtime.find(
				stockRealtime => stockRealtime.info.code === tabValue
			);
			if (stockRealtime) dispatch(updateStockRealtime(stockRealtime));
		}
	}, [data?.marketRealtime, tabValue]);

	useEffect(() => {
		return () => {
			dispatch(updateStockRealtime(null));
		};
	}, []);

	return (
		<Box>
			<Box marginBottom="20px">
				<Box>
					<Typography variant="h6">大盤走勢</Typography>
				</Box>
			</Box>
			{loading && !data?.marketRealtime && <Progress />}
			{data?.marketRealtime && data.marketRealtime.length > 0 && tabValue && (
				<Box
					sx={{
						...sxDashboard,
						display: 'flex',
						gap: '20px',
						...(isMedialQueryMatch ? { flexDirection: 'column' } : {}),
					}}
				>
					<Box
						sx={{
							...(isMedialQueryMatch ? { borderBottom: 1 } : { borderRight: 1 }),
							borderColor: palette.divider,
						}}
					>
						<Tabs
							orientation={isMedialQueryMatch ? 'horizontal' : 'vertical'}
							value={tabValue}
							onChange={onTabsChange}
						>
							{data.marketRealtime.map(stockRealtime => {
								const { code, name } = stockRealtime.info;
								const { close, changePrice, changeRate } = stockRealtime;
								return (
									<Tab
										sx={{
											color: 'unset',
											'&.Mui-selected': { color: 'unset' },
										}}
										component={'div'}
										key={code}
										value={code}
										label={
											<Box sx={{ display: 'flex', flexDirection: 'column' }}>
												<Typography fontWeight={600}>{name}</Typography>
												<Typography
													fontWeight={500}
													color={
														changePrice > 0
															? palette.red.main
															: changePrice < 0
															? palette.green.main
															: ''
													}
												>
													{close.toFixed(2)}
												</Typography>
												<Typography
													fontWeight={500}
													color={
														changePrice > 0
															? palette.red.main
															: changePrice < 0
															? palette.green.main
															: ''
													}
												>{`${changePrice.toFixed(2)} (${changeRate.toFixed(2)}%)`}</Typography>
											</Box>
										}
									/>
								);
							})}
						</Tabs>
					</Box>

					<Box sx={{ flex: 1, overflow: 'hidden' }}>
						<StockRealtimeChart key={tabValue} isShowRealtimeInfo={true} />
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default MarketRealtime;
