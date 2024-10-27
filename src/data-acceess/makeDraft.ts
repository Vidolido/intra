'use server';
import { z } from 'zod';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';

// types
import { ActionResponse, SettingSchema } from '@/types/type';

export async function makeDraft(draftType: string): Promise<ActionResponse> {
	try {
		await connection();
		const draft = await Setting.create({
			documentStatus: 'draft',
			isDeleted: false,
		});

		let validatedDraft;
		try {
			validatedDraft = SettingSchema.parse(draft);
		} catch (validationError) {
			if (validationError instanceof z.ZodError) {
				return {
					data: null,
					success: false,
					error: true,
					message: validationError.errors.map((e) => e.message).join(', '),
					component: 'createDraft',
					isLoading: false,
				};
			}
			throw validationError;
		}

		revalidatePaths([
			'/dashboard/settings/draft/[_id]',
			'/dashboard/settings/edit/[_id]',
			'/dashboard/settings/create',
			'/dashboard/settings',
		]);

		return {
			data: {
				_id: validatedDraft?._id.toString(),
			},
			success: true,
			error: null,
			message: 'Successfully created draft template.',
			component: null,
			isLoading: false,
		};
	} catch (error) {
		console.error('Could not add draft document to database:', error);
		if (error instanceof z.ZodError) {
			return {
				data: null,
				success: false,
				error: true,
				message: error.errors.map((e) => e.message).join(', '),
				component: 'createDraft',
				isLoading: false,
			};
		}

		if (error instanceof Error) {
			return {
				data: null,
				success: false,
				error: true,
				message: `Could not create draft setting to database: ${error.message}`,
				component: 'createDraft',
				isLoading: false,
			};
		}
		return {
			data: null,
			success: false,
			error: true,
			message: `Something bad happend`,
			component: 'createDraft',
			isLoading: false,
		};
	}
}
