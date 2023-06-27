import { ChangeEvent, useState } from 'react';
import { userSignUp } from '../../store/user/user.slice';
import { useAppDispatch } from '../../store/hooks';

import { Box, TextField, Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

type FormFiledsValue = {
	displayName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type FormField = {
	field: keyof FormFiledsValue;
	label: string;
	type: string;
	require: boolean;
	icon: any;
};

const defaultFormFieldsValue: FormFiledsValue = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const formFields: FormField[] = [
	{
		field: 'displayName',
		label: '暱稱',
		type: 'text',
		require: false,
		icon: PersonIcon,
	},
	{
		field: 'email',
		label: '信箱',
		type: 'email',
		require: true,
		icon: EmailIcon,
	},
	{
		field: 'password',
		label: '密碼',
		type: 'password',
		require: true,
		icon: KeyIcon,
	},
	{
		field: 'confirmPassword',
		label: '確認密碼',
		type: 'password',
		require: true,
		icon: KeyIcon,
	},
];
const SignUpForm = () => {
	const dispatch = useAppDispatch();
	const [formFieldsValue, setFormFieldsValue] = useState(defaultFormFieldsValue);

	const onTextfieldChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFieldsValue(current => ({ ...current, [name]: value }));
	};

	const onSignUpButtonClick = () => {
		const { email, password, confirmPassword, displayName } = formFieldsValue;

		if (password.length < 6) {
			alert('密碼是至少 6 位 !');
			return;
		} else if (password !== confirmPassword) {
			alert('密碼與確認密碼不符 !');
			return;
		}

		if (email && password) {
			dispatch(userSignUp({ email, password, displayName }));
		}
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }} component={'form'}>
				<Box>
					<Typography variant="h6" textAlign={'center'}>
						註冊會員
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
								required={require}
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
				<Box>
					<Button sx={{ width: '100%' }} variant="outlined" onClick={onSignUpButtonClick}>
						註冊
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default SignUpForm;
