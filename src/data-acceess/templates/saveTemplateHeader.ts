'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// connection/moddels/database functions
import connection from '@/db/connection';
import { LaboratoryTemplate } from '@/db/models';

// types
import {
	ActionResponse,
	LaboratoryTemplatesHeaderSchema,
	Options,
	OptionsSchema,
} from '@/types/type';

// helper
function parseJsonField<T>(formData: FormData, key: string): T | null {
	const value = formData.get(key);
	if (!value || typeof value !== 'string') return null;

	try {
		return JSON.parse(value) as T;
	} catch {
		return null;
	}
}

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateHeader(
	state: ActionResponse,
	formData: FormData
): Promise<ActionResponse> {
	const _id = formData.get('document_id') as string;
	const documentStatus = !formData?.get('status')
		? 'draft'
		: formData.get('status');

	// Should make error handling(zod) for this part
	let schemaNames = parseJsonField(formData, 'options-schema');

	const payload = {
		product: formData.get('product'),
		// sampleType: formData.get('sample-type'),
		// origin: formData.get('origin'),
		// documentType: formData.get('document-type'),
		templateName: formData.get('template-name'),
	};

	let shouldRedirect = false;
	// console.log(schemaNames, 'parsed schema names');
	try {
		const validateData = LaboratoryTemplatesHeaderSchema.parse(payload);
		// const validatedSchema = OptionsSchema.parse(schemaNames);

		await connection();
		let updated = await LaboratoryTemplate.updateOne(
			{ _id },
			{
				$set: {
					documentStatus,
					...validateData,
					schemaNames: schemaNames,
				},
			}
		);

		shouldRedirect = updated.modifiedCount === 1;

		const pathsToRevalidate = [
			'/dashboard/laboratory/templates/draft/[_id]',
			'/dashboard/laboratory/templates/edit/[_id]',
			'/dashboard/laboratory/templates/create',
		];

		pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return {
			success: true,
			error: false,
			message: 'Save successful',
			isLoading: false,
		};
	} catch (error) {
		shouldRedirect = false;
		if (error instanceof z.ZodError) {
			return {
				success: false,
				error: true,
				message: `Validation error: ${error.errors
					.map((e) => e.message)
					.join(', ')}`,
				isLoading: false,
			};
		}
		return {
			success: false,
			error: true,
			message:
				error instanceof Error ? error.message : 'An unkonwn error occured',
			isLoading: false,
		};
	} finally {
		if (shouldRedirect) {
			let redirectTo = documentStatus === 'published' ? 'edit' : 'draft';
			redirect(`/dashboard/laboratory/templates/${redirectTo}/${_id}`);
		}
	}
}
