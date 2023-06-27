import { useTheme } from '@mui/material';
import { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

type ProgressProps = {
	isPositionAbsolute?: boolean;
};

const Progress: FC<ProgressProps> = ({ isPositionAbsolute = false }) => {
	const { palette } = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				padding: '20px 0',
				backgroundColor: palette.background.default + 'fa',
				zIndex: '100',
				...(isPositionAbsolute && {
					position: 'absolute',
					left: '0',
					top: '0',
				}),
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default Progress;
