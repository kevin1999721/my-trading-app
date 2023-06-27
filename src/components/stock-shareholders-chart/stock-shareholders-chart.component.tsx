import { FC, useState, useEffect } from 'react';
import { Shareholders } from '../../gql/graphql';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

import { Box } from '@mui/material';

HighchartsAccessibility(Highcharts);

const defaultOptions: Highcharts.Options = {
	credits: {
		enabled: false,
	},
	chart: {
		height: 400,
		spacing: [20, 0, 0, 0],
		backgroundColor: 'transparent',
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
		events: {
			render: function () {
				window.dispatchEvent(new Event('resize'));
			},
		},
	},
	title: {
		text: '',
	},
	navigator: {
		enabled: false,
	},
	plotOptions: {
		series: {
			dataGrouping: {
				enabled: false,
			},
		},
	},
	tooltip: {
		shared: true,
	},
};

type StockShareHoldersChartProps = {
	shareholdersList: Shareholders[];
};

const StockShareHoldersChart: FC<StockShareHoldersChartProps> = ({ shareholdersList }) => {
	const [options, setOptions] = useState<Highcharts.Options>(defaultOptions);

	useEffect(() => {
		const displayDataCount = 50;

		setOptions({
			xAxis: [
				{
					categories: shareholdersList
						.slice(0, displayDataCount)
						.reverse()
						.map(shareholders => shareholders.date),
				},
			],
			yAxis: [
				{
					title: {
						text: '總股東人數',
					},
				},
				{
					title: {
						text: '大股東持有比',
					},
					labels: {
						format: '{value}%',
					},
					opposite: true,
				},
			],
			series: [
				{
					type: 'column',
					data: shareholdersList
						.slice(0, displayDataCount)
						.reverse()
						.map(shareholders => shareholders.totalShareholders),
					name: '總股東人數',
				},
				{
					type: 'spline',
					data: shareholdersList
						.slice(0, displayDataCount)
						.reverse()
						.map(shareholders => shareholders.moreThanFourHundredPercent),
					name: '>400張持有比',
					tooltip: {
						valueSuffix: ' %',
					},
					yAxis: 1,
				},
				{
					type: 'spline',
					data: shareholdersList
						.slice(0, displayDataCount)
						.reverse()
						.map(shareholders => shareholders.moreThanOneThousandPercent),
					name: '>1000張持有比',
					yAxis: 1,
					tooltip: {
						valueSuffix: ' %',
					},
				},
			],
		});
	}, [shareholdersList]);

	return (
		<Box>
			<HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />
		</Box>
	);
};

export default StockShareHoldersChart;
