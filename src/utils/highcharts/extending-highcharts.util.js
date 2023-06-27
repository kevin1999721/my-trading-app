import U from 'highcharts/es-modules/Core/Utilities';
export const extendingHighcharts = H => {
	if (H.Series.types.stochastic) {
		H.Series.types.stochastic.prototype.getValues = function (series, params) {
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

	if (H.Pointer) {
		H.Pointer.prototype.getHoverData = function (
			existingHoverPoint,
			existingHoverSeries,
			series,
			isDirectTouch,
			shared,
			e
		) {
			let fireEvent = H.fireEvent;
			let isObject = H.isObject;
			let find = H.find;
			let pick = H.pick;

			var hoverPoints = [],
				useExisting = !!(isDirectTouch && existingHoverPoint),
				filter = function (s) {
					return (
						s.visible && !(!shared && s.directTouch) && pick(s.options.enableMouseTracking, true)
					);
				},
				tooltipFilter = function (s) {
					return s.visible && !(!shared && s.directTouch);
				};
			var hoverSeries = existingHoverSeries,
				// Which series to look in for the hover point
				searchSeries,
				// Parameters needed for beforeGetHoverData event.
				eventArgs = {
					chartX: e ? e.chartX : void 0,
					chartY: e ? e.chartY : void 0,
					shared: shared,
				};
			// Find chart.hoverPane and update filter method in polar.
			fireEvent(this, 'beforeGetHoverData', eventArgs);
			var notSticky = hoverSeries && !hoverSeries.stickyTracking;
			searchSeries = notSticky
				? // Only search on hovered series if it has stickyTracking false
				  [hoverSeries]
				: // Filter what series to look in.
				  series.filter(function (s) {
						return s.stickyTracking && (eventArgs.filter || filter)(s);
				  });
			// Use existing hovered point or find the one closest to coordinates.
			var hoverPoint =
				useExisting || !e ? existingHoverPoint : this.findNearestKDPoint(searchSeries, shared, e);
			// Assign hover series
			hoverSeries = hoverPoint && hoverPoint.series;
			// If we have a hoverPoint, assign hoverPoints.
			if (hoverPoint) {
				// When tooltip is shared, it displays more than one point
				if (shared && !hoverSeries.noSharedTooltip) {
					let tooltipSeries = series.filter(function (s) {
						return eventArgs.filter ? eventArgs.filter(s) : tooltipFilter(s) && !s.noSharedTooltip;
					});
					// Get all points with the same x value as the hoverPoint
					tooltipSeries.forEach(function (s) {
						var point = find(s.points, function (p) {
							return p.x === hoverPoint.x && !p.isNull;
						});
						if (isObject(point)) {
							/*
							 * Boost returns a minimal point. Convert it to a usable
							 * point for tooltip and states.
							 */
							if (s.boosted && s.boost) {
								point = s.boost.getPoint(point);
							}
							hoverPoints.push(point);
						}
					});
				} else {
					hoverPoints.push(hoverPoint);
				}
			}
			// Check whether the hoverPoint is inside pane we are hovering over.
			eventArgs = { hoverPoint: hoverPoint };
			fireEvent(this, 'afterGetHoverData', eventArgs);

			return {
				hoverPoint: eventArgs.hoverPoint,
				hoverSeries: hoverSeries,
				hoverPoints: hoverPoints,
			};
		};
	}

	if (H.Tooltip) {
		H.Tooltip.prototype.hide = function (delay) {
			let pick = H.pick;
			let syncTimeout = U.syncTimeout;

			var tooltip = this;
			// disallow duplicate timers (#1728, #1766)
			U.clearTimeout(this.hideTimer);
			delay = pick(delay, this.options.hideDelay);
			if (!this.isHidden && delay !== 0) {
				this.hideTimer = syncTimeout(function () {
					// If there is a delay, do fadeOut with the default duration. If
					// the hideDelay is 0, we assume no animation is wanted, so we
					// pass 0 duration. #12994.
					tooltip.getLabel().fadeOut(delay ? void 0 : delay);
					tooltip.isHidden = true;
				}, delay);
			}
		};
	}

	// if (H.Axis) {
	// 	H.Axis.prototype.setExtremes = function (proceed) {
	// 		var args = Array.prototype.slice.call(arguments, 1);

	// 		if (isNaN(args[0])) {
	// 			args[0] = undefined;
	// 		}

	// 		if (isNaN(args[1])) {
	// 			args[1] = undefined;
	// 		}

	// 		return proceed.apply(this, args);
	// 	};
	// }
};
