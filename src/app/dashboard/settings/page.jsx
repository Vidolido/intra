import { Suspense } from 'react';

import { getSettings } from '@/app/_actions/settingsActions';

// components
import DisplaySettings from '@/app/_components/settings/DisplaySettings';

export default async function Settings() {
	// const data = await getSettings();
	const data = JSON.parse(await getSettings());
	// console.log(data, 'in settings page');
	return (
		<div className='flex flex-row flex-wrap justify-center align-middle gap-16'>
			<Suspense fallback={<div>Loading...</div>}>
				{!data.length ? (
					<h2>There are no settings available.</h2>
				) : (
					data.map((item, i) => <DisplaySettings key={i} setting={item} />)
				)}
			</Suspense>
		</div>
	);
}
