'use server';
import { revalidatePath } from 'next/cache';

// models/db functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';
import { revalidatePaths } from '@/functions/reavalidatePaths';
import { InsertSettingsState } from '@/types/type';
import { Types } from 'mongoose';

export async function insertSettings(
	state: InsertSettingsState,
	documentId: string
) {
	try {
		await connection();
		const foundDocument = await Setting.findOne({ _id: documentId });
		if (!foundDocument) {
			return {
				success: null,
				error: {
					document: 'There is no document with that id.',
				},
			};
		}

		let settings = foundDocument.settings || [];
		if (state) settings.push(state);

		let updated = await Setting.updateOne(
			{ _id: documentId },
			{
				$set: { settings },
			}
		);

		revalidatePaths([
			`/dashboard/settings/edit/${documentId}`,
			`/dashboard/settings/draft/${documentId}`,
			'/dashboard/settings/create',
		]);

		return {
			data: null,
			success: true,
			error: false,
			message: 'Setting successfully added.',
			component: 'insert-settings',
			isLoading: false,
		};
	} catch (error) {
		console.log('Failed to add setting to collection:', error);
		if (error instanceof Error)
			return {
				data: null,
				success: true,
				error: false,
				message: error.message,
				component: 'insert-settings',
				isLoading: false,
			};
	}
}
