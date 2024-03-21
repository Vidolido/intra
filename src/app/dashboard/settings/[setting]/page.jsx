import { Suspense } from 'react';

// components
import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';

// get data from database
export async function getSettingGroup(setting, lang) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/${setting}?lang=${lang}`,
			{
				next: { tags: ['setting'], revalidate: 10 },
			}
		);
		if (!res.ok) {
			throw new Error('Faliled to fetch.statusText data: ' + res);
		}
		return await res.json();
	} catch (error) {
		console.log(error);
		return new Error('Error: ' + error);
	}
}

// << helper functions
function setDataForFrontEnd(data) {
	let collection = data?.collection?.reduce((acc, currentValue) => {
		let value = {
			id: currentValue._id,
			item: currentValue[data.collectionType],
		};
		acc.push(value);
		return acc;
	}, []);

	const payload = {
		groupName: data.groupName,
		collectionType: data.collectionType,
		collection: { [data.collectionType]: collection },
	};

	return payload;
}
// helper functions >>

// export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Работи само со ова(приметив каснење, да видам дали ќе се случи пак), но ќе остаам да видам уште некој ден. 11.03.2024
export const revalidate = 0;

export default async function Edit({ params, searchParams }) {
	const settingForDb = params.setting.toLowerCase().split('-').join(' ');

	const lang = searchParams.lang || 'en'; // Место англиски, треба да биде избран стандарден јазик од база

	const data = setDataForFrontEnd(await getSettingGroup(settingForDb, lang));

	return (
		<div className='w-1/2 px-2'>
			<h2>Edit Setting</h2>
			<Suspense fallback={<span>Loading...</span>}>
				<SettingsForm data={data} />
			</Suspense>
		</div>
	);
}
