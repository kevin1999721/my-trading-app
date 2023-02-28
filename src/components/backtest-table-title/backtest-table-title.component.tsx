import { FC } from 'react';
import Typography from '@mui/material/Typography';

type BacktestTableTitleProps = {
	text: string;
};

const BacktestTableTitle: FC<BacktestTableTitleProps> = ({ text }) => {
	return (
		<Typography variant="h5" gutterBottom>
			{text}
		</Typography>
	);
};

export default BacktestTableTitle;
