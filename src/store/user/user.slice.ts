import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
	signInWithEmailAndPassword,
	signUpWithEmailAndPassword,
	signInWithGoogle,
	signInwithFacebook,
	signOut,
	updateAuthCurrentUser,
	addUserDocument,
	FirestoreUserDocument,
	getAuthCurrentUser,
} from '../../utils/firebase/firebase.utils';

type UserState = {
	isAuthenticationFormOpen: boolean;
	currentUser: FirestoreUserDocument | null;
	isLoading: boolean;
	error: any;
};

const initialState: UserState = {
	isAuthenticationFormOpen: false,
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userSignInSuccess = createAsyncThunk<FirestoreUserDocument | null>(
	'user/SignInSuccess',
	async () => {
		const firestoreUserDocument = await addUserDocument();
		return firestoreUserDocument || null;
	}
);

export const userSignInError = createAsyncThunk<string, any>('user/SignInError', async error => {
	if (error instanceof FirebaseError) {
		return error.code;
	} else if (error instanceof Error) {
		return error.message;
	} else {
		return 'someting wrong !';
	}
});

export const userSignUp = createAsyncThunk<
	void,
	{ email: string; password: string; displayName: string }
>('user/SignUp', async (args, { dispatch }) => {
	try {
		const { email, password, displayName } = args;
		await signUpWithEmailAndPassword(email, password);
		await updateAuthCurrentUser({ displayName });
	} catch (error) {
		dispatch(userSignInError(error));
	}
});

export const userSignIn = createAsyncThunk<void, { email: string; password: string }>(
	'user/SignIn',
	async (args, { dispatch }) => {
		try {
			const { email, password } = args;
			await signInWithEmailAndPassword(email, password);
			dispatch(userSignInSuccess());
		} catch (error) {
			dispatch(userSignInError(error));
		}
	}
);

export const userGoogleSignIn = createAsyncThunk<void>(
	'user/GoogleSignIn',
	async (_, { dispatch }) => {
		try {
			await signInWithGoogle();
			dispatch(userSignInSuccess());
		} catch (error) {
			dispatch(userSignInError(error));
		}
	}
);

export const userFacebookSignIn = createAsyncThunk<void>(
	'user/FacebookSignIn',
	async (_, { dispatch }) => {
		try {
			await signInwithFacebook();
			dispatch(userSignInSuccess());
		} catch (error) {
			dispatch(userSignInError(error));
		}
	}
);

export const getCurrenetSigninUser = createAsyncThunk<void>(
	'user/GetCurrentSigninUser',
	async (_, { dispatch }) => {
		try {
			await getAuthCurrentUser();
			dispatch(userSignInSuccess());
		} catch (error) {
			dispatch(userSignInError(error));
		}
	}
);

export const userSignOut = createAsyncThunk<void>(
	'user/SignOut',
	async (_, { rejectWithValue }) => {
		try {
			await signOut();
		} catch (error) {
			if (error instanceof FirebaseError) {
				return rejectWithValue(error.code);
			} else if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('someting wrong !');
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleIsAuthenticationFormOpen: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticationFormOpen = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(userSignInSuccess.fulfilled, (state, action) => {
			state.isLoading = false;
			state.currentUser = action.payload;
		});

		builder.addCase(userSignInError.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});

		builder.addCase(userSignUp.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(userSignIn.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(userGoogleSignIn.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(userFacebookSignIn.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(getCurrenetSigninUser.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(userSignOut.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(userSignOut.fulfilled, state => {
			state.isLoading = false;
			state.currentUser = null;
		});

		builder.addCase(userSignOut.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	},
});

export const { toggleIsAuthenticationFormOpen } = userSlice.actions;
export default userSlice.reducer;
