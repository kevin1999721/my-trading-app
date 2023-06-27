import { useState, useEffect, FC } from 'react';
import { Chart, Series } from 'highcharts/highstock';
import { ChartSeries, indicatorsInfo, indicatorsColors } from '../kbar/kbar.component';
import { IndicatorsInfoKeys } from '../../utils/highcharts/highcharts.util';
import { SelectType } from '../kbar-indicators-selects-container/kbar-indicators-selects-container.component';

import {
	Box,
	MenuItem,
	FormControl,
	Select,
	SelectChangeEvent,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@mui/material';

const getKbarSmaSeriesID = (period: number) => {
	return `kbar-${period}-sma`;
};

type KbarIndicatorsSelectProps = {
	chart: Chart;
	setChartSeries: React.Dispatch<React.SetStateAction<ChartSeries>>;
	type: SelectType;
	index: number;
	defalutIndicatorsInfoKey: IndicatorsInfoKeys | '';
};

const KbarIndicatorsSelect: FC<KbarIndicatorsSelectProps> = ({
	chart,
	setChartSeries,
	index,
	type,
	defalutIndicatorsInfoKey,
}) => {
	const [indicatorsInfoKey, setIndicatorsInfoKey] = useState<IndicatorsInfoKeys | ''>(
		defalutIndicatorsInfoKey
	);

	const smaPeriodsToOverlay = {
		[IndicatorsInfoKeys.sma]: [5, 10, 20, 60, 120],
		[IndicatorsInfoKeys.volumn]: [5, 10],
	};

	const onSelectChange = (event: SelectChangeEvent) => {
		setIndicatorsInfoKey(event.target.value as IndicatorsInfoKeys | '');
	};

	const onCheckboxChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
		const series = chart.get(event.target.name) as Series;
		if (series) {
			event.target.checked ? series.show() : series.hide();
		}
	};

	useEffect(() => {
		if (indicatorsInfoKey) {
			if (type === SelectType.overlay) {
				if (indicatorsInfoKey === IndicatorsInfoKeys.sma) {
					setChartSeries(pre => {
						return {
							...pre,
							overlay: [
								...pre.overlay.filter(
									overlay =>
										(overlay.index !== index &&
											'linkedTo' in overlay.series &&
											overlay.series.linkedTo !== pre.main.id) ||
										('linkedTo' in overlay.series && overlay.series.linkedTo !== pre.main.id)
								),
								...smaPeriodsToOverlay[indicatorsInfoKey].map((period, index) => {
									return {
										index: index,
										series: {
											type: indicatorsInfo[indicatorsInfoKey].seriesType,
											id: getKbarSmaSeriesID(period),
											indicatorsInfoKey: indicatorsInfoKey,
											linkedTo: pre.main.id,
											params: {
												period: period,
											},
											color: indicatorsColors[indicatorsInfoKey].color[index],
										},
									};
								}),
							].sort((a, b) => a.index - b.index),
						};
					});
				} else {
					const seriesId = type + '-' + index;
					setChartSeries(pre => {
						return {
							...pre,
							overlay: [
								...pre.overlay.filter(
									overlay =>
										(overlay.index !== index &&
											'linkedTo' in overlay.series &&
											overlay.series.linkedTo !== pre.main.id) ||
										('linkedTo' in overlay.series && overlay.series.linkedTo !== pre.main.id)
								),
								indicatorsInfoKey && {
									index: index,
									series: {
										id: seriesId,
										type: indicatorsInfo[indicatorsInfoKey].seriesType,
										indicatorsInfoKey: indicatorsInfoKey,
										linkedTo: pre.main.id,
										...indicatorsColors[indicatorsInfoKey],
									},
								},
							]
								.filter(
									(
										overlay
									): overlay is { index: number; series: Highcharts.CustomSeriesOptionsType } =>
										Boolean(overlay)
								)
								.sort((a, b) => a.index - b.index),
						};
					});
				}
			} else if (type === SelectType.sub) {
				const seriesId = type + '-' + index;
				setChartSeries(pre => {
					return {
						...pre,
						sub: [
							...pre.sub.filter(sub => sub.index !== index),
							indicatorsInfoKey && {
								index: index,
								series: {
									type: indicatorsInfo[indicatorsInfoKey].seriesType,
									id: seriesId,
									indicatorsInfoKey: indicatorsInfoKey,
									linkedTo: pre.main.id,
									...indicatorsColors[indicatorsInfoKey],
								},
							},
						]
							.filter((sub): sub is { index: number; series: Highcharts.CustomSeriesOptionsType } =>
								Boolean(sub)
							)
							.sort((a, b) => a.index - b.index),
						overlay: [
							...pre.overlay.filter(
								overlay => 'linkedTo' in overlay.series && overlay.series.linkedTo !== seriesId
							),
						],
					};
				});

				if (indicatorsInfoKey === IndicatorsInfoKeys.volumn) {
					setChartSeries(pre => {
						return {
							...pre,
							overlay: [
								...pre.overlay,
								...smaPeriodsToOverlay[indicatorsInfoKey].map((period, index) => {
									return {
										index: index,
										series: {
											type: indicatorsInfo[IndicatorsInfoKeys.sma].seriesType,
											indicatorsInfoKey: IndicatorsInfoKeys.sma,
											id:
												seriesId + '-' + period + indicatorsInfo[IndicatorsInfoKeys.sma].seriesType,
											linkedTo: seriesId,
											params: {
												period: period,
											},
											color: indicatorsColors[IndicatorsInfoKeys.sma].color[index],
										},
									};
								}),
							].sort((a, b) => a.index - b.index),
						};
					});
				}
			}
		}
	}, [indicatorsInfoKey]);

	return (
		<Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
			<FormControl sx={{ width: 130, flexShrink: 0 }} size={'small'}>
				<Select
					value={indicatorsInfoKey}
					onChange={onSelectChange}
					MenuProps={{
						marginThreshold: 0,
					}}
				>
					{(Object.keys(indicatorsInfo) as (keyof typeof indicatorsInfo)[])
						.filter(
							key =>
								indicatorsInfo[key].isShowInSelect &&
								(type === SelectType.overlay
									? indicatorsInfo[key].isOverlay
									: !indicatorsInfo[key].isOverlay)
						)
						.map(key => (
							<MenuItem key={key} value={key}>
								{indicatorsInfo[key].name}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			{type === SelectType.overlay && indicatorsInfoKey === IndicatorsInfoKeys.sma && (
				<FormGroup row={true}>
					{smaPeriodsToOverlay[IndicatorsInfoKeys.sma].map(period => {
						return (
							<FormControlLabel
								key={period + indicatorsInfo[IndicatorsInfoKeys.sma].y}
								control={
									<Checkbox
										defaultChecked
										name={getKbarSmaSeriesID(period)}
										onChange={onCheckboxChagne}
										size="small"
									/>
								}
								label={period + indicatorsInfo[IndicatorsInfoKeys.sma].y}
							/>
						);
					})}
				</FormGroup>
			)}
		</Box>
	);
};

export default KbarIndicatorsSelect;
