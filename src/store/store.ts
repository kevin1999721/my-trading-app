import { configureStore, combineReducers, Middleware } from '@reduxjs/toolkit';
import backtestsReducer from './backtests/bcaktests.slice';
import themeReducer from './theme/theme.slice';
import stockReducer from './stock/stock.slice';
import sidebarReducer from './sidebar/sidebar.slice';
import collectionsReducer from './collections/collections.slice';
import userReducer from './user/user.slice';
import logger from 'redux-logger';
import {
	persistReducer,
	persistStore,
	PersistConfig,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	backtests: backtestsReducer,
	theme: themeReducer,
	stock: stockReducer,
	sidebar: sidebarReducer,
	collections: collectionsReducer,
	user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
	key: 'root',
	storage,
	blacklist: ['stock', 'sidebar', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [process.env.NODE_ENV !== 'production' && logger].filter(
	(middleware): middleware is Middleware => Boolean(middleware)
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
					'user/SignUp/fulfilled',
					'user/SignIn/fulfilled',
					'user/GoogleSignIn/fulfilled',
					'user/FacebookSignIn/fulfilled',
					'user/GetCurrentSigninUser/fulfilled',
					'user/SignInSuccess/fulfilled',
					'user/SignInError/fulfilled',
				],
				ignoredPaths: ['user.currentUser'],
			},
		}).concat(middleware);
	},
});

export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
