import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useTheme } from '@mui/material';
import { userSignIn, userGoogleSignIn, userFacebookSignIn } from '../../store/user/user.slice';

import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

type FormFiledsValue = {
	email: string;
	password: string;
};

type FormField = {
	field: keyof FormFiledsValue;
	label: string;
	type: string;
	require?: boolean;
	icon: any;
};

const defaultFormFieldsValue: FormFiledsValue = {
	email: '',
	password: '',
};

const formFields: FormField[] = [
	{
		field: 'email',
		label: '信箱',
		type: 'email',
		icon: EmailIcon,
	},
	{
		field: 'password',
		label: '密碼',
		type: 'password',
		icon: KeyIcon,
	},
];

const SignInForm = () => {
	const theme = useTheme();
	const { palette } = theme;
	const dispatch = useAppDispatch();
	const [formFieldsValue, setFormFieldsValue] = useState(defaultFormFieldsValue);

	const onTextfieldChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFieldsValue(current => ({ ...current, [name]: value }));
	};

	const onSignInButtonClick = () => {
		const { email, password } = formFieldsValue;

		if (email && password) {
			dispatch(userSignIn({ email, password }));
		}
	};

	const onGoogleButtonClick = () => {
		dispatch(userGoogleSignIn());
	};

	const onFacebookButtonClick = () => {
		dispatch(userFacebookSignIn());
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }} component={'form'}>
				<Box>
					<Typography variant="h6" textAlign={'center'}>
						登錄會員
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}
				>
					{formFields.map(formField => {
						const { field, label, type, require, icon: InputIcon } = formField;

						return (
							<TextField
								key={field}
								required
								variant="filled"
								onChange={onTextfieldChange}
								label={label}
								type={type}
								name={field}
								value={formFieldsValue[field]}
								InputProps={{
									endAdornment: <InputIcon />,
								}}
							/>
						);
					})}
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
					<Box>
						<Button sx={{ width: '100%' }} variant="outlined" onClick={onSignInButtonClick}>
							登錄
						</Button>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							gap: '20px',
							button: {
								border: `1px solid ${palette.primary.main}`,
								color: palette.primary.main,
							},
						}}
					>
						<IconButton disableFocusRipple={false} onClick={onGoogleButtonClick}>
							<GoogleIcon />
						</IconButton>
						<IconButton onClick={onFacebookButtonClick}>
							<FacebookIcon />
						</IconButton>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default SignInForm;
