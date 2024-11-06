'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// connection/moddels/database functions
import connection from '@/db/connection';
import Setting from '@/db/models/Setting';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// types
import { ActionResponse, SettingHeaderSchema } from '@/types/type';

// const HeaderSchema = z.object({
// 	businessArea: z.string(),
// 	settingName: z.string(),
// 	documentStatus: z.string().default('draft'),
// });
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
  state: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  console.log(state, 'state');
  console.log(formData, 'formDataAAAAAAAAAAAAAAAA');
  const _id = formData.get('document_id') as string;

  if (!_id) {
    return {
      success: false,
      error: true,
      message: 'Document ID is required',
      isLoading: false,
    };
  }

  let payload = {
    businessArea: formData.get('businessArea'),
    settingName: formData.get('settingName'),
    documentStatus: formData.get('status') || 'draft',
  };

  let shouldRedirect = false;

  try {
    const validateData = SettingHeaderSchema.parse(payload);

    await connection();
    let updated = await Setting.updateOne({ _id }, { ...validateData });

    shouldRedirect = updated.modifiedCount === 1;
    revalidatePaths([
      `/dashboard/settings/edit/[_id]`,
      `/dashboard/settings/draft/[_id]`,
      '/dashboard/settings/create',
    ]);

    return {
      success: true,
      error: false,
      message: 'Save successful.',
      isLoading: false,
    };
  } catch (error) {
    shouldRedirect = false;
    if (error instanceof z.ZodError) {
      console.log('zod error');
      return {
        success: false,
        error: true,
        message: `Validation error: ${error.errors
          .map((e) => e.message)
          .join(', ')}`,
        isLoading: false,
      };
    }

    if (error instanceof Error) {
      console.log('normal error');

      return {
        success: false,
        error: true,
        message: error.message,
        isLoading: false,
      };
    }

    return {
      success: false,
      error: true,
      message: 'An unknown error occurred',
      isLoading: false,
    };
  } finally {
    if (shouldRedirect) {
      let redirectTo =
        payload.documentStatus === 'published' ? 'edit' : 'draft';
      redirect(`/dashboard/settings/${redirectTo}/${_id}`);
    }
  }
}
