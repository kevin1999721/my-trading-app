declare global {
	namespace Highcharts {
		export type CustomSeriesOptionsType = SeriesOptionsType & {
			indicatorsInfoKey: IndicatorsInfoKeys;
		};

		interface CustomSeries extends Series {
			getPlotBox: () => PlotBox;
			userOptions: CustomSeriesOptionsType;
		}

		interface CustomYAxisOptions extends YAxisOptions {
			isTooltipWrap?: boolean;
		}

		interface CustomYAxisOptions extends YAxisOptions {
			isTooltipWrap?: boolean;
		}

		interface CustomAxis extends Axis {
			userOptions: CustomYAxisOptions;
		}
	}
}

export enum IndicatorsInfoKeys {
	candlestick = 'candlestick',
	volumn = 'volumn',
	sma = 'sma',
	bb = 'bb',
	stochastic = 'stochastic',
	macd = 'macd',
}

export type PlotBox = {
	rotation: number;
	rotationOriginX: number;
	rotationOriginY: number;
	scaleX: number;
	scaleY: number;
	translateX: number;
	translateY: number;
};

export type IndicatorsSeriesType = {
	[IndicatorsInfoKeys.candlestick]: 'candlestick';
	[IndicatorsInfoKeys.volumn]: 'column';
	[IndicatorsInfoKeys.sma]: 'sma';
	[IndicatorsInfoKeys.bb]: 'bb';
	[IndicatorsInfoKeys.stochastic]: 'stochastic';
	[IndicatorsInfoKeys.macd]: 'macd';
};

export type IndicatorsInfo = {
	[key in keyof IndicatorsSeriesType]: {
		seriesType: IndicatorsSeriesType[key];
		name: string;
		option: {
			[x: string]: {
				description: string;
				color: string | string[];
			};
		};
		y: string;
		isOverlay: boolean;
		isShowInSelect: boolean;
		isOptionDescBold?: Boolean;
	};
};

export type IndicatorsColors = {
	[key in keyof IndicatorsSeriesType]: {
		color: string | string[];
		[x: string]: any;
	};
};

export enum KbarFrequency {
	T = 'T',
	D = 'D',
	W = 'W-MON',
	M = 'M',
}
