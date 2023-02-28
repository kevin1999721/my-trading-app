import { useState, useEffect, useRef, FC } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_KBARS } from '../../utils/graphql/query';
import { Kbar as KbarType } from '../../gql/graphql';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import indicators from 'highcharts/indicators/indicators-all';
import accessibility from 'highcharts/modules/accessibility';
import { customHighcharts } from '../../utils/highcharts/highcharts';
import './kbar.style.css';

indicators(Highcharts);
accessibility(Highcharts);
customHighcharts(Highcharts);

console.log(Highcharts.Pointer.prototype);

type PlotBox = {
	rotation: number;
	rotationOriginX: number;
	rotationOriginY: number;
	scaleX: number;
	scaleY: number;
	translateX: number;
	translateY: number;
};

const defaultOptions: Highcharts.Options = {
	credits: {
		enabled: false,
	},
	chart: {
		styledMode: false,
		height: 800,
		spacing: [0, 0, 0, 0],
		style: {
			fontFamily: [
				'"Noto Sans TC"',
				'sans-serif',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
		},
	},
	title: {
		text: 'AAPL stock price by minute',
		floating: true,
		useHTML: true,
	},
	rangeSelector: {
		floating: true,
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
			top: 35,
			height: 200,
			crosshair: {
				label: {
					enabled: true,
				},
			},
		},
		{
			top: 270,
			height: 100,
		},
		{
			top: 405,
			height: 100,
		},
	],
	legend: {
		enabled: true,
		align: 'left',
		layout: 'horizontal',
		floating: true,
	},
	plotOptions: {
		series: {
			// point: {
			// 	events: {
			// 		mouseOver: function () {
			// 			console.log(this);
			// 		},
			// 	},
			// },

			showInLegend: false,
			marker: {
				enabled: false,
				states: {
					hover: {
						enabled: false,
					},
					select: {
						enabled: false,
					},
				},
			},
		},
		sma: {
			showCheckbox: true,
			showInLegend: true,
			enableMouseTracking: false,
		},
	},
	tooltip: {
		valueDecimals: 2,
		shape: 'square',
		headerShape: 'callout',
		borderWidth: 0,
		useHTML: true,
		hideDelay: 0,
		padding: 0,
		shadow: false,
		backgroundColor: '',
		borderColor: '',
		style: {
			fontSize: '',
		},
		formatter: function () {
			console.log(this.points);
			return [];
			// return [`<b>${new Date(this.x as number)}</b>`].concat(
			// 	this.points
			// 		? this.points.map(function (point) {
			// 				// console.log(point);
			// 				return `<b>${point.series.name}</b> : ${point.y}`;
			// 		  })
			// 		: []
			// );
		},
		positioner: function (width, height, point) {
			let chart = this.chart;
			let position;

			if (point.isHeader) {
				position = {
					x: Math.max(
						0,
						Math.min(
							point.plotX - chart.plotLeft - width / 2,
							chart.plotLeft + chart.plotWidth - width
						)
					),
					y: point.plotY,
				};
			} else {
				let plotBox = point.series.getPlotBox() as unknown as PlotBox;
				position = {
					x: chart.plotLeft,
					y: plotBox.translateY - chart.plotTop - 35,
				};
			}
			return position;
		},
	},
	series: [
		{
			type: 'candlestick',
			name: 'AAPL Stock Price',
			dataGrouping: {
				enabled: false,
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
	startDate: string;
	endDate: string;
};

const Kbar: FC<KbarProps> = ({ code, startDate, endDate }) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
	console.log(chartComponentRef.current);
	const [options, setOptions] = useState<Highcharts.Options>(defaultOptions);
	const { loading, error, data } = useQuery(QUERY_KBARS, {
		variables: { code: code, startDate: startDate, endDate: endDate },
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
						zIndex: 0,
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
					},
					{
						type: 'sma',
						linkedTo: 'candlestick',
						zIndex: 2,
						params: {
							period: 20,
						},
					},
					{
						type: 'sma',
						linkedTo: 'candlestick',
						zIndex: 3,
						params: {
							period: 60,
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
						name: 'stochastic',
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
