export const customStochastic = H => {
	if (H.seriesTypes.stochastic) {
		H.seriesTypes.stochastic.prototype.getValues = function (series, params) {
			let timestamps = series.xData,
				kbarsData = series.yData,
				period = 9,
				weight = 3,
				SO = [],
				xData = series.xData,
				yData = [];

			for (let index = 0; index < period; index++) {
				SO.push([timestamps[index], null, null]);
				yData.push([null, null]);
			}

			SO.push([timestamps[period], 50, 50]);
			yData.push([50, 50]);

			for (let index = period + 1; index < kbarsData.length; index++) {
				let rsvValue = 0;
				let periodHighest = Math.max(
					...kbarsData.slice(index + 1 - period, index + 1).map(data => data[1])
				);

				let periodLowest = Math.min(
					...kbarsData.slice(index + 1 - period, index + 1).map(data => data[2])
				);

				if (periodHighest - periodLowest !== 0)
					rsvValue = ((kbarsData[index][3] - periodLowest) / (periodHighest - periodLowest)) * 100;
				else rsvValue = 50;

				let kValue = (2 * yData[yData.length - 1][0] + rsvValue) / weight;
				let dValue = (2 * yData[yData.length - 1][1] + kValue) / weight;

				SO.push([timestamps[index], kValue, dValue]);
				yData.push([kValue, dValue]);
			}

			return {
				values: SO,
				xData: xData,
				yData: yData,
			};
		};
	}
};
