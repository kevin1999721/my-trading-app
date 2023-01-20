import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Kbar from './components/kbar/kbar.component';
import StockSearhForm from './components/stock-search-form/stock-searh-form.component';
import TestResultsTable from './components/test-results-table/test-results-table.component';

import './App.css';

function App() {
	console.log('app render');
	return (
		<div className="App">
			<TestResultsTable />
			{/* <StockSearhForm /> */}
			{/* <Kbar /> */}
		</div>
	);
}

export default App;
