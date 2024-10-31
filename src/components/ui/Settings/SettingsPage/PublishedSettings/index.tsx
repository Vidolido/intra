// state/actions
import { orderBySector } from '@/functions/orderBySector';

// components
import Ordered from './Ordered';

const PublishedSettings = ({ businessAreas, published }) => {
	const mutPublished = orderBySector(businessAreas, published) || [];
	return (
		<div className='flex flex-col gap-1'>
			<h2>Settings</h2>
			{mutPublished.map((sectorSettings, i) => (
				<Ordered key={i} setting={sectorSettings} />
			))}
		</div>
	);
};

export default PublishedSettings;
