import { FC } from 'react';
import { ChartSeries, KbarPeriodFrequency } from '../kbar/kbar.component';

import { Chart } from 'highcharts/highstock';

import { Box, useTheme } from '@mui/material';
import KbarIndicatorsSelectsContainer from '../kbar-indicators-selects-container/kbar-indicators-selects-container.component';
import KbarFrequencyButtonsCcontainer from '../kbar-frequency-buttons-container/kbar-frequency-buttons-container.component';

// import './kbar-toolbar.style.css';

type KbarToolbarProps = {
	chart: Chart;
	setChartSeries: React.Dispatch<React.SetStateAction<ChartSeries>>;
	kbarPeriodFrequency: KbarPeriodFrequency;
	setKbarPeriodFrequency: React.Dispatch<React.SetStateAction<KbarPeriodFrequency>>;
};

const KbarToolbar: FC<KbarToolbarProps> = ({
	chart,
	setChartSeries,
	kbarPeriodFrequency,
	setKbarPeriodFrequency,
}) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '10px 10px 20px 10px',
				marginBottom: '10px',
				gap: '20px',
				borderBottom: `1px solid ${theme.palette.boreder.main}`,
			}}
		>
			<KbarIndicatorsSelectsContainer chart={chart} setChartSeries={setChartSeries} />
			<KbarFrequencyButtonsCcontainer
				kbarPeriodFrequency={kbarPeriodFrequency}
				setKbarPeriodFrequency={setKbarPeriodFrequency}
			/>
		</Box>
	);
};

export default KbarToolbar;
