import { Suspense } from 'react';

// components
import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';

export async function generateStaticParams() {
	const settings = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`
	).then((res) => res.json());

	let payload = settings.reduce((acc, currentValue) => {
		Object.entries(currentValue.groupName).map((item) => {
			acc.push({
				setting: item[1].toLowerCase().split(' ').join('-'),
			});
		});
		return acc;
	}, []);

	return payload;
}

export async function getSettingGroup(setting, lang) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/${setting}?lang=${lang}`,
			{
				next: { tags: ['setting'], revalidate: 3600 },
			}
		);
		if (!res.ok) {
			throw new Error('Faliled to fetch.statusText data: ' + res.data);
		}
		return await res.json();
	} catch (error) {
		console.log(error, 'this is the error');
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

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const revalidate = 0;

export default async function Edit({ params, searchParams }) {
	// console.log(params, 'the params');
	const settingForDb = params.setting.toLowerCase().split('-').join(' ');

	const lang = searchParams.lang || 'en'; // Место англиски, треба да биде избран стандарден јазик од база

	const data = setDataForFrontEnd(await getSettingGroup(settingForDb, lang));

	return (
		<div className='w-1/2 px-2'>
			{/* <h2>Edit Setting</h2> */}
			<Suspense fallback={<span>Loading...</span>}>
				<SettingsForm data={data} shouldUpdate={true} />
			</Suspense>
		</div>
	);
}
