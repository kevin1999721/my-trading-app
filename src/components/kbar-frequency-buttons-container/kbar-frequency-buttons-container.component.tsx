import { FC } from 'react';
import { KbarPeriodFrequency } from '../kbar/kbar.component';

import { Box } from '@mui/material';
import KbarFrequencyButtons from '../kbar-frequency-buttons/kbar-frequency-buttons.component';

type KbarFrequencyButtonsCcontainerProps = {
	kbarPeriodFrequency: KbarPeriodFrequency;
	setKbarPeriodFrequency: React.Dispatch<React.SetStateAction<KbarPeriodFrequency>>;
};

const KbarFrequencyButtonsCcontainer: FC<KbarFrequencyButtonsCcontainerProps> = ({
	kbarPeriodFrequency,
	setKbarPeriodFrequency,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				'& > *': {
					m: 1,
				},
			}}
		>
			<KbarFrequencyButtons
				kbarPeriodFrequency={kbarPeriodFrequency}
				setKbarPeriodFrequency={setKbarPeriodFrequency}
			/>
		</Box>
	);
};

export default KbarFrequencyButtonsCcontainer;
