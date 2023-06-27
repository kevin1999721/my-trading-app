import { FC } from 'react';
import { Chart, TooltipFormatterContextObject } from 'highcharts/highstock';
import { indicatorsInfo, chartPlotSetting } from '../kbar/kbar.component';
import { IndicatorsInfoKeys } from '../../utils/highcharts/highcharts.util';

import {
	KbarTooltipsContainer,
	TooltipContainer,
	TooltipContentContainer,
	TooltipTitle,
	TooltipContent,
} from './kbar-tooltips.style';

type KbarToolTipsProps = {
	chart: Chart;
	tooltipObject: TooltipFormatterContextObject;
};

type GroupSeries = {
	[key: string]: Highcharts.CustomSeries[];
};

const gruopSameTypeSeries = (series: Highcharts.CustomSeries[]) => {
	return series.reduce<GroupSeries>((pre, cur) => {
		if (cur.type in pre) {
			pre[cur.type].push(cur);
		} else {
			pre[cur.type] = [cur];
		}
		return pre;
	}, {});
};

const KbarTooltips: FC<KbarToolTipsProps> = ({ chart, tooltipObject }) => {
	return (
		<KbarTooltipsContainer>
			{chart.yAxis
				.filter(yAxis => yAxis.options.id !== 'navigator-y-axis')
				.map((yAxis: Highcharts.CustomAxis, index) => {
					const series = yAxis.series[0] as Highcharts.CustomSeries;
					const plotBox = series.getPlotBox();
					const indicatorsInfoKey = series.userOptions.indicatorsInfoKey;
					const gruopSeries = gruopSameTypeSeries(
						yAxis.series.filter(
							series => series.options.type !== 'flags'
						) as Highcharts.CustomSeries[]
					);
					const isTooltipWrap = yAxis.userOptions.isTooltipWrap || false;
					const tooltipRowsCount = Object.keys(gruopSeries).length;

					return (
						<TooltipContainer
							key={indicatorsInfoKey + '-' + index}
							isWrap={isTooltipWrap}
							top={
								plotBox.translateY -
								(isTooltipWrap
									? tooltipRowsCount * chartPlotSetting.tooltip.height
									: chartPlotSetting.tooltip.height)
							}
							left={plotBox.translateX}
						>
							{Object.keys(gruopSeries).map((key, index) => {
								const indicatorsInfoKey = gruopSeries[key][0].userOptions.indicatorsInfoKey;
								const title = indicatorsInfo[indicatorsInfoKey].name;
								return (
									<TooltipContentContainer
										key={key + '-' + index}
										height={chartPlotSetting.tooltip.height}
									>
										{title && <TooltipTitle>{title}</TooltipTitle>}
										{gruopSeries[key].map((series, index) => {
											const isSeriesVisible = series.visible;
											const indicatorsInfoKey = series.userOptions.indicatorsInfoKey;
											const indicatorInfo = indicatorsInfo[indicatorsInfoKey];
											const point = tooltipObject.points?.find(point => {
												return point.series === series;
											});

											return (
												isSeriesVisible &&
												indicatorsInfoKey &&
												indicatorInfo &&
												Object.keys(indicatorInfo.option).map(optionKey => {
													const optionDesc = indicatorInfo.option[optionKey].description;
													const optionColor = (
														typeof indicatorInfo.option[optionKey].color === 'string'
															? indicatorInfo.option[optionKey].color
															: indicatorInfo.option[optionKey].color[index]
													) as string;
													const isOptionDescBold = indicatorInfo.isOptionDescBold || false;
													const optionValue =
														point && optionKey in point.point
															? (
																	Math.round(
																		(point.point[optionKey as keyof typeof point.point] as number) *
																			100
																	) / 100
															  ).toFixed(2)
															: '';

													return (
														<TooltipContent
															key={indicatorsInfoKey + optionKey}
															style={{ color: optionColor }}
														>
															{series.userOptions.type ===
															indicatorsInfo[IndicatorsInfoKeys.sma].seriesType
																? series.userOptions.params?.period
																: ''}
															{
																<span style={{ fontWeight: isOptionDescBold ? '600' : '400' }}>
																	{optionDesc + ' '}
																</span>
															}
															{optionValue}
														</TooltipContent>
													);
												})
											);
										})}
									</TooltipContentContainer>
								);
							})}
						</TooltipContainer>
					);
				})}
		</KbarTooltipsContainer>
	);
};

export default KbarTooltips;
