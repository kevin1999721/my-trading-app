import { useState, useEffect, useRef, FC } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_KBARS } from '../../gql/query';
import { Kbar as KbarType } from '../../gql/graphql';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import indicators from 'highcharts/indicators/indicators-all';
import accessibility from 'highcharts/modules/accessibility';
import { customStochastic } from '../../utils/highcharts/highcharts';

indicators(Highcharts);
accessibility(Highcharts);
customStochastic(Highcharts);

const defaultOptions: Highcharts.Options = {
	chart: {
		height: 600,
	},
	title: {
		text: 'AAPL stock price by minute',
	},
	rangeSelector: {
		buttons: [
			{
				type: 'hour',
				count: 1,
				text: '1h',
			},
			{
				type: 'day',
				count: 1,
				text: '1D',
			},
			{
				type: 'all',
				count: 1,
				text: 'All',
			},
		],
		selected: 1,
	},
	yAxis: [
		{
			height: '60%',
		},
		{
			top: '60%',
			height: '20%',
		},
		{
			top: '80%',
			height: '20%',
		},
	],
	plotOptions: {
		series: {
			showInLegend: true,
			accessibility: {
				exposeAsGroupOnly: true,
			},
		},
	},
	series: [
		{
			type: 'candlestick',
			name: 'AAPL Stock Price',
			dataGrouping: {
				enabled: false,
			},
			tooltip: {
				valueDecimals: 2,
			},
		},
	],
};

const convertKbarsDataToArray = (kbars: KbarType[]) => {
	const chartData = kbars.map(kbar => {
		return [kbar.timestamp, kbar.open, kbar.high, kbar.low, kbar.close];
	});
	return chartData;
};

const covertKbarsVolumeToArray = (kbars: KbarType[]) => {
	const volumeData = kbars.map(kbar => {
		return [kbar.timestamp, kbar.volume];
	});
	return volumeData;
};

type KbarProps = {
	code: string;
};

const Kbar: FC<KbarProps> = ({ code }) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
	const [options, setOptions] = useState<Highcharts.Options>(defaultOptions);
	const { loading, error, data } = useQuery(QUERY_KBARS, {
		variables: { code: code, startDate: '2023-01-09', endDate: '2023-01-17' },
	});
	console.log(loading, error);

	useEffect(() => {
		if (data && data.kbars) {
			const chartData = convertKbarsDataToArray(data.kbars);
			const volumeData = covertKbarsVolumeToArray(data.kbars);
			console.log(volumeData);
			setOptions({
				series: [
					{
						type: 'candlestick',
						name: 'AAPL Stock Price',
						id: 'candlestick',
						data: chartData,
						dataGrouping: {
							enabled: false,
						},
						tooltip: {
							valueDecimals: 2,
						},
					},
					{
						type: 'sma',
						linkedTo: 'candlestick',
						zIndex: 1,
						params: {
							period: 5,
						},
						marker: {
							enabled: false,
						},
					},
					{
						type: 'sma',
						linkedTo: 'candlestick',
						zIndex: 2,
						params: {
							period: 20,
						},
						marker: {
							enabled: false,
						},
					},
					{
						type: 'sma',
						linkedTo: 'candlestick',
						zIndex: 3,
						params: {
							period: 60,
						},
						marker: {
							enabled: false,
						},
					},
					{
						type: 'column',
						id: 'volume',
						name: 'Volume',
						data: volumeData,
						yAxis: 1,
					},
					{
						type: 'stochastic',
						linkedTo: 'candlestick',
						id: 'kd',
						params: {
							periods: [9, 3],
						},
						yAxis: 2,
					},
				],
			});
		}
	}, [data]);

	return (
		<div>
			{options && (
				<HighchartsReact
					highcharts={Highcharts}
					constructorType={'stockChart'}
					options={options}
					ref={chartComponentRef}
				/>
			)}
		</div>
	);
};

export default Kbar;
