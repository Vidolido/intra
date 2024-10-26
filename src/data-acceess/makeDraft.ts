'use server';
import { ApiError } from 'next/dist/server/api-utils';
import { z } from 'zod';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// types
import { ActionResponse } from '@/types/zod/types';
import { SettingsSchema } from '@/types/zod/settingSchema';

export async function makeDraft(draftType: string): Promise<ActionResponse> {
	try {
		await connection();
		const draft = await Setting.create({
			documentStatus: 'draft',
			isDeleted: false,
		});

		let validatedDraft;

		if (draftType === 'Setting') {
			validatedDraft = SettingsSchema.parse(draft);
		}

		if (!validatedDraft) {
			return {
				success: null,
				error: {
					document: 'Failed to create draft setting.',
				},
			};
		}

		revalidatePaths([
			'/dashboard/settings/draft/[_id]',
			'/dashboard/settings/edit/[_id]',
			'/dashboard/settings/create',
			'/dashboard/settings',
		]);

		return {
			error: null,
			success: true,
			data: {
				_id: validatedDraft?._id.toString(),
				message: 'Successfully created draft template.',
			},
		};
	} catch (error) {
		console.error('Could not add draft setting to database:', error);

		if (error instanceof z.ZodError) {
			throw new ApiError(
				400,
				`Could not add draft setting to database: ${error.errors
					.map((e) => e.message)
					.join(', ')}`
			);
		}

		if (error instanceof Error) {
			return {
				success: null,
				error: {
					catch: error.message,
				},
			};
		}

		return {
			success: null,
			error: {
				catch: 'An unknown error occurred',
			},
		};
	}
}
