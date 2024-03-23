// 'use server';

import DeleteButton from './DeleteButton';
import EditLink from '../smallComponents/EditLink';
import TranslatedString from '../smallComponents/TranslatedString';

// Да видам дали има потреба од ова
// export const revalidate = 0;
export default async function DisplaySettings({ setting }) {
	const { groupName, collection } = setting;
	return (
		<section className='flex flex-col min-w-[300px] min-h-[400px] max-h-[700px] border-2 border-grey-50 border-opacity-60 p-2 rounded'>
			<h2 className='capitalize text-2xl font-bold'>
				<TranslatedString item={groupName} />
			</h2>
			<ul className='px-2 py-1 mt-4 mb-5'>
				{collection.map((collectionItem) => {
					return (
						<li key={collectionItem._id}>
							{collectionItem.single && (
								<span className='block border-b-2 px-1'>
									{collectionItem?.single}
								</span>
							)}
							{collectionItem.translatedString && (
								<span className='block border-b-2 px-1'>
									<TranslatedString item={collectionItem.translatedString} />
								</span>
							)}

							{collectionItem.limit && (
								<span className='block border-b-2 px-1'>
									{collectionItem?.limit?.from &&
										`Min: ${collectionItem?.limit?.from}`}{' '}
									{collectionItem?.limit?.to &&
										`Max: ${collectionItem?.limit?.to}`}
								</span>
							)}
						</li>
					);
				})}
			</ul>
			<div className='flex flex-col justify-end h-full'>
				<div className='flex justify-between'>
					<DeleteButton settings={collection} />

					<EditLink groupName={groupName} />
				</div>
			</div>
		</section>
	);
}
