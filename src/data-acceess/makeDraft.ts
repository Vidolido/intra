'use server';
import { ApiError } from 'next/dist/server/api-utils';
import { z } from 'zod';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// types
import { Types } from 'mongoose';
import { isDeleted } from '@/types/zod/types';
import { SettingsSchema } from '@/types/zod/settingSchema';
export const SuccessResponseSchema = z.object({
	success: z.object({
		_id: z.instanceof(Types.ObjectId),
		// _id: z.string(),
		message: z.string(),
	}),
	error: z.null(),
});

export const ErrorResponseSchema = z.object({
	success: z.null(),
	error: z.object({
		document: z.string().optional(),
		catch: z.string().optional(),
	}),
});

export const ActionResponseSchema = z.discriminatedUnion('success', [
	SuccessResponseSchema,
	ErrorResponseSchema,
]);

// Infer TypeScript types from Zod schemas
export type ActionResponse = z.infer<typeof ActionResponseSchema>;

// export const DraftDocumentSchema = z.object({
// 	documentStatus: z.enum(['draft', 'published', 'archived']),
// 	isDeleted: isDeleted,
// 	_id: z.instanceof(Types.ObjectId),
// 	// _id: z.string(),
// });

const MinimalDraftSchema = z.object({
	_id: z.any(),
	documentStatus: z.enum(['draft', 'published', 'archived']),
	isDeleted: z.boolean(),
	settings: z.array(z.any()).optional(),
	optionsSchema: z
		.object({
			parameter: z.any().optional(),
			collections: z.array(z.any()).optional(),
		})
		.optional(),
});

export async function makeDraft(): Promise<ActionResponse> {
	console.log('MAKE DRAFT?');
	try {
		await connection();
		const draft = await Setting.create({
			documentStatus: 'draft',
			isDeleted: false,
		});

		console.log(draft, 'the draft');

		const validatedDraft = MinimalDraftSchema.parse(draft);
		console.log(validatedDraft, '  VALIDATE');

		// if (!validatedDraft) {
		// 	return {
		// 		success: null,
		// 		error: {
		// 			document: 'Failed to create draft setting.',
		// 		},
		// 	};
		// }

		revalidatePaths([
			'/dashboard/settings/draft/[_id]',
			'/dashboard/settings/edit/[_id]',
			'/dashboard/settings/create',
			'/dashboard/settings',
		]);

		// return {
		// 	error: null,
		// 	success: {
		// 		_id: validatedDraft._id.toString(),
		// 		message: 'Successfully created draft template.',
		// 	},
		// };
		return {
			error: null,
			success: {
				_id: draft._id,
				message: 'Successfully created draft template.',
			},
		};
	} catch (error) {
		console.error('Could not add draft setting to database:', error);

		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			throw new ApiError(
				400,
				`Could not add draft setting to database: ${error.errors
					.map((e) => e.message)
					.join(', ')}`
			);
		}

		// Handle other errors
		if (error instanceof Error) {
			return {
				success: null,
				error: {
					catch: error.message,
				},
			};
		}

		// Handle unknown errors
		return {
			success: null,
			error: {
				catch: 'An unknown error occurred',
			},
		};
	}
}
