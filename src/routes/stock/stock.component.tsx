import { useEffect, useCallback } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useLazyQuery } from '@apollo/client';
import { QUERY_STOCK_REALTIME } from '../../utils/graphql/query.util';
import { updateStockRealtime } from '../../store/stock/stock.slice';
import { useAppSelector } from '../../store/hooks';
import { selectStockRealtime } from '../../store/stock/stock.select';
import { useQueryRefetch } from '../../hooks/useQueryRefetch.hook';

import { Box } from '@mui/material';
import StockHeader from '../../components/stock-header/stock-header.component';
import Progress from '../../components/progress/progress.component';

const Stock = () => {
	const dispatch = useAppDispatch();
	const { stockCode } = useParams();
	const [queryStockRealtime, { loading, error, data }] = useLazyQuery(QUERY_STOCK_REALTIME, {
		fetchPolicy: 'no-cache',
		notifyOnNetworkStatusChange: true,
	});
	const stockRealtime = useAppSelector(selectStockRealtime);

	const refetchCallBack = useCallback(() => {
		if (stockCode) queryStockRealtime({ variables: { code: stockCode } });
	}, [queryStockRealtime, stockCode]);

	useQueryRefetch(refetchCallBack, 3000, Boolean(stockCode), true);

	useEffect(() => {
		if (!loading && data?.stockRealtime) {
			dispatch(updateStockRealtime(data.stockRealtime));
		}
	}, [data?.stockRealtime]);

	useEffect(() => {
		return () => {
			dispatch(updateStockRealtime(null));
		};
	}, [stockCode]);

	return (
		<Box
			sx={{
				minHeight: 'calc(100vh - 70px)',
				position: 'relative',
			}}
		>
			{loading && !stockRealtime && <Progress isPositionAbsolute={true} />}
			{stockRealtime && (
				<Box>
					<StockHeader />
					<Box sx={{ padding: '20px', maxWidth: '1400px', margin: 'auto' }}>
						<Outlet />
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Stock;
