import { FC } from 'react';
import { MajorsTrend } from '../../gql/graphql';
import { useTheme } from '@mui/material';

import { Box, Typography } from '@mui/material';

type StockMajorInfo = {
	majorsTrend: MajorsTrend;
};

const StockMajorInfo: FC<StockMajorInfo> = ({ majorsTrend }) => {
	const { palette } = useTheme();
	const majorsBuySellDiff =
		majorsTrend.majorsBuyRank.reduce((pre, cur) => pre + cur.diff, 0) -
		majorsTrend.majorsSellRank.reduce((pre, cur) => pre + cur.diff, 0);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				width: '100%',
			}}
		>
			<Box>
				<Typography>
					<span style={{ fontWeight: 500 }}>日期 : </span>
					{`${majorsTrend.startDate} ~ ${majorsTrend.endDate}`}
				</Typography>
			</Box>
			<Box>
				<Typography>
					<span style={{ fontWeight: 500 }}>主力買賣超 : </span>
					<Typography
						component={'span'}
						sx={{
							color:
								majorsBuySellDiff > 0
									? palette.red.main
									: majorsBuySellDiff < 0
									? palette.green.main
									: '',
						}}
					>
						{majorsBuySellDiff}
					</Typography>
				</Typography>
			</Box>
		</Box>
	);
};

export default StockMajorInfo;
