import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from './utils/theme/theme';
import { ThemeProvider } from '@mui/material/styles';

const client = new ApolloClient({
	uri: 'http://127.0.0.1:8000/graphql',
	cache: new InMemoryCache({
		addTypename: false,
	}),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ApolloProvider client={client}>
					<BrowserRouter>
						<ThemeProvider theme={theme}>
							<App />
						</ThemeProvider>
					</BrowserRouter>
				</ApolloProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
