'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// connection/moddels/database functions
// import dbConnect from '@/db/conn';
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';

// types
import { SettingsHeaderFormState } from '@/types/typesTS';
import { revalidatePaths } from '@/functions/reavalidatePaths';

const HeaderSchema = z.object({
	businessArea: z.string(),
	settingName: z.string(),
	documentStatus: z.string().default('draft'),
});
// interface FormState {
// 	state: { message: string; success: boolean; error: boolean };
// 	formState: FormState;
// }

// interface SaveSettingHeaderParams {
// 	state: FormState;
// 	formData: FormData;
// }

// TODO: Handle errors
export async function saveSettingHeader(
	prevState: SettingsHeaderFormState,
	formData: FormData
): Promise<SettingsHeaderFormState> {
	// console.log(prevState, 'prevState');
	// console.log(formData, 'formDataAAAAAAAAAAAAAAAA');
	const _id = formData.get('document_id') as string;

	if (!_id) {
		return {
			success: false,
			error: true,
			message: 'Document ID is required',
		};
	}

	let payload = {
		businessArea: formData.get('businessArea'),
		settingName: formData.get('settingName'),
		documentStatus: formData.get('status') || 'draft',
	};

	let shouldRedirect = false;

	try {
		const validateData = HeaderSchema.parse(payload);

		await connection();
		let updated = await Setting.updateOne({ _id }, { ...validateData });

		shouldRedirect = updated.modifiedCount === 1;
		revalidatePaths([
			`/dashboard/settings/edit/[_id]`,
			`/dashboard/settings/draft/[_id]`,
			'/dashboard/settings/create',
		]);
		// const pathsToRevalidate = [
		// 	`/dashboard/settings/edit/[_id]`,
		// 	`/dashboard/settings/draft/[_id]`,
		// 	'/dashboard/settings/create',
		// ];

		// pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

		return {
			success: true,
			error: false,
			message: 'Save successful.',
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
			};
		}

		if (error instanceof Error) {
			return {
				success: false,
				error: true,
				message: error.message,
			};
		}

		return {
			success: false,
			error: true,
			message: 'An unknown error occurred',
		};
	} finally {
		if (shouldRedirect) {
			let redirectTo =
				payload.documentStatus === 'published' ? 'edit' : 'draft';
			redirect(`/dashboard/settings/${redirectTo}/${_id}`);
		}
	}
}
