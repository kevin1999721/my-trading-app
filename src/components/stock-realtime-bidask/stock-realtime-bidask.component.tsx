import { useTheme } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectStockRealtime } from '../../store/stock/stock.select';

import { Box, Typography } from '@mui/material';

const StockRealtimeBidask = () => {
	const theme = useTheme();
	const { palette } = theme;
	const stockRealtime = useAppSelector(selectStockRealtime);
	const bidsSum = stockRealtime?.bidVolume ? stockRealtime.bidVolume.reduce((a, b) => a + b, 0) : 0;
	const asksSum = stockRealtime?.askVolume ? stockRealtime.askVolume.reduce((a, b) => a + b, 0) : 0;

	return (
		<>
			{stockRealtime && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						width: '100%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							gap: '10px',
							width: '100%',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								flex: 1,
								color: palette.red.main,
							}}
						>
							<Box
								sx={{
									textAlign: 'center',
									padding: '0 0 5px 0',
									borderBottom: `2px solid ${palette.red.main}`,
								}}
							>
								<Typography variant="h6">委買</Typography>
							</Box>
							{stockRealtime.bidPrice.map((price, index) => {
								return (
									<Box
										key={index}
										sx={{ display: 'flex', justifyContent: 'space-between', padding: '3px 10px' }}
									>
										<Typography>{stockRealtime.bidVolume[index]}</Typography>
										<Typography>{price.toFixed(2)}</Typography>
									</Box>
								);
							})}
						</Box>
						<Box
							sx={{ display: 'flex', flexDirection: 'column', flex: 1, color: palette.green.main }}
						>
							<Box
								sx={{
									textAlign: 'center',
									padding: '0 0 5px 0',
									borderBottom: `2px solid ${palette.green.main}`,
								}}
							>
								<Typography variant="h6">委賣</Typography>
							</Box>
							{stockRealtime.askPrice.map((price, index) => {
								return (
									<Box
										key={index}
										sx={{ display: 'flex', justifyContent: 'space-between', padding: '3px 10px' }}
									>
										<Typography>{price.toFixed(2)}</Typography>
										<Typography>{stockRealtime.askVolume[index]}</Typography>
									</Box>
								);
							})}
						</Box>
					</Box>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ display: 'flex', width: '100%', borderRadius: '3px', overflow: 'hidden' }}>
							<Box
								sx={{
									flexGrow: '1',
									width: `${(bidsSum * 100) / (bidsSum + asksSum)}%`,
									height: '20px',
									backgroundColor: palette.red.main,
								}}
							></Box>
							<Box
								sx={{
									flexGrow: '1',
									width: `${(asksSum * 100) / (bidsSum + asksSum)}%`,
									height: '20px',
									backgroundColor: palette.green.main,
								}}
							></Box>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
							<Typography color={palette.red.main}>{`${bidsSum} (${(
								(bidsSum * 100) /
								(bidsSum + asksSum)
							).toFixed(2)}%)`}</Typography>
							<Typography color={palette.green.main}>{`${asksSum} (${(
								(asksSum * 100) /
								(bidsSum + asksSum)
							).toFixed(2)}%)`}</Typography>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default StockRealtimeBidask;
