import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import DefaultHeader from '../../components/default-header/default-header.component';
import DefaultSidebar from '../../components/default-sidebar/default-sidebar.component';

const Default = () => {
	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			<Box
				sx={{
					flexShrink: 0,
				}}
			>
				<DefaultSidebar />
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					maxWidth: '100%',
					overflow: 'hidden',
				}}
			>
				<DefaultHeader />
				<Outlet />
			</Box>
		</Box>
	);
};

export default Default;
