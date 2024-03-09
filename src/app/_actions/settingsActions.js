'use server';

import { connect } from '@/../conn';
import Settings from '@/app/_models/(settings)/Settings';
import { revalidatePath } from 'next/cache';

function readyForInsert(data) {
	if (!data.collection[data.collectionType]) return;
	const collection = data.collection[data.collectionType].map(
		(item) => item.item
	);
	return collection.reduce((acc, currentValue) => {
		let newItem = {
			groupName: data.groupName,
			[data.collectionType]: currentValue,
		};
		acc.push(newItem);
		return acc;
	}, []);
}

export async function createSetting(formData) {
	const payload = readyForInsert(formData);
	// console.log(payload, 'the payload');
	try {
		await connect();
		await Settings.insertMany(payload);
		revalidatePath('/dashboard/settings');
	} catch (error) {
		throw Error('Could  not add setting to database: ' + error);
	}
}
