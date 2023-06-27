import { useState, useEffect, useRef, FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectStockRealtime } from '../../store/stock/stock.select';
import { Kbar as KbarType } from '../../gql/graphql';
import { localStringOptions } from '../../utils/date/date.utils';

import { Box, useTheme, Typography } from '@mui/material';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import highchartsMore from 'highcharts/highcharts-more';
import highchartAccessibility from 'highcharts/modules/accessibility';
import { extendingHighcharts } from '../../utils/highcharts/extending-highcharts.util';

highchartsMore(Highcharts);
highchartAccessibility(Highcharts);
extendingHighcharts(Highcharts);

const defaultChartOptions: Highcharts.Options = {
	chart: {
		spacing: [0, 10, 10, 10],
		height: 550,
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
	credits: {
		enabled: false,
	},
	rangeSelector: {
		enabled: false,
	},
	navigator: {
		enabled: false,
	},
	stockTools: {
		gui: {
			enabled: false,
		},
	},
	scrollbar: {
		enabled: false,
	},
	plotOptions: {
		series: {
			showInLegend: false,
			dataGrouping: {
				enabled: false,
			},
			enableMouseTracking: false,
		},
		areaspline: {
			enableMouseTracking: true,
		},
	},
};

const convertKbarsDataToArray = (kbars: KbarType[]) => {
	const chartData = kbars.map(kbar => {
		return [kbar.timestamp, kbar.close];
	});
	return chartData;
};

const covertKbarsVolumeToArray = (kbars: KbarType[]) => {
	const volumeData = kbars.map(kbar => {
		return [kbar.timestamp, kbar.volume];
	});
	return volumeData;
};

type StockRealtimeTooltips = {
	key: string;
	name: string;
	value: string;
	nameStyle: React.CSSProperties;
	valueStyle: React.CSSProperties;
};

type StockRealtimeInfo = {
	key: string;
	name: string;
	value: number;
};

type StockRealtimeChartProps = {
	isShowRealtimeInfo?: Boolean;
	productType?: 'stock' | 'future';
};

const StockRealtimeChart: FC<StockRealtimeChartProps> = ({
	isShowRealtimeInfo = false,
	productType = 'stock',
}) => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
	const [isMouseOverChart, setIsMouseOverChart] = useState<boolean>(false);
	const [chartOptions, setChartOptions] = useState(defaultChartOptions);
	const [stockRealtimeInfo, setStockRealtimeInfo] = useState<StockRealtimeInfo[]>([]);
	const [stockRealtimeTooltips, setStockRealtimeTooltips] = useState<StockRealtimeTooltips[]>([]);
	const stockRealtime = useAppSelector(selectStockRealtime);

	const theme = useTheme();
	const { palette } = theme;

	useEffect(() => {
		if (stockRealtime && chartComponentRef.current) {
			const chart = chartComponentRef.current.chart;
			const areaspline = chart.get('areaspline') as Highcharts.Series | undefined;
			const volume = chart.get('volume') as Highcharts.Series | undefined;

			if (areaspline && volume) {
				const kbars = stockRealtime.kbars;
				const kbarsLength = kbars.length;
				const pointsLength = areaspline.points.length;
				if (kbarsLength !== pointsLength) {
					areaspline.points[pointsLength - 1].update(kbars[kbarsLength - 2].close);
					areaspline.addPoint(
						[kbars[kbarsLength - 1].timestamp, kbars[kbarsLength - 1].close],
						true,
						false
					);
					volume.points[pointsLength - 1].update(kbars[kbarsLength - 2].volume);
					volume.addPoint(
						[kbars[kbarsLength - 1].timestamp, kbars[kbarsLength - 1].volume],
						true,
						false
					);
				} else {
					areaspline.points[pointsLength - 1].update(kbars[kbarsLength - 1].close);
					volume.points[pointsLength - 1].update(kbars[kbarsLength - 1].volume);
				}
			} else {
				const kbarsData = convertKbarsDataToArray(stockRealtime.kbars);
				const kbarsVolumeData = covertKbarsVolumeToArray(stockRealtime.kbars);
				setChartOptions({
					tooltip: {
						formatter: function () {
							const stockRealtimeTooltip = this.points
								?.map((point): StockRealtimeTooltips | null => {
									const pointSeriesId = point.series.userOptions.id || null;

									if (pointSeriesId && typeof point.y === 'number') {
										if (pointSeriesId === 'areaspline') {
											const changePrice =
												Math.round((point.y - stockRealtime.info.reference) * 100) / 100;
											const changeRate =
												Math.round((changePrice / stockRealtime.info.reference) * 10000) / 100;

											return {
												key: pointSeriesId,
												name: '價',
												value: `${point.y.toFixed(2)} ${changePrice.toFixed(
													2
												)} (${changeRate.toFixed(2)}%)`,
												nameStyle: { fontWeight: 600, marginRight: '5px' },
												valueStyle: {
													color:
														changePrice > 0
															? palette.red.main
															: changePrice < 0
															? palette.green.main
															: '',
												},
											};
										} else if (pointSeriesId === 'volume') {
											return {
												key: pointSeriesId,
												name: '量',
												value: `${point.y}`,
												nameStyle: { fontWeight: 600, marginRight: '5px' },
												valueStyle: {
													color: palette.primary.light,
												},
											};
										} else return null;
									} else {
										return null;
									}
								})
								.filter((tooltip): tooltip is StockRealtimeTooltips => Boolean(tooltip));

							setStockRealtimeTooltips(stockRealtimeTooltip || []);

							return [];
						},
					},
					xAxis: [
						{
							max:
								(stockRealtime.info.category === 'TXF'
									? new Date(stockRealtime.info.updateDate).setHours(13, 45, 0)
									: new Date(stockRealtime.info.updateDate).setHours(13, 30, 0)) -
								new Date().getTimezoneOffset() * 60000,
							ordinal: false,
							crosshair: {
								label: {
									enabled: true,
									formatter: function (this, value) {
										return new Date(value - 8 * 3600 * 1000).toLocaleString(
											'zh-TW',
											localStringOptions
										);
									},
								},
							},
						},
					],
					yAxis: [
						{
							top: isShowRealtimeInfo ? 100 : 50,
							height: 300,
							opposite: false,
							showLastLabel: true,
							labels: {
								align: 'right',
								y: 3,
								formatter: function () {
									return (this.value as number).toFixed(2);
								},
							},
							crosshair: {
								label: {
									enabled: true,
									formatter: function (this, value) {
										return value.toFixed(2);
									},
								},
							},
							tickPositioner: function () {
								let positions = [];
								positions.push(stockRealtime.info.limitDown);
								positions.push((stockRealtime.info.limitDown + stockRealtime.info.reference) / 2);
								positions.push(stockRealtime.info.reference);
								positions.push((stockRealtime.info.reference + stockRealtime.info.limitUp) / 2);
								positions.push(stockRealtime.info.limitUp);

								return positions;
							},
						},
						{
							top: 300 + (isShowRealtimeInfo ? 100 : 50),
							height: 100,
							labels: {
								enabled: false,
							},
						},
					],
					series: [
						{
							type: 'areaspline',
							id: 'areaspline',
							data: kbarsData,
							threshold: stockRealtime.info.reference,
							zones: [
								{
									value: stockRealtime.info.reference,
									color: palette.green.main,
									fillColor: palette.green.main + 'a1',
								},
								{
									value: stockRealtime.info.limitUp,
									color: palette.red.main,
									fillColor: palette.red.main + 'a1',
								},
							],
							events: {
								mouseOver: () => {
									setIsMouseOverChart(true);
								},
								mouseOut: () => {
									setIsMouseOverChart(false);
								},
							},
						},
						{
							type: 'column',
							id: 'volume',
							linkedTo: 'areaspline',
							data: kbarsVolumeData,
							yAxis: 1,
							color: palette.primary.main + '77',
						},
					],
				});
			}
		}
	}, [stockRealtime, theme]);

	useEffect(() => {
		if (stockRealtime) {
			const { open, high, low, close, volume } = stockRealtime;

			const stockRealtimeInfo: StockRealtimeInfo[] = [
				{
					key: 'open',
					name: '開',
					value: open,
				},
				{
					key: 'high',
					name: '高',
					value: high,
				},
				{
					key: 'low',
					name: '低',
					value: low,
				},
				{
					key: 'close',
					name: '收',
					value: close,
				},
				{
					key: 'volume',
					name: '總量',
					value: volume,
				},
			];

			setStockRealtimeInfo(stockRealtimeInfo);
		}
	}, [stockRealtime]);

	useEffect(() => {
		if (stockRealtime && chartComponentRef.current && !isMouseOverChart) {
			const chart = chartComponentRef.current.chart;
			const areaspline = chart.get('areaspline') as Highcharts.Series | undefined;
			setTimeout(() => {
				if (chart.series && chart.series.length > 0) {
					const points: Highcharts.Point[] = chart.series
						.map((series: Highcharts.Series) => {
							if (series && series.visible && series.points.length > 0) {
								return series.points && series.points[series.points.length - 1];
							} else {
								return null;
							}
						})
						.filter((point): point is Highcharts.Point => Boolean(point));
					chart.tooltip.refresh(points);
					if (areaspline) {
						areaspline.points[areaspline.points.length - 1].setState('');
						areaspline.points[areaspline.points.length - 1].setState('hover');
					}
				}
			}, 200);
		}
	}, [stockRealtime, isMouseOverChart]);

	return (
		<Box
			sx={{
				// width: '100%',
				position: 'relative',
			}}
		>
			{chartOptions && (
				<HighchartsReact
					highcharts={Highcharts}
					constructorType={'stockChart'}
					options={chartOptions}
					ref={chartComponentRef}
				/>
			)}
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					flexDirection: 'column',
					position: 'absolute',
					top: 0,
					left: 10,
				}}
			>
				{isShowRealtimeInfo && stockRealtimeInfo && (
					<Box
						sx={{
							display: 'flex',
							gap: '10px',
							letterSpacing: '0.5px',
							overflow: 'hidden',
						}}
					>
						{stockRealtimeInfo.map(info => {
							const { key, name, value } = info;

							return (
								<Typography
									sx={{
										display: 'flex',
										gap: '5px',
										lineHeight: '30px',
										whiteSpace: 'nowrap',
									}}
									key={key}
								>
									<Typography component={'span'} fontWeight={600}>
										{name}
									</Typography>
									<Typography component={'span'}>
										{info.key === 'volume' ? value : value.toFixed(2)}
									</Typography>
								</Typography>
							);
						})}
					</Box>
				)}
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						letterSpacing: '0.5px',
					}}
				>
					{stockRealtimeTooltips.map(tooltip => {
						return (
							<Typography
								key={tooltip.key}
								sx={{
									lineHeight: '30px',
								}}
							>
								<span style={tooltip.nameStyle}>{tooltip.name}</span>
								<span style={tooltip.valueStyle}>{tooltip.value}</span>
							</Typography>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default StockRealtimeChart;
