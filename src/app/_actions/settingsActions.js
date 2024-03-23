'use server';
import { revalidateTag, revalidatePath } from 'next/cache';

import { connect } from '@/../conn';
// import { mongoose } from 'mongoose'

import { getGroupedSettings } from '../api/settings/aggregation';

// moddel
import Settings from '@/app/_models/Settings';
import { headers } from 'next/headers';

// <<helper functions
function readyForInsert(data) {
	if (!data.collection[data.collectionType]) return;
	const collection = data.collection[data.collectionType].map(
		(item) => item.item
	);
	return collection.reduce((acc, currentValue) => {
		let newItem = {
			groupName: data.groupName,
			[data.collectionType]: currentValue,
			collectionType: data.collectionType,
		};
		acc.push(newItem);
		return acc;
	}, []);
}
// helper functions>>

export async function getSettings() {
	headers();
	try {
		await connect();
		const settings = await Settings.aggregate(getGroupedSettings);
		revalidatePath('dashboard/settings', 'page');
		return JSON.stringify(settings);
	} catch (error) {
		throw Error('Could get settings from database: ' + error);
	}
}

export async function createSetting(formData) {
	const payload = readyForInsert(formData);
	headers();

	try {
		await connect();
		await Settings.insertMany(payload);
		revalidatePath('dashboard/settings', 'page');
	} catch (error) {
		throw Error('Could  not add setting to database: ' + error);
	}
}

export async function updateSetting(formData) {
	// headers();
	try {
		await connect();
		const groupName = formData.groupName;
		const collectionItems = formData.collection[formData.collectionType];
		const collectionType = formData.collectionType;
		let bulkOps = [];

		for (const collectionItem of collectionItems) {
			const settingId = collectionItem.id;
			const item = collectionItem.item;

			const setting = await Settings.findOne({ _id: settingId });

			if (!setting) {
				console.error(`Setting with id ${settingId} not found.`);
				continue;
			}

			const payload = {};

			if (setting.groupName !== groupName) {
				payload.groupName = groupName;
			}
			if (setting[collectionType] !== item) {
				payload[collectionType] = item;
			}

			if (Object.keys(payload).length > 0) {
				bulkOps.push({
					updateOne: {
						filter: { _id: settingId },
						update: { $set: payload },
					},
				});
			}

			if (bulkOps.length > 0) {
				await Settings.bulkWrite(bulkOps);
			}
		}
		// revalidatePath('dashboard/settings', 'page');
	} catch (error) {
		throw Error('Could not update a setting: ' + error);
	}
}

export async function deleteSettings(data) {
	headers();

	const groupName = data[0].groupName;
	try {
		await Settings.deleteMany({ groupName });
		revalidatePath('dashboard/settings', 'page');
	} catch (error) {
		throw Error('Could not delete a setting from database: ' + error);
	}
}
