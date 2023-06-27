import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectStockRealtime } from '../../store/stock/stock.select';
import { useTheme, useMediaQuery } from '@mui/material';
import { SxProps, Theme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { updateStockCode } from '../../store/collections/collections.slice';
import { selectStockCodes } from '../../store/collections/collections.select';

import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const StockRealtimeInfo = () => {
	const dispatch = useAppDispatch();
	const { stockCode } = useParams();
	const [open, setOpen] = useState(false);
	const stockRealtime = useAppSelector(selectStockRealtime);
	const stockCodes = useAppSelector(selectStockCodes);
	const isStockCodeCollect = useMemo<boolean>(() => {
		return stockCode && stockCodes.indexOf(stockCode) > -1 ? true : false;
	}, [stockCodes, stockCode]);

	const isMedialQueryMatch = useMediaQuery('(max-width: 800px)');
	const theme = useTheme();
	const { palette } = theme;

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const realtimeDescriptions = stockRealtime && [
		{
			key: 'open',
			value: stockRealtime.open,
			reference: stockRealtime.info.reference,
			description: '開',
		},
		{
			key: 'high',
			value: stockRealtime.high,
			reference: stockRealtime.info.reference,
			description: '高',
		},
		{
			key: 'low',
			value: stockRealtime.low,
			reference: stockRealtime.info.reference,
			description: '低',
		},
		{
			key: 'close',
			value: stockRealtime.close,
			reference: stockRealtime.info.reference,
			description: '收',
		},
		{
			key: 'volume',
			value: stockRealtime.volume,
			reference: stockRealtime.yesterdayVolume,
			description: '量',
		},
	];

	const getTypographyStyle = (reference: number, value: number): SxProps<Theme> => {
		return value > reference
			? {
					color: palette.red.main,
			  }
			: value < reference
			? {
					color: palette.green.main,
			  }
			: {};
	};

	const onCollectionsButotnClick = () => {
		if (stockCode) {
			dispatch(updateStockCode(stockCode));
		}
		setOpen(true);
	};

	return (
		<>
			{stockRealtime && (
				<Box
					sx={{
						borderBottom: `1px solid ${palette.boreder.main}`,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'center',
							padding: '10px',
							gap: '10px 50px',
							maxWidth: '1400px',
							width: '100%',
							margin: 'auto',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: '20px',
							}}
						>
							<Box sx={{ display: 'flex', flexDirection: 'column' }}>
								<Box sx={{ display: 'flex', gap: '10px' }}>
									<Typography variant="h4">{stockRealtime.info.name}</Typography>
									<Typography variant="h4">{stockRealtime.info.code}</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										gap: '10px',
										...getTypographyStyle(stockRealtime.info.reference, stockRealtime.close),
									}}
								>
									<Typography variant="h6">{stockRealtime.close.toFixed(2)}</Typography>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<PlayArrowRoundedIcon
											sx={{
												transform:
													stockRealtime.close > stockRealtime.info.reference
														? 'rotate(-90deg)'
														: 'rotate(90deg)',
											}}
										/>
										<Typography variant="h6">
											{`${stockRealtime.changePrice.toFixed(2)}(${stockRealtime.changeRate.toFixed(
												2
											)}%)`}
										</Typography>
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<Button
									sx={{ borderRadius: '100px' }}
									variant="contained"
									size="small"
									onClick={onCollectionsButotnClick}
								>
									<FavoriteOutlinedIcon
										sx={{ fontSize: '14px', fill: isStockCodeCollect ? palette.red.main : '' }}
									/>
									<Typography variant="h6" sx={{ fontSize: '14px', marginLeft: '5px' }}>
										清單
									</Typography>
								</Button>
								<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
									<Alert onClose={handleClose} severity="info" sx={{ width: '100%', boxShadow: 3 }}>
										{isStockCodeCollect ? '已加入至自選清單 !' : '已從自選清單移除 !'}
									</Alert>
								</Snackbar>
							</Box>
						</Box>

						<Box sx={{ display: 'flex' }}>
							<Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
								{realtimeDescriptions &&
									realtimeDescriptions.map(realtimeDescription => {
										return (
											<Typography
												key={realtimeDescription.key}
												variant="h6"
												sx={{
													whiteSpace: 'nowrap',
													fontSize: isMedialQueryMatch ? '18px' : '20px',
													...getTypographyStyle(
														realtimeDescription.reference,
														realtimeDescription.value
													),
												}}
											>{`${realtimeDescription.description} ${
												realtimeDescription.key === 'volume'
													? realtimeDescription.value
													: realtimeDescription.value.toFixed(2)
											}`}</Typography>
										);
									})}
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default StockRealtimeInfo;
