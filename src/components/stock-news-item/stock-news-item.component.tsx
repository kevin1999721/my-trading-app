import { FC, useState } from 'react';
import { useTheme } from '@mui/material';
import { News } from '../../gql/graphql';

import { Box, Typography, Dialog } from '@mui/material';

type StockNewsItemProps = {
	news: News;
};

const StockNewsItem: FC<StockNewsItemProps> = ({ news }) => {
	const [isNewsOpen, setIsNewsOpen] = useState(false);
	const theme = useTheme();
	const { palette } = theme;

	const handleNewsOpen = () => {
		setIsNewsOpen(true);
	};

	const handleNewsClose: React.MouseEventHandler<HTMLElement> = event => {
		event.stopPropagation();
		setIsNewsOpen(false);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				padding: '5px 0 15px 0',
				borderBottom: `1px solid ${palette.boreder.main}`,
				cursor: 'pointer',
				'& + div': {
					padding: '15px 0',
				},
			}}
			onClick={handleNewsOpen}
		>
			<Typography variant="h6">{news.title}</Typography>
			<Typography variant="body1">{news.description}</Typography>
			<Typography variant="body2" color="text.secondary">
				{(news.datetime as string).split('T').join(' ')}
			</Typography>
			<Dialog
				sx={{
					zIndex: theme => theme.zIndex.drawer + 1,
					'& .MuiDialog-paper': {
						border: `1px solid ${palette.boreder.main}`,
						borderRadius: '10px',
						overflow: 'hidden',
						maxHeight: 'calc(100vh - 50px)',
						maxWidth: '800px',
					},
				}}
				open={isNewsOpen}
				onClose={handleNewsClose}
			>
				<Box
					sx={{
						boxShadow: 0,
						padding: '20px',
						overflow: 'auto',
					}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
						<Typography variant="h6">{news.title}</Typography>
						<Typography variant="body2" color="text.secondary">
							{(news.datetime as string).split('T').join(' ')}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{news.author}
						</Typography>
					</Box>

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
						{news.aticle.map((content, index) => {
							return (
								<Typography key={index} variant="body1">
									{content}
								</Typography>
							);
						})}
					</Box>
				</Box>
			</Dialog>
		</Box>
	);
};

export default StockNewsItem;
