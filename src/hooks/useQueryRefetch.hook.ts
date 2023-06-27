import { useEffect } from 'react';

export const useQueryRefetch = (
	fetchCallback: () => void,
	timeout: number,
	isStartToRefetch: boolean = true,
	isExcueteFirstFetch: boolean = false
) => {
	useEffect(() => {
		let intervalID: NodeJS.Timer | null | number = null;

		if (isStartToRefetch) {
			if (isExcueteFirstFetch) fetchCallback();

			const judgeIsInRangeTime = () => {
				const dateNow = new Date().getTime();
				const startRange = new Date().setHours(8, 30, 0);
				const endRange = new Date().setHours(14, 0, 0);

				return dateNow >= startRange && dateNow <= endRange;
			};

			if (judgeIsInRangeTime()) {
				intervalID = setInterval(() => {
					fetchCallback();
					if (!judgeIsInRangeTime() && intervalID) clearInterval(intervalID);
				}, timeout);
			}
		}

		return () => {
			if (intervalID) clearInterval(intervalID);
		};
	}, [fetchCallback, timeout, isStartToRefetch, isExcueteFirstFetch]);
};
