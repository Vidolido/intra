import Link from 'next/link';

export default function DisplaySettings({ setting }) {
	const lang = 'en';

	// console.log(setting, 'the setting');
	return (
		<section className='flex flex-col min-w-[300px] min-h-[400px] border-2 border-grey-50 border-opacity-60 p-2 rounded'>
			<h2 className='text-2xl font-bold'>{setting?.groupName['en']}</h2>
			<ul className='px-2 py-1 mt-4 mb-5'>
				{setting?.collection.map((collectionItem) => {
					console.log(collectionItem);

					return (
						<li key={collectionItem._id}>
							{collectionItem.single && (
								<span className='block border-b-2 px-1'>
									{collectionItem?.single}
								</span>
							)}
							{collectionItem.translatedString && (
								<span className='block border-b-2 px-1'>
									{collectionItem?.translatedString[lang]}
								</span>
							)}
							{collectionItem.limit && (
								<span className='block border-b-2 px-1'>
									{collectionItem?.limit?.min &&
										`min: ${collectionItem?.limit?.from}`}
									{collectionItem?.limit?.max &&
										`max: ${collectionItem?.limit?.to}`}
								</span>
							)}
						</li>
					);
				})}
			</ul>
			<div className='flex flex-col justify-end h-full'>
				<div className='flex justify-between'>
					<button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-[0.3rem] px-4 rounded'>
						Delete
					</button>
					{/* href-от знае да направи проблеми, треба да проверам неколку опции
					за да видам од кои причини се случува. */}
					<Link
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-[0.3rem] px-4 rounded'
						href={`/dashboard/settings/${setting.groupName['en']
							.toLowerCase()
							.split(' ')
							.join('-')}`}>
						Edit
					</Link>
				</div>
			</div>
		</section>
	);
}
