import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import { Box, Tabs, Tab } from '@mui/material';

const links = [
	{ key: 'realtime', label: '當日走勢', to: '' },
	{ key: 'technical', label: '技術分析', to: './technical' },
	{ key: 'major', label: '主力進出', to: './major' },
	{ key: 'shareholders', label: '大戶籌碼', to: './shareholders' },
];

const StockNavigation = () => {
	const location = useLocation();
	const [tabValue, setTabValue] = useState(links[0].key);
	const navigate = useNavigate();
	const theme = useTheme();
	const { palette } = theme;

	const onTabValueChange = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		const link = links.find(link => location.pathname.indexOf(link.key) > -1) || links[0];
		setTabValue(link.key);
	}, [location]);

	return (
		<Box
			component={'nav'}
			sx={{ maxWidth: '100%', borderBottom: `1px solid ${palette.boreder.main}` }}
		>
			<Box
				sx={{
					maxWidth: '1400px',
					width: '100%',
					margin: 'auto',
				}}
			>
				<Tabs
					value={tabValue}
					onChange={onTabValueChange}
					variant="scrollable"
					aria-label="scrollable auto tabs"
					scrollButtons="auto"
					allowScrollButtonsMobile
				>
					{links.map(link => {
						const onTabClick = () => {
							navigate(link.to);
						};

						return <Tab key={link.key} value={link.key} label={link.label} onClick={onTabClick} />;
					})}
				</Tabs>
			</Box>
		</Box>
	);
};

export default StockNavigation;
