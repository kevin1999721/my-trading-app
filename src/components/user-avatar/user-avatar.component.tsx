import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user.select';

import { Box, Avatar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const UserAvatar = () => {
	const currentUser = useAppSelector(selectCurrentUser);

	return (
		<Box>
			{currentUser && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '20px 0',
						gap: '5px',
					}}
				>
					<Box>
						<Avatar>
							<PersonIcon />
						</Avatar>
					</Box>
					<Box>
						<Typography variant="h6">{currentUser.displayName || currentUser.email}</Typography>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default UserAvatar;
