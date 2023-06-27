import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_STOCKS_RANK } from '../../utils/graphql/query.util';
import { StocksRankType, StocksRankArgs, StockRank } from '../../gql/graphql';
import { FetchStocksRankQuery } from '../../gql/graphql';
import { sxDashboard } from '../../utils/theme/theme.util';
import { useQueryRefetch } from '../../hooks/useQueryRefetch.hook';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

import { Box, Typography, Tabs, Tab } from '@mui/material';
import StocksRankTable from '../stocks-rank-table/stocks-rank-table.componenet';
import Progress from '../progress/progress.component';

type StocksRankCategory = 'increase' | 'decline' | 'volume';

type StocksRankTab = {
	key: StocksRankCategory;
	name: string;
	icon: any;
};

type StocksRankArgsSettings = {
	[key in StocksRankCategory]: StocksRankArgs;
};

const stocksRankTabs: StocksRankTab[] = [
	{
		key: 'increase',
		name: '漲幅',
		icon: TrendingUpIcon,
	},
	{
		key: 'decline',
		name: '跌幅',
		icon: TrendingDownIcon,
	},
	{
		key: 'volume',
		name: '成交量',
		icon: SignalCellularAltIcon,
	},
];

const stocksRankArgsSettings: StocksRankArgsSettings = {
	increase: {
		type: StocksRankType.ChangePercentRank,
	},
	decline: {
		type: StocksRankType.ChangePercentRank,
		ascending: false,
	},
	volume: {
		type: StocksRankType.VolumeRank,
	},
};

const StocksRank = () => {
	const [stocksRank, setStocksRank] = useState<FetchStocksRankQuery['stocksRank']>([]);
	const [stocksRankCategory, setStocksRankCategory] = useState<StocksRankCategory>(
		stocksRankTabs[0].key
	);
	const [stocksRankArgs, setStocksRankArgs] = useState<StocksRankArgs>(
		stocksRankArgsSettings.increase
	);
	const [isShowProgress, setIsShowProgess] = useState<boolean>(false);
	const { loading, error, data, refetch } = useQuery(QUERY_STOCKS_RANK, {
		fetchPolicy: 'no-cache',
		variables: {
			stocksRankArgs: stocksRankArgs,
		},
		notifyOnNetworkStatusChange: true,
	});

	const refetchCallBack = useCallback(() => {
		refetch();
	}, [refetch]);

	useQueryRefetch(refetchCallBack, 5000);

	const onTabshandleChange = (event: React.SyntheticEvent, newValue: StocksRankCategory) => {
		setStocksRankCategory(newValue);
	};

	useEffect(() => {
		setStocksRankArgs(stocksRankArgsSettings[stocksRankCategory]);
		setIsShowProgess(true);
	}, [stocksRankCategory]);

	useEffect(() => {
		if (!loading && data?.stocksRank) {
			setStocksRank(data.stocksRank);
			setIsShowProgess(false);
		}
	}, [data?.stocksRank]);

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '10px 20px',
					marginBottom: '20px',
				}}
			>
				<Box>
					<Typography variant="h6">市場趨勢</Typography>
				</Box>
				<Box>
					<Tabs value={stocksRankCategory} onChange={onTabshandleChange}>
						{stocksRankTabs.map(stocksRankTab => {
							const { key, name, icon: Icon } = stocksRankTab;
							return (
								<Tab
									sx={{
										minHeight: 'unset',
										paddingTop: '12px',
										paddingBottom: '12px',
										'& .MuiTab-iconWrapper': {
											marginRight: '5px',
										},
									}}
									key={key}
									value={key}
									iconPosition="start"
									icon={<Icon />}
									label={<span>{name}</span>}
								/>
							);
						})}
					</Tabs>
				</Box>
			</Box>
			<Box>
				<Box sx={{ ...sxDashboard, position: 'relative' }}>
					<StocksRankTable stocksRnak={stocksRank} />
					{isShowProgress && <Progress isPositionAbsolute={true} />}
				</Box>
			</Box>
		</Box>
	);
};

export default StocksRank;
