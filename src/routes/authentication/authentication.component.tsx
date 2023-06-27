import { useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user.select';
import { sxDashboard } from '../../utils/theme/theme.util';

import { Box, Divider } from '@mui/material';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignOutForm from '../../components/sign-out-form/sign-out-form.component';

const Authentication = () => {
	const currentUser = useAppSelector(selectCurrentUser);
	const isMatchMediaQuery = useMediaQuery('(max-width: 800px)');

	return (
		<Box>
			<Box
				sx={{
					...sxDashboard,
					display: 'flex',
					flexDirection: isMatchMediaQuery ? 'column' : 'row',
					justifyContent: 'center',
					gap: '30px',
					padding: '20px',
				}}
			>
				{currentUser ? (
					<SignOutForm />
				) : (
					<>
						<SignInForm />
						{isMatchMediaQuery && <Divider />}
						<SignUpForm />
					</>
				)}
			</Box>
		</Box>
	);
};

export default Authentication;
