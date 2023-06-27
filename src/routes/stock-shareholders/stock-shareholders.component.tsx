import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { QUERY_SHAREHOLDERS } from '../../utils/graphql/query.util';
import { sxDashboard } from '../../utils/theme/theme.util';

import { Box, Typography } from '@mui/material';
import StockShareHoldersChart from '../../components/stock-shareholders-chart/stock-shareholders-chart.component';
import StockShareHoldersTable from '../../components/stock-shareholders-table/stock-shareholders-table.component';
import Progress from '../../components/progress/progress.component';

const StockShareholders = () => {
	const theme = useTheme();
	const { palette } = theme;
	const { stockCode } = useParams();
	const { loading, error, data } = useQuery(QUERY_SHAREHOLDERS, {
		variables: {
			code: stockCode || '',
		},
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				gap: '20px',
			}}
		>
			<Typography variant="h6">近50週股東流動圖</Typography>
			<Box
				sx={{
					...sxDashboard,
				}}
			>
				{loading && <Progress />}
				{data?.shareholders && (
					<>
						<StockShareHoldersChart shareholdersList={data.shareholders} />
					</>
				)}
			</Box>
			<Box
				sx={{
					...sxDashboard,
				}}
			>
				{loading && <Progress />}
				{data?.shareholders && <StockShareHoldersTable shareholdersList={data.shareholders} />}
			</Box>
		</Box>
	);
};

export default StockShareholders;
