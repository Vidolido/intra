'use server';
import { revalidateTag, revalidatePath } from 'next/cache';

import { connect } from '@/../conn';

import { getGroupedSettings } from '../api/settings/aggregation';

// moddel
import Settings from '@/app/_models/Settings';

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
  await connect();
  //   const settings = await Settings.find({});
  const settings = await Settings.aggregate(getGroupedSettings);
  revalidatePath('dashboard/settings', 'page');
  return JSON.stringify(settings);
}

export async function createSetting(formData) {
  const payload = readyForInsert(formData);
  try {
    await connect();
    await Settings.insertMany(payload);
    revalidateTag('collection');
  } catch (error) {
    throw Error('Could  not add setting to database: ' + error);
  }
}

export async function deleteSettings(data) {
  // console.log(data, 'FROM ACTION');
  const groupName = data[0].groupName;
  try {
    await connect();
    await Settings.deleteMany({ groupName });
    revalidatePath('dashboard/settings', 'page');

    // revalidateTag('collection');
  } catch (error) {
    throw Error('Could not delete a setting from database: ' + error);
  }
}
