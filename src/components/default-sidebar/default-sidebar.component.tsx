import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectIsSidebarOpen } from '../../store/sidebar/sidebar.select';
import { toggleIsSidebarOpen } from '../../store/sidebar/sidebar.slice';
import { useMediaQuery, useTheme } from '@mui/material';

import {
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CollectionsList from '../collections-list/collections-list.component';
import DefaultSidebarNavigation from '../default-sidebar-navigation/default-sidebar-navigation.component';
import UserAvatar from '../user-avatar/user-avatar.component';

const DefaultSidebar = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { palette } = theme;
	const isMatchMediaQuery = useMediaQuery('(max-width:800px)');
	const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
	const dispatch = useAppDispatch();
	const sidebar = useRef<HTMLDivElement>(null);

	const onButtonClick = () => {
		dispatch(toggleIsSidebarOpen());
	};

	useEffect(() => {
		//trigger window resize to resize highcharts chart
		let observer: ResizeObserver | null = null;
		if (sidebar.current) {
			const observer = new ResizeObserver(() => window.dispatchEvent(new Event('resize')));
			observer.observe(sidebar.current);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [sidebar.current]);

	return (
		<Drawer
			ref={sidebar}
			sx={{
				resize: 'both',
				width: isSidebarOpen ? '250px' : '0px',
				overflow: 'hidden',
				transition: 'width 0.2s',
				'& .MuiDrawer-paper': {
					transform: isSidebarOpen ? '' : 'translate(-100%, 0)',
					width: '250px',
					height: '100vh',
					transition: 'transform 0.2s',
					backgroundImage: 'none',
				},
			}}
			anchor="left"
			open={isSidebarOpen}
			variant={isMatchMediaQuery ? 'temporary' : 'permanent'}
			ModalProps={{
				keepMounted: true,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					height: '60px',
					borderBottom: `1px solid ${palette.boreder.main} `,
				}}
			>
				<IconButton
					sx={{
						marginRight: '5px',
					}}
					onClick={onButtonClick}
				>
					<ChevronLeftIcon />
				</IconButton>
			</Box>
			<Box>
				<UserAvatar />
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/')}>
							<ListItemIcon>
								<HomeOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary="首頁" />
						</ListItemButton>
					</ListItem>
				</List>
				<CollectionsList />
				<DefaultSidebarNavigation />
			</Box>
		</Drawer>
	);
};

export default DefaultSidebar;
