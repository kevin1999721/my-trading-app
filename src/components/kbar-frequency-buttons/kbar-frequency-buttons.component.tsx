import { useState, FC } from 'react';
import { KbarPeriodFrequency } from '../kbar/kbar.component';
import { KbarFrequency } from '../../utils/highcharts/highcharts.util';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

type KbarPeriodFrequencySetting = {
	id: string;
	name: string;
	period: number;
	frequency: KbarFrequency;
};

const kbarPeriodFrequencySettings: KbarPeriodFrequencySetting[] = [
	{
		id: '3-T',
		name: '3分',
		period: 3,
		frequency: KbarFrequency.T,
	},
	{
		id: '5-T',
		name: '5分',
		period: 5,
		frequency: KbarFrequency.T,
	},
	{
		id: '15-T',
		name: '15分',
		period: 15,
		frequency: KbarFrequency.T,
	},
	{
		id: '1-D',
		name: '日',
		period: 1,
		frequency: KbarFrequency.D,
	},
	{
		id: '1-W',
		name: '週',
		period: 1,
		frequency: KbarFrequency.W,
	},
	{
		id: '1-M',
		name: '月',
		period: 1,
		frequency: KbarFrequency.M,
	},
];

type KbarFrequencyButtonProps = {
	kbarPeriodFrequency: KbarPeriodFrequency;
	setKbarPeriodFrequency: React.Dispatch<React.SetStateAction<KbarPeriodFrequency>>;
};

const KbarFrequencyButtons: FC<KbarFrequencyButtonProps> = ({
	kbarPeriodFrequency,
	setKbarPeriodFrequency,
}) => {
	const [buttonValue, setButtonValue] = useState(
		kbarPeriodFrequencySettings.find(
			setting =>
				setting.period === kbarPeriodFrequency.period &&
				setting.frequency === kbarPeriodFrequency.frequency
		)?.id
	);

	const onButtonChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
		if (newValue !== null) setButtonValue(newValue);
	};

	return (
		<ToggleButtonGroup
			color="primary"
			value={buttonValue}
			exclusive
			onChange={onButtonChange}
			aria-label="KbarPeriodFrequency"
		>
			{kbarPeriodFrequencySettings.map(kbarPeriodFrequencySetting => {
				const onButtonClick = () => {
					setKbarPeriodFrequency({
						period: kbarPeriodFrequencySetting.period,
						frequency: kbarPeriodFrequencySetting.frequency,
					});
				};

				return (
					<ToggleButton
						key={kbarPeriodFrequencySetting.id}
						value={kbarPeriodFrequencySetting.id}
						onClick={onButtonClick}
					>
						{kbarPeriodFrequencySetting.name}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};

export default KbarFrequencyButtons;
