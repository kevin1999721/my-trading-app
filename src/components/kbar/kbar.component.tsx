import { useState, useEffect, useRef, useMemo, FC } from 'react';
import { useQuery } from '@apollo/client';
import { useTheme } from '@mui/material';
import { QUERY_KBARS } from '../../utils/graphql/query.util';
import { Kbar as KbarType, KbarsArgs } from '../../gql/graphql';
import { localStringOptions } from '../../utils/date/date.utils';
import {
	IndicatorsInfoKeys,
	IndicatorsInfo,
	IndicatorsColors,
	KbarFrequency,
} from '../../utils/highcharts/highcharts.util';
import { sxDashboard } from '../../utils/theme/theme.util';

import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Chart } from 'highcharts/highstock';
import highchartsStockTools from 'highcharts/modules/stock-tools';
import highchartsAnnotations from 'highcharts/modules/annotations-advanced';
import highchartsDragPanes from 'highcharts/modules/drag-panes';
import highchartIndicators from 'highcharts/indicators/indicators-all';
import highchartAccessibility from 'highcharts/modules/accessibility';
import { extendingHighcharts } from '../../utils/highcharts/extending-highcharts.util';
import { TooltipFormatterContextObject } from 'highcharts/highstock';

import { Box, Typography } from '@mui/material';

import KbarToolbar from '../kbar-toolbar/kbar-toolbar.component';
import KbarTooltips from '../kbar-tooltips/kbar-tooltips.component';
import Progress from '../progress/progress.component';

highchartsStockTools(Highcharts);
highchartsAnnotations(Highcharts);
highchartsDragPanes(Highcharts);
highchartIndicators(Highcharts);
highchartAccessibility(Highcharts);
extendingHighcharts(Highcharts);

export const chartPlotSetting = {
	main: {
		height: 200,
	},
	sub: {
		height: 100,
	},
	tooltip: {
		height: 35,
	},
};

export const indicatorsInfo: IndicatorsInfo = {
	candlestick: {
		seriesType: 'candlestick',
		name: '',
		option: {
			open: { description: '開', color: '' },
			high: { description: '高', color: '' },
			low: { description: '低', color: '' },
			close: { description: '收', color: '' },
		},
		y: '收',
		isOverlay: false,
		isShowInSelect: false,
		isOptionDescBold: true,
	},
	volumn: {
		seriesType: 'column',
		name: '成交量',
		option: {
			y: { description: '量', color: '#4fc3f7' },
		},
		y: '量',
		isOverlay: false,
		isShowInSelect: true,
	},
	sma: {
		seriesType: 'sma',
		name: '均線',
		option: {
			y: {
				description: 'MA',
				color: ['#fdd835', '#ab47bc', '#64b5f6', '#aed581', '#0d47a1', '#f06292'],
			},
		},
		y: 'MA',
		isOverlay: true,
		isShowInSelect: true,
	},
	bb: {
		seriesType: 'bb',
		name: '布林通道',
		option: {
			top: { description: '上', color: '#fdd835' },
			middle: { description: '中', color: '#64b5f6' },
			bottom: { description: '下', color: '#ab47bc' },
		},
		y: '中',
		isOverlay: true,
		isShowInSelect: true,
	},
	stochastic: {
		seriesType: 'stochastic',
		name: 'KD指標',
		option: {
			y: { description: 'K9', color: '#fdd835' },
			smoothed: { description: 'D9', color: '#7e57c2' },
		},
		y: 'K9',
		isOverlay: false,
		isShowInSelect: true,
	},
	macd: {
		seriesType: 'macd',
		name: 'MACD',
		option: {
			MACD: { description: 'DIF', color: '#fdd835' },
			signal: { description: 'MACD', color: '#7e57c2' },
			y: { description: 'DIF - MACD', color: '#4fc3f7' },
		},
		y: 'DIF - MACD',
		isOverlay: false,
		isShowInSelect: true,
	},
};

export const indicatorsColors: IndicatorsColors = {
	candlestick: {
		color: '',
	},
	macd: {
		color: indicatorsInfo.macd.option.y.color,
		macdLine: {
			styles: {
				lineColor: indicatorsInfo.macd.option.MACD.color,
			},
		},
		signalLine: {
			styles: {
				lineColor: indicatorsInfo.macd.option.signal.color,
			},
		},
	},
	stochastic: {
		color: indicatorsInfo.stochastic.option.y.color,
		smoothedLine: {
			styles: {
				lineColor: indicatorsInfo.stochastic.option.smoothed.color,
			},
		},
	},
	volumn: {
		color: indicatorsInfo.volumn.option.y.color,
	},
	sma: {
		color: indicatorsInfo.sma.option.y.color,
	},
	bb: {
		color: indicatorsInfo.bb.option.middle.color,
		topLine: {
			styles: {
				lineColor: indicatorsInfo.bb.option.top.color,
			},
		},
		bottomLine: {
			styles: {
				lineColor: indicatorsInfo.bb.option.bottom.color,
			},
		},
	},
};

const defaultOptions: Highcharts.Options = {
	credits: {
		enabled: false,
	},
	chart: {
		height: 800,
		spacing: [0, 10, 10, 10],
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
				// manual trigger resize event to reflow chart
				window.dispatchEvent(new Event('resize'));
			},
		},
	},
	stockTools: {
		gui: {
			enabled: false,
		},
	},
	rangeSelector: {
		enabled: false,
	},
	navigator: {
		series: {
			id: 'navigator',
		},
	},
	scrollbar: {
		liveRedraw: true,
	},
	plotOptions: {
		series: {
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
			dataGrouping: {
				enabled: false,
			},
			enableMouseTracking: false,
		},
		candlestick: {
			enableMouseTracking: true,
		},
	},
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

export type ChartSeries = {
	main: Highcharts.CustomSeriesOptionsType;
	sub: { index: number; series: Highcharts.CustomSeriesOptionsType }[];
	overlay: { index: number; series: Highcharts.CustomSeriesOptionsType }[];
};

export type KbarPeriodFrequency = {
	period: number;
	frequency: KbarFrequency;
};

type KbarProps = {
	kbarsArgs: KbarsArgs & { frequency: KbarFrequency };
	title?: string;
	flags?: Highcharts.SeriesFlagsOptions;
};

const Kbar: FC<KbarProps> = ({ kbarsArgs, title = '', flags }) => {
	const [kbarPeriodFrequency, setKbarPeriodFrequency] = useState<KbarPeriodFrequency>({
		period: kbarsArgs?.period ? kbarsArgs.period : 1,
		frequency: kbarsArgs?.frequency ? kbarsArgs.frequency : KbarFrequency.D,
	});
	const { loading, error, data } = useQuery(QUERY_KBARS, {
		fetchPolicy: 'no-cache',
		variables: {
			kbarsArgs: {
				code: kbarsArgs.code,
				startDate: kbarsArgs.startDate,
				endDate: kbarsArgs.endDate,
				period: kbarPeriodFrequency.period,
				frequency: kbarPeriodFrequency.frequency,
				requiredPreTradeDays: kbarsArgs.requiredPreTradeDays,
			},
		},
	});
	const theme = useTheme();
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
	const [tooltipObject, setTooltipObject] = useState<TooltipFormatterContextObject | null>(null);
	const [options, setOptions] = useState<Highcharts.Options>(defaultOptions);
	const [kbarsData, setKbarsData] = useState<number[][] | null>(null);
	const [volumeData, setVolumeData] = useState<number[][] | null>(null);
	const [chartSeries, setChartSeries] = useState<ChartSeries>({
		main: {
			type: indicatorsInfo.candlestick.seriesType,
			id: indicatorsInfo.candlestick.seriesType,
			name: indicatorsInfo.candlestick.seriesType,
			indicatorsInfoKey: IndicatorsInfoKeys.candlestick,
			zIndex: 0,
			yAxis: 0,
			custom: {
				tooltipWrap: true,
			},
		},
		sub: [],
		overlay: [],
	});

	useEffect(() => {
		if (!loading && data?.kbars) {
			const kbarsData = convertKbarsDataToArray(data.kbars);
			const volumeData = covertKbarsVolumeToArray(data.kbars);
			setKbarsData(kbarsData);
			setVolumeData(volumeData);
		}
	}, [data?.kbars]);

	useEffect(() => {
		if (kbarsData) {
			const { palette } = theme;

			const mainSeries: Highcharts.CustomSeriesOptionsType = {
				...chartSeries.main,
				data: kbarsData as any,
				yAxis: 0 as any,
			};

			const subSeries: Highcharts.CustomSeriesOptionsType[] = chartSeries.sub.map((sub, index) => {
				const series = sub.series;

				return {
					...series,
					data: (series.indicatorsInfoKey === 'volumn' ? volumeData : undefined) as any,
					yAxis: (index + 1) as any,
				};
			});

			const overlaySeries: Highcharts.CustomSeriesOptionsType[] = chartSeries.overlay.map(
				(overlay, index) => {
					const series = overlay.series;
					const linkToSeriesId = 'linkedTo' in series && (series.linkedTo as string);
					const linkToSeriesYAxis =
						mainSeries.id === linkToSeriesId
							? mainSeries.yAxis
							: (subSeries.find(series => series.id === linkToSeriesId)?.yAxis as number);

					return {
						...series,
						data: (series.name === 'volumn' ? volumeData : undefined) as any,
						yAxis: linkToSeriesYAxis as any,
					};
				}
			);

			const mainPlotTop =
				mainSeries.custom && mainSeries.custom.tooltipWrap
					? chartPlotSetting.tooltip.height * 2
					: chartPlotSetting.tooltip.height;
			const mainPlotHeight = chartPlotSetting.main.height;

			const xAxis: Highcharts.XAxisOptions[] = [
				{
					id: 'xAxis-1',
					crosshair: {
						label: {
							enabled: true,
							formatter: function (this, value) {
								return new Date(value - 8 * 3600 * 1000).toLocaleString(
									'zh-TW',
									localStringOptions
								);
							},
							backgroundColor: palette.primary.light,
						},
					},
					minRange: 1 * 24 * 3600 * 1000,
				},
			];

			const yAxis: Highcharts.CustomYAxisOptions[] = [
				{
					top: mainPlotTop,
					height: mainPlotHeight,
					crosshair: {
						label: {
							enabled: true,
							formatter: function (this, value) {
								return value.toFixed(2);
							},
							backgroundColor: palette.primary.light,
						},
					},
					labels: {
						align: 'left',
					},
					isTooltipWrap: true,
				},
				...subSeries.map((series, index) => {
					return {
						top:
							mainPlotTop +
							mainPlotHeight +
							index * (chartPlotSetting.tooltip.height + chartPlotSetting.sub.height) +
							chartPlotSetting.tooltip.height,
						height: chartPlotSetting.sub.height,
					};
				}),
			];

			setOptions({
				plotOptions: {
					candlestick: {
						color: palette.green.main,
						lineColor: palette.green.main,
						upColor: palette.red.main,
						upLineColor: palette.red.main,
					},
				},
				xAxis: xAxis,
				yAxis: yAxis,
				series: [mainSeries, ...subSeries, ...overlaySeries, flags].filter(series =>
					Boolean(series)
				) as Highcharts.SeriesOptionsType[],
				tooltip: {
					formatter: function () {
						setTooltipObject(this);
						return [];
					},
				},
			});
		}
	}, [kbarsData, volumeData, chartSeries, theme, flags]);

	useEffect(() => {
		if (kbarsData && chartComponentRef.current) {
			const chart = chartComponentRef.current.chart;
			let daysToDiff = 1;

			if (kbarPeriodFrequency.frequency === KbarFrequency.T) {
				daysToDiff = 2;
			} else if (kbarPeriodFrequency.frequency === KbarFrequency.D) {
				daysToDiff = 90;
			} else if (kbarPeriodFrequency.frequency === KbarFrequency.W) {
				daysToDiff = 120;
			} else if (kbarPeriodFrequency.frequency === KbarFrequency.M) {
				daysToDiff = 365;
			}

			const navigator = chart.get('navigator') as Highcharts.Series | undefined;
			if (navigator) navigator.setData(kbarsData);

			chart.xAxis[0].setExtremes(
				kbarsData[kbarsData.length - 1][0] - daysToDiff * 24 * 3600 * 1000,
				kbarsData[kbarsData.length - 1][0]
			);
			setTimeout(() => {
				// manual set the last point as tooltip
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
				}
			}, 500);
		}
	}, [kbarsData]);

	useEffect(() => {
		if (chartComponentRef.current) {
			const chart = chartComponentRef.current.chart;
			setTimeout(() => {
				// manual set the last point as tooltip
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
				}
			}, 200);
		}
	}, [chartSeries]);

	return (
		<Box id="kbar" sx={{ width: '100%', ...sxDashboard }}>
			{title && (
				<Typography variant="h5" align="center" sx={{ margin: '10px 0 20px 0' }}>
					{title}
				</Typography>
			)}
			{chartComponentRef.current?.chart && (
				<KbarToolbar
					chart={chartComponentRef.current.chart}
					setChartSeries={setChartSeries}
					kbarPeriodFrequency={kbarPeriodFrequency}
					setKbarPeriodFrequency={setKbarPeriodFrequency}
				></KbarToolbar>
			)}
			<Box sx={{ position: 'relative', width: '100%' }}>
				{loading && <Progress isPositionAbsolute={true} />}
				{options && (
					<HighchartsReact
						highcharts={Highcharts}
						constructorType={'stockChart'}
						options={options}
						ref={chartComponentRef}
					/>
				)}
				{chartComponentRef.current?.chart && tooltipObject && (
					<KbarTooltips chart={chartComponentRef.current.chart} tooltipObject={tooltipObject} />
				)}
			</Box>
		</Box>
	);
};

export default Kbar;
