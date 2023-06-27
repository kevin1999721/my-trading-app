import { useAppSelector } from '../../store/hooks';
import { selectStockRealtime } from '../../store/stock/stock.select';
import { useTheme } from '@mui/material';

import { Box } from '@mui/material';
import StockRealtimeInfo from '../stock-realtime-info/stock-realtime-info.component';
import StockNavigation from '../stock-navigation/stock-navigation.component';

const StockHeader = () => {
	const theme = useTheme();
	const { palette } = theme;
	const stockRealtime = useAppSelector(selectStockRealtime);

	return (
		<>
			{stockRealtime && (
				<Box
					sx={{
						backgroundColor: palette.background.paper,
					}}
				>
					<Box
						component={'header'}
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<StockRealtimeInfo />
						<StockNavigation />
					</Box>
				</Box>
			)}
		</>
	);
};

export default StockHeader;
