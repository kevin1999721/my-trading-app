import { initializeApp, FirebaseError } from 'firebase/app';
import {
	getAuth,
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword as getAuthWithEmailAndPassword,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	signOut as authSignOut,
	onAuthStateChanged,
	User,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return userCredential;
	} catch (error) {
		if (error instanceof FirebaseError) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					alert('使用者 email 已存在 ! ');
					break;
				case 'auth/invalid-email':
					alert('email 格式錯誤 !');
					break;
				default:
					alert('發生錯誤: ' + error.code);
					break;
			}
		}

		throw error;
	}
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const userCredential = await getAuthWithEmailAndPassword(auth, email, password);
		return userCredential;
	} catch (error: any) {
		if (error instanceof FirebaseError) {
			switch (error.code) {
				case 'auth/invalid-email':
					alert('email 格式錯誤 !');
					break;
				case 'auth/user-not-found':
					alert('使用者 email 未存在 !');
					break;
				case 'auth/wrong-password':
					alert('密碼錯誤 !');
					break;
				default:
					alert('發生錯誤: ' + error.code);
					break;
			}
		}

		throw error;
	}
};

export const signInWithGoogle = async () => {
	try {
		const userCredential = await signInWithPopup(auth, googleProvider);
		return userCredential;
	} catch (error) {
		throw error;
	}
};

export const signInwithFacebook = async () => {
	try {
		const userCredential = await signInWithPopup(auth, facebookProvider);
		return userCredential;
	} catch (error) {
		throw error;
	}
};

export const signOut = async () => {
	try {
		await authSignOut(auth);
	} catch (error) {
		throw error;
	}
};

export const getAuthCurrentUser = async () => {
	try {
		const currentUser = await new Promise<User | null>(resolve => {
			const unsubscribe = onAuthStateChanged(auth, user => {
				unsubscribe();
				resolve(user);
			});
		});
		return currentUser;
	} catch (error) {
		throw error;
	}
};

type FirestoreDocTimestamps = {
	seconds: number;
	nanoseconds: number;
};

export type FirestoreUserDocument = {
	displayName: string;
	email: string;
	createAt: Date;
};

type AuthCurrentUserProfile = {
	displayName?: string;
	photoURL?: string;
};

export const updateAuthCurrentUser = async (authCurrentUserProfile: AuthCurrentUserProfile) => {
	const currentUser = auth.currentUser;

	if (currentUser) {
		await updateProfile(currentUser, {
			...authCurrentUserProfile,
		});
	}
};

export const addUserDocument = async () => {
	const currentUser = auth.currentUser;

	if (currentUser) {
		const { uid, displayName, email } = currentUser;
		const createAt = new Date();

		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			await setDoc(doc(db, 'users', uid), {
				displayName,
				email,
				createAt,
			});

			const currentUserDocSnap = await getDoc(docRef);
			const {
				createAt: { seconds },
				...elseFields
			} = currentUserDocSnap.data() as Omit<FirestoreUserDocument, 'createAt'> & {
				createAt: FirestoreDocTimestamps;
			};
			return { createAt: new Date(seconds * 1000), ...elseFields } as FirestoreUserDocument;
		} else {
			const {
				createAt: { seconds },
				...elseFields
			} = docSnap.data() as Omit<FirestoreUserDocument, 'createAt'> & {
				createAt: FirestoreDocTimestamps;
			};
			return { createAt: new Date(seconds * 1000), ...elseFields } as FirestoreUserDocument;
		}
	} else {
		return null;
	}
};

export type Strategy = {
	[x: string]: any;
	id: string;
	name: string;
	desc: string;
	type: string;
};

export const getTradeStrategiesDocs = async (): Promise<Strategy[]> => {
	const querySnapshot = await getDocs(collection(db, 'backtestStrategies'));
	return querySnapshot.docs.map(doc => {
		return {
			id: doc.id,
			...doc.data(),
		};
	}) as Strategy[];
};

export const getStockSelectionStrategiesDocs = async (): Promise<Strategy[]> => {
	const querySnapshot = await getDocs(collection(db, 'selectionStrategies'));
	return querySnapshot.docs.map(doc => {
		return {
			id: doc.id,
			...doc.data(),
		};
	}) as Strategy[];
};
