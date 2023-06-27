import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useTheme } from '@mui/material';
import { sxDashboard } from '../../utils/theme/theme.util';
import { QUERY_MAJORS_TRENDS, QUERY_MAJORS_TREND } from '../../utils/graphql/query.util';
import { MajorsTrendArgsType, MajorsTrendArgs, MajorsTrend } from '../../gql/graphql';

import { Box, Typography } from '@mui/material';
import StockMajorChart from '../../components/stock-major-chart/stock-major-chart.component';
import StockMajorSearchForm from '../../components/stock-major-search-form/stock-major-search-form.component';
import StockMajorTable from '../../components/stock-major-table/stock-major-table.component';
import StockMajorInfo from '../../components/stock-major-info/stock-major-info.component';
import Progress from '../../components/progress/progress.component';
import DisplayNoData from '../../components/display-no-data/display-no-data.componenet';

const StockMajor = () => {
	const theme = useTheme();
	const { palette } = theme;
	const { stockCode } = useParams();
	const [majorsTrends, setMajorsTrends] = useState<MajorsTrend[]>([]);
	const [majorsTrend, setMajorsTrend] = useState<MajorsTrend | null>(null);
	const [majorsTrendArgs, setMajorsTrendArgs] = useState<MajorsTrendArgs>({
		type: MajorsTrendArgsType.TradeDays,
		code: stockCode || '',
		tradeDays: 1,
	});

	const startDate = new Date(new Date().setDate(new Date().getDate() - 90))
		.toISOString()
		.split('T')[0];
	const endDate = new Date().toISOString().split('T')[0];

	const { loading: majorsTrendsLoading, data: majorsTrendsData } = useQuery(QUERY_MAJORS_TRENDS, {
		variables: {
			code: stockCode || '',
			startDate: startDate,
			endDate: endDate,
		},
	});

	const { loading: majorsTrendLoading, data: majorsTrendData } = useQuery(QUERY_MAJORS_TREND, {
		variables: {
			majorsTrendArgs: majorsTrendArgs,
		},
	});

	useEffect(() => {
		if (majorsTrendData?.majorsTrend) setMajorsTrend(majorsTrendData.majorsTrend);
	}, [majorsTrendData?.majorsTrend]);

	useEffect(() => {
		if (majorsTrendsData?.majorsTrends) setMajorsTrends(majorsTrendsData.majorsTrends);
	}, [majorsTrendsData?.majorsTrends]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			<Typography variant="h6">近一季主力買賣超</Typography>
			<Box
				sx={{
					...sxDashboard,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						position: 'relative',
						minHeight: '150px',
					}}
				>
					{majorsTrendsLoading && <Progress isPositionAbsolute={true} />}
					{majorsTrends.length > 0 ? (
						<StockMajorChart majorsTrends={majorsTrends} />
					) : (
						<DisplayNoData />
					)}
				</Box>
			</Box>
			<Box
				sx={{
					...sxDashboard,
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
				}}
			>
				<Box>
					<StockMajorSearchForm setMajorsTrendArgs={setMajorsTrendArgs} />
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						position: 'relative',
						minHeight: '150px',
					}}
				>
					{majorsTrendLoading && <Progress isPositionAbsolute={true} />}
					{majorsTrend ? (
						<>
							<StockMajorInfo majorsTrend={majorsTrend} />
							<StockMajorTable majorsTrend={majorsTrend} />
						</>
					) : (
						<DisplayNoData />
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default StockMajor;
