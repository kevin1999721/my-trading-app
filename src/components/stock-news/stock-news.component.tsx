import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_NEWS_LIST } from '../../utils/graphql/query.util';

import { Box } from '@mui/material';
import StockNewsItem from '../stock-news-item/stock-news-item.component';
import Progress from '../progress/progress.component';
import DisplayNoData from '../display-no-data/display-no-data.componenet';

type StockNewsProps = {
	code: string;
};

const StockNews: FC<StockNewsProps> = ({ code }) => {
	const { loading, error, data } = useQuery(QUERY_NEWS_LIST, {
		variables: {
			code: code,
		},
	});

	return (
		<Box>
			{loading && <Progress />}
			{!loading && (!data?.newsList || data?.newsList.length === 0) && <DisplayNoData />}
			{data?.newsList && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{data.newsList.map((news, index) => {
						return <StockNewsItem key={index + news.datetime} news={news} />;
					})}
				</Box>
			)}
		</Box>
	);
};

export default StockNews;
