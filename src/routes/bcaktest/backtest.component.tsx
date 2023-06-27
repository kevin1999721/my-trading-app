import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user.select';

import BacktestForm from '../../components/backtest-form/backtest-form.component';
import BacktestTables from '../../components/backtest-tables/bcaktest-tables.component';

import { Box, Typography } from '@mui/material';

const Backtest = () => {
	const currentUser = useAppSelector(selectCurrentUser);
	return (
		<Box>
			{currentUser ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						padding: '20px',
						gap: '20px',
						maxWidth: '1400px',
						margin: 'auto',
					}}
				>
					<BacktestForm />
					<BacktestTables />
				</Box>
			) : (
				<Box
					sx={{
						display: 'flex',
						minHeight: 'calc(100vh - 60px)',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box>
						<Typography variant="h6" fontStyle={'italic'}>
							請先登入會員 !
						</Typography>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Backtest;
