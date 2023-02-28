import BacktestForm from '../../components/backtest-form/backtest-form.component';
import TestResultsTable from '../../components/test-results-table/test-results-table.component';
import BacktestTables from '../../components/backtest-tables/bcaktest-tables.component';
const Backtest = () => {
	return (
		<>
			<BacktestForm />
			<BacktestTables />
		</>
	);
};

export default Backtest;
