import { useParams } from 'react-router-dom';
import { KbarFrequency } from '../../utils/highcharts/highcharts.util';

import { Box } from '@mui/material';
import Kbar from '../../components/kbar/kbar.component';

const StockTechnical = () => {
	const { stockCode } = useParams();

	const kbarStartDate = new Date(new Date().setDate(new Date().getDate() - 365))
		.toISOString()
		.split('T')[0];
	const kbarEndDate = new Date().toISOString().split('T')[0];

	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			{stockCode && (
				<Kbar
					kbarsArgs={{
						code: stockCode,
						startDate: kbarStartDate,
						endDate: kbarEndDate,
						period: 1,
						frequency: KbarFrequency.D,
					}}
				/>
			)}
		</Box>
	);
};

export default StockTechnical;
