import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleThemePaletteMode } from '../../store/theme/theme.slice';
import { toggleIsSidebarOpen } from '../../store/sidebar/sidebar.slice';
import { toggleIsAuthenticationFormOpen } from '../../store/user/user.slice';
import { selectIsAuthenticationFormOpen, selectCurrentUser } from '../../store/user/user.select';

import { Box, IconButton, Dialog } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import StockSearhForm from '../stock-search-form/stock-searh-form.component';
import Authentication from '../../routes/authentication/authentication.component';

const DefaultHeader = () => {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const { palette } = theme;
	const isAuthenticationFormOpen = useAppSelector(selectIsAuthenticationFormOpen);
	const currentUser = useAppSelector(selectCurrentUser);

	const onMenuButtonClick = () => {
		dispatch(toggleIsSidebarOpen());
	};

	const onButtonClick = () => {
		dispatch(toggleThemePaletteMode());
	};

	const onAuthenticationButtonClick = () => {
		dispatch(toggleIsAuthenticationFormOpen(true));
	};

	const authenticationFormCloseHandler = () => {
		dispatch(toggleIsAuthenticationFormOpen(false));
	};

	useEffect(() => {
		dispatch(toggleIsAuthenticationFormOpen(false));
	}, [currentUser]);

	return (
		<Box
			sx={{
				backgroundColor: palette.background.paper,
				borderBottom: `1px solid ${palette.boreder.main}`,
				height: '60px',
			}}
		>
			<Box
				component={'header'}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '100%',
					padding: '10px',
					gap: '10px',
					maxWidth: '1400px',
					margin: 'auto',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						border: `1px solid ${palette.boreder.main}`,
						borderRadius: '5px',
						flexShrink: 1,
						flexGrow: 1,
						maxWidth: '350px',
						minWidth: '200px',
					}}
				>
					<IconButton sx={{ p: '10px' }} aria-label="menu" onClick={onMenuButtonClick}>
						<MenuIcon />
					</IconButton>
					<StockSearhForm inputType="customBaseInput" searchType="navigateToStock" />
				</Box>
				<Box
					sx={{
						flexShrink: 0,
					}}
				>
					<IconButton onClick={onButtonClick}>
						{palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
					<IconButton onClick={onAuthenticationButtonClick}>
						{currentUser ? <LogoutIcon /> : <AccountCircleIcon />}
					</IconButton>
				</Box>
				<Dialog
					sx={{
						zIndex: theme => theme.zIndex.drawer + 1,
						'> .MuiModal-backdrop': { backdropFilter: 'blur(5px)' },
					}}
					open={isAuthenticationFormOpen}
					onClose={authenticationFormCloseHandler}
					PaperProps={{
						sx: {
							backgroundColor: 'transparent',
							backgroundImage: 'unset',
							maxWidth: 'unset',
							borderRadius: 'unset',
						},
					}}
				>
					{isAuthenticationFormOpen && <Authentication />}
				</Dialog>
			</Box>
		</Box>
	);
};

export default DefaultHeader;
