import { useNavigate } from 'react-router-dom';

import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';

const navigationItems = [
	{ key: 'backtest', text: '回測', icon: SignalCellularAltOutlinedIcon, to: '/backtest' },
	// { key: 'setting', text: '設定', icon: SettingsOutlinedIcon, to: '/setting' },
];

const DefaultSidebarNavigation = () => {
	const navigate = useNavigate();

	return (
		<Box>
			<List subheader={<ListSubheader component="div">其他</ListSubheader>}>
				{navigationItems.map(item => {
					const ItemIcon = item.icon;

					const onItemButtonClick = () => {
						navigate(item.to);
					};

					return (
						<ListItem key={item.key} disablePadding>
							<ListItemButton onClick={onItemButtonClick}>
								<ListItemIcon>
									<ItemIcon />
								</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};

export default DefaultSidebarNavigation;
