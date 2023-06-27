import { Box } from '@mui/material';
import WorldIndexes from '../../components/world-indexes/world-indexes.component';
import MarketRealtime from '../../components/market-realtime/market-realtime.component';
import StocksRank from '../../components/stocks-rank/stocks-rank.component';

const Homepage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				padding: '20px',
				maxWidth: '1400px',
				margin: 'auto',
			}}
		>
			<Box>
				<WorldIndexes />
			</Box>
			<Box>
				<MarketRealtime />
			</Box>
			<Box>
				<StocksRank />
			</Box>
		</Box>
	);
};

export default Homepage;
