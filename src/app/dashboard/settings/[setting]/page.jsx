import { Suspense } from 'react';

// components
import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';

export async function getSettingGroup(setting, lang) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/${setting}?lang=${lang}`,
			{
				next: { tags: ['setting'], revalidate: 10 },
			}
		);
		if (!res.ok) {
			throw new Error('Faliled to fetch.statusText.statusText data: ' + res);
		}

		return await res.json();
	} catch (error) {
		console.log(error);
		return new Error('Error: ' + error);
	}
}

export default async function Edit({ params, searchParams }) {
	const { setting } = params;
	const { lang } = searchParams;

	const data = await getSettingGroup(setting, lang !== undefined ? lang : 'en');

	return (
		<div className='w-1/2 px-2'>
			<h2>Edit Setting</h2>
			{/* <Suspense fallback={null}> */}
			<SettingsForm data={data} />
			{/* </Suspense> */}
		</div>
	);
}
