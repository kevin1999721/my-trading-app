import { FC } from 'react';
import Typography from '@mui/material/Typography';

type BacktestTableTitleProps = {
	text: string;
};

const BacktestTableTitle: FC<BacktestTableTitleProps> = ({ text }) => {
	return (
		<Typography sx={{ marginBottom: '10px' }} variant="h6">
			{text}
		</Typography>
	);
};

export default BacktestTableTitle;
