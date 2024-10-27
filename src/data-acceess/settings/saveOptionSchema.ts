'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';
import { revalidatePaths } from '@/functions/reavalidatePaths';

export async function saveOptionSchema(state, documentId) {
	// console.log(state, 'the state');
	try {
		cookies();

		let isSingularEmpty = Object.entries(state.parameter.name.singular).find(
			([_, data]) => data.length > 0
		);
		let isPluralEmpty = Object.entries(state.parameter.name.plural).find(
			([_, data]) => data.length > 0
		);

		if (isSingularEmpty == undefined) {
			return {
				success: null,
				error: {
					singular: 'Singular name is empty',
				},
			};
		}
		if (isPluralEmpty == undefined) {
			return {
				success: null,
				error: {
					plural: 'Plural name is empty',
				},
			};
		}

		if (!state.collections.length) {
			return {
				success: null,
				error: {
					collections: 'Add at least one collection',
				},
			};
		}

		await connection();
		let document = await Setting.findOne({ _id: documentId });
		if (!document) {
			return {
				success: null,
				error: {
					document: 'Document not found.',
				},
			};
		}

		await Setting.updateOne(
			{ _id: documentId },
			{ $set: { optionsSchema: state } }
		);
		revalidatePaths([
			`/dashboard/settings/edit/${documentId}`,
			`/dashboard/settings/draft/${documentId}`,
			'/dashboard/settings/create',
		]);

		return { success: 'Schema saved to database', error: null };
	} catch (error) {
		console.log('Failed to save schema:', error);
		return {
			success: null,
			error: {
				catch: error.message,
			},
		};
	}
}
