'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import { revalidatePaths } from '@/functions/reavalidatePaths';
import connection from '@/db/connection';
import { InsertSettingsState } from '@/types/type';

// ERROR HANDLING IS MISSING
export async function editSetting(
	documentId: string,
	settingId: string,
	settingState: InsertSettingsState
) {
	try {
		await connection();
		const foundDocument = await Setting.findOne({ _id: documentId });

		if (!foundDocument) {
			return {
				error: {
					document: 'There is no document with that id.',
				},
			};
		}

		let updatedDocumentSettings =
			foundDocument.settings &&
			foundDocument.settings.map((setting) => {
				if (setting._id.toString() === settingId.toString()) {
					return {
						_id: setting._id,
						...settingState,
					};
				}
				return setting;
			});

		let upadtedSetting = updatedDocumentSettings
			? updatedDocumentSettings.find(
					(setting) => setting._id.toString() === settingId.toString()
			  )
			: null;

		upadtedSetting = JSON.parse(JSON.stringify(upadtedSetting));

		let updated = await Setting.updateOne(
			{ _id: documentId },
			{
				$set: { settings: updatedDocumentSettings },
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
