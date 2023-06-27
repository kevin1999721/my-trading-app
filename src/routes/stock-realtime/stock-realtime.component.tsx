import { useParams } from 'react-router-dom';

import { sxDashboard } from '../../utils/theme/theme.util';

import { Box, Typography } from '@mui/material';
import StockRealtimeChart from '../../components/stock-realtime-chart/stock-realtime-chart.component';
import StockRealtimeBidask from '../../components/stock-realtime-bidask/stock-realtime-bidask.component';
import StockNews from '../../components/stock-news/stock-news.component';

const StockRealtime = () => {
	const { stockCode } = useParams();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '20px',
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}
			>
				<Box sx={{ ...sxDashboard, width: '500px', flexGrow: 1, overflow: 'hidden' }}>
					<StockRealtimeChart />
				</Box>
				<Box sx={{ ...sxDashboard, width: '300px', flexGrow: 1 }}>
					<StockRealtimeBidask />
				</Box>
			</Box>
			<Box sx={{ width: '100%', flexGrow: 1 }}>
				<Typography variant="h6" marginBottom={'10px'}>
					經濟日報
				</Typography>
				<Box sx={{ ...sxDashboard, maxHeight: '800px', overflow: 'auto' }}>
					<StockNews code={stockCode || ''} />
				</Box>
			</Box>
		</Box>
	);
};

export default StockRealtime;
