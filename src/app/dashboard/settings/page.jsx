import DisplaySettings from '@/app/_components/settings/DisplaySettings';

async function getData() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`, {
		revalidate: 60,
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

const lang = 'en';

export default async function Settings() {
	const data = await getData();
	// console.log(data);
	return (
		<div className='flex flex-row flex-wrap justify-center align-middle gap-16'>
			{data?.map((item) => (
				<DisplaySettings key={item} setting={item} />
			))}
		</div>
	);
}
