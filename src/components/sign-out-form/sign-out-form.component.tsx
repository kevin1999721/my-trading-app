import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { userSignOut, toggleIsAuthenticationFormOpen } from '../../store/user/user.slice';

const SignOutForm = () => {
	const dispatch = useAppDispatch();

	const onSignOutButtonClick = () => {
		dispatch(userSignOut());
	};

	const onCancelButtonClick = () => {
		dispatch(toggleIsAuthenticationFormOpen());
	};

	return (
		<Box>
			<Box component={'form'}>
				<Box sx={{ marginBottom: '10px' }}>
					<Typography variant="h6">是否要登出 ?</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<Button onClick={onSignOutButtonClick}>登出</Button>
					<Button onClick={onCancelButtonClick}>取消</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default SignOutForm;
