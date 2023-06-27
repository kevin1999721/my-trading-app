import { FC, useState, useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { MajorsTrend } from '../../gql/graphql';

import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import Highcharts from 'highcharts/highcharts';

import { Box } from '@mui/material';

HighchartsAccessibility(Highcharts);

type StockMajorChartProps = {
	majorsTrends: MajorsTrend[];
};

const defaultOptions: Highcharts.Options = {
	chart: {
		spacing: [30, 10, 20, 10],
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
	credits: {
		enabled: false,
	},
	legend: {
		enabled: false,
	},
	plotOptions: {
		series: {
			dataGrouping: {
				enabled: false,
			},
		},
	},
};

const convertMajorsTrendsToColumnData = (majorsTrends: MajorsTrend[]) => {
	return majorsTrends.map(majorsTrend => {
		const majorsBuyRankDiffSum = majorsTrend.majorsBuyRank.reduce((pre, cur) => {
			return pre + cur.diff;
		}, 0);

		const majorsSellRankDiffSum = majorsTrend.majorsSellRank.reduce((pre, cur) => {
			return pre + cur.diff;
		}, 0);

		return [majorsTrend.endDate as string, majorsBuyRankDiffSum - majorsSellRankDiffSum];
	});
};

const StockMajorChart: FC<StockMajorChartProps> = ({ majorsTrends }) => {
	const { palette } = useTheme();
	const [options, setOptions] = useState<Highcharts.Options>(defaultOptions);
	const majorsTrendsDiffData = useMemo<(string | number)[][]>(() => {
		return convertMajorsTrendsToColumnData(majorsTrends);
	}, [majorsTrends]);

	useEffect(() => {
		if (majorsTrendsDiffData.length > 0) {
			setOptions({
				yAxis: [
					{
						title: {
							text: '',
						},
					},
				],
				xAxis: {
					tickInterval: 5,
					categories: majorsTrendsDiffData.map(data => data[0] as string),
					tickWidth: 1,
				},
				series: [
					{
						name: '買賣超',
						type: 'column',
						data: majorsTrendsDiffData,
						color: palette.red.main,
						negativeColor: palette.green.main,
					},
				],
			});
		}
	}, [majorsTrendsDiffData]);

	return (
		<Box>
			<HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />
		</Box>
	);
};

export default StockMajorChart;
