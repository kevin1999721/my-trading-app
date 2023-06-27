import { FC } from 'react';
import { Chart } from 'highcharts/highstock';
import { ChartSeries } from '../kbar/kbar.component';
import { IndicatorsInfoKeys } from '../../utils/highcharts/highcharts.util';

import { Box, Typography } from '@mui/material';
import KbarIndicatorsSelect from '../kbar-indicators-select/kbar-indicators-select.component';

export enum SelectType {
	overlay = 'overlay',
	sub = 'sub',
}

type KbarIndicatorsSelectsContainerProps = {
	setChartSeries: React.Dispatch<React.SetStateAction<ChartSeries>>;
	chart: Chart;
};

const KbarIndicatorsSelectsContainer: FC<KbarIndicatorsSelectsContainerProps> = ({
	setChartSeries,
	chart,
}) => {
	const defaultOverlayIndicators: (IndicatorsInfoKeys | '')[] = [IndicatorsInfoKeys.sma];
	const defaultSubIndicators: (IndicatorsInfoKeys | '')[] = [
		IndicatorsInfoKeys.volumn,
		IndicatorsInfoKeys.stochastic,
		'',
	];

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					margin: '0 0 10px 0',
				}}
			>
				<Typography
					variant="subtitle1"
					sx={{
						marginRight: '10px',
						flexShrink: 0,
					}}
				>
					主圖 :
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}
				>
					{defaultOverlayIndicators.map((IndicatorsInfoKeys, index) => {
						return (
							<KbarIndicatorsSelect
								key={SelectType.overlay + index}
								chart={chart}
								setChartSeries={setChartSeries}
								type={SelectType.overlay}
								index={index}
								defalutIndicatorsInfoKey={IndicatorsInfoKeys}
							></KbarIndicatorsSelect>
						);
					})}
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
				}}
			>
				<Typography
					variant="subtitle1"
					sx={{
						marginRight: '10px',
						flexShrink: 0,
					}}
				>
					副圖 :
				</Typography>
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						flexWrap: 'wrap',
						overflow: 'auto',
					}}
				>
					{defaultSubIndicators.map((IndicatorsInfoKeys, index) => {
						return (
							<KbarIndicatorsSelect
								key={SelectType.sub + index}
								chart={chart}
								setChartSeries={setChartSeries}
								type={SelectType.sub}
								index={index}
								defalutIndicatorsInfoKey={IndicatorsInfoKeys}
							></KbarIndicatorsSelect>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default KbarIndicatorsSelectsContainer;
