import { useState, useMemo, useEffect, FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
	selectTradeStrategies,
	selectStockSelectionStrategies,
} from '../../store/backtests/backtests.select';
import { Strategy } from '../../utils/firebase/firebase.utils';

import { Box, Typography } from '@mui/material';

type BacktestStrategyInfoProps = {
	tradeStrategyId: string | number | null;
	stockSelectionStrategyId: string | number | null;
};

const BacktestStrategyInfo: FC<BacktestStrategyInfoProps> = ({
	tradeStrategyId,
	stockSelectionStrategyId,
}) => {
	const tradeStrategies = useAppSelector(selectTradeStrategies);
	const stockSelectionStrategies = useAppSelector(selectStockSelectionStrategies);
	const selectTradeStrategy = useMemo(
		() => tradeStrategies.find(strategy => strategy.id === tradeStrategyId) || null,
		[tradeStrategies, tradeStrategyId]
	);
	const selectStockSelectionStrategy = useMemo(
		() =>
			stockSelectionStrategies.find(strategy => strategy.id === stockSelectionStrategyId) || null,
		[stockSelectionStrategies, stockSelectionStrategyId]
	);

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				{selectStockSelectionStrategy && (
					<Box
						key={selectStockSelectionStrategy.id}
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box>
							<Typography marginBottom="10px" variant="h6">
								選股策略
							</Typography>
						</Box>
						<Box>
							<Typography sx={{ fontWeight: '600', marginBottom: '5px', fontStyle: 'italic' }}>
								{selectStockSelectionStrategy.name} :
							</Typography>
							<Typography>{selectStockSelectionStrategy.desc}</Typography>
						</Box>
					</Box>
				)}
				{selectTradeStrategy && (
					<Box
						key={selectTradeStrategy.id}
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box>
							<Typography marginBottom="10px" variant="h6">
								交易策略
							</Typography>
						</Box>
						<Box>
							<Typography sx={{ fontWeight: '600', marginBottom: '5px', fontStyle: 'italic' }}>
								{selectTradeStrategy.name} :
							</Typography>
							<Typography>{selectTradeStrategy.desc}</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default BacktestStrategyInfo;
