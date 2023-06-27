import { Box, Typography } from '@mui/material';

export const DisplayNoData = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<Typography variant="body1" fontWeight={600}>
				暫無資料 !
			</Typography>
		</Box>
	);
};

export default DisplayNoData;
