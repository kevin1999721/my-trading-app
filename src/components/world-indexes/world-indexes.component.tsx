import { useState, useEffect, FC } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORLD_INDEXES } from '../../utils/graphql/query.util';
import { WorldIndex } from '../../gql/graphql';
import { sxDashboard } from '../../utils/theme/theme.util';
import { useTheme } from '@mui/material';

import { Box, Typography, Tabs, Tab, Link } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Progress from '../progress/progress.component';

type WorldIndexesItemProps = {
	worldIndex: WorldIndex;
};

const WorldIndexesItem: FC<WorldIndexesItemProps> = ({ worldIndex }) => {
	const theme = useTheme();
	const { palette } = theme;

	const { name, price, change, changePercent, link } = worldIndex;

	return (
		<Box
			sx={{
				...sxDashboard,
				display: 'flex',
				flexDirection: 'column',
				cursor: 'pointer',
				position: 'relative',
			}}
		>
			<Box>
				<Typography fontWeight={600}>{name}</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: '10px',
					alignItems: 'stretch',
					'& > *': { color: price > 0 ? palette.red.main : palette.green.main },
				}}
			>
				<Typography fontWeight={600}>{price}</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					component={'span'}
				>
					<PlayArrowRoundedIcon
						sx={{ transform: price > 0 ? 'rotate(-90deg)' : 'rotate(90deg)' }}
					/>
					<Typography whiteSpace={'nowrap'}>{`${change} (${changePercent}%)`}</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					left: '0',
					top: '0',
				}}
			>
				<Link
					sx={{
						display: 'block',
						width: '100%',
						height: '100%',
					}}
					href={link}
					target="_blank"
				></Link>
			</Box>
		</Box>
	);
};

type IndexesCategory = 'asia' | 'usa' | 'eu';

type IndexesTab = {
	key: IndexesCategory;
	name: string;
};

type IndexesToShow = {
	[key in IndexesCategory]: string[];
};

const indexesTabs: IndexesTab[] = [
	{
		key: 'asia',
		name: '亞洲',
	},
	{
		key: 'usa',
		name: '美國',
	},
	{
		key: 'eu',
		name: '歐洲',
	},
];

const worldIndexesToshow: IndexesToShow = {
	asia: ['^N225', '^KS11', '^HSI', '000001.SS', '399101.SZ'],
	usa: ['^DJI', '^GSPC', '^IXIC', '^SOX'],
	eu: ['^FTSE', '^GDAXI', '^FCHI'],
};

const WorldIndexes = () => {
	const [worldIndexes, setWorldIndexes] = useState<WorldIndex[]>([]);
	const [filteringWorldIndexes, setFilteringWorldIndexes] = useState<WorldIndex[]>([]);
	const [indexesCategory, setIndexesCategory] = useState<IndexesCategory>(indexesTabs[0].key);
	const { loading, error, data } = useQuery(QUERY_WORLD_INDEXES, {
		fetchPolicy: 'no-cache',
	});

	const onTabsChange = (event: React.SyntheticEvent, newValue: IndexesCategory) => {
		setIndexesCategory(newValue);
	};

	useEffect(() => {
		if (data?.worldIndexes) {
			setWorldIndexes(data.worldIndexes);
		}
	}, [data?.worldIndexes]);

	useEffect(() => {
		setFilteringWorldIndexes(
			worldIndexes.filter(
				worldIndex =>
					worldIndexesToshow[indexesCategory].findIndex(
						worldIndexToSow => worldIndexToSow === worldIndex.code
					) > -1
			)
		);
	}, [indexesCategory, worldIndexes]);

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '10px 20px',
				}}
			>
				<Box>
					<Typography variant="h6">國際指數</Typography>
				</Box>
				<Box>
					<Tabs
						sx={{
							button: {
								minWidth: '60px',
							},
						}}
						value={indexesCategory}
						onChange={onTabsChange}
					>
						{indexesTabs.map(tab => {
							const { key, name } = tab;
							return <Tab key={key} value={key} label={name} />;
						})}
					</Tabs>
				</Box>
			</Box>
			{loading && <Progress />}
			<Box>
				<Box
					sx={{
						display: 'flex',
						gap: '10px',
						padding: '20px 0px 20px 5px',
						marginLeft: '-5px',
						overflow: 'auto',
					}}
				>
					{filteringWorldIndexes.map(worldIndex => {
						return <WorldIndexesItem key={worldIndex.code} worldIndex={worldIndex} />;
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default WorldIndexes;
