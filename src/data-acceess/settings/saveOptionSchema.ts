'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';
import { revalidatePaths } from '@/functions/reavalidatePaths';
import { Options } from '@/types/type';

export async function saveOptionSchema(state: Options, documentId: string) {
  console.log(state, 'the state');
  console.log(documentId, 'the documentId');
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
        data: null,
        success: null,
        error: true,
        message: 'Singular name is empty',
        component: 'singular',
        isLoading: false,
      };
    }
    if (isPluralEmpty == undefined) {
      return {
        data: null,
        success: null,
        error: true,
        message: 'Plural name is empty',
        component: 'plural',
        isLoading: false,
      };
    }

    if (!state.collections.length) {
      return {
        data: null,
        success: null,
        error: true,
        message: 'Add at least one collection',
        component: 'collections',
        isLoading: false,
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

    return {
      data: document,
      success: true,
      error: false,
      message: 'Schema saved to database',
      component: '',
      isLoading: false,
    };
  } catch (error) {
    console.log('Failed to save schema:', error);
    if (error instanceof Error)
      return {
        data: null,
        success: null,
        error: true,
        message: error.message,
        component: 'collections',
        isLoading: false,
      };
  }
}
