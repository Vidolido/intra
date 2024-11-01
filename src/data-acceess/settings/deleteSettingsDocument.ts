'use server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// Да исхендлаам ерори
export async function deleteSettingDocument(_id: string, type: string) {
  try {
    await connection();
    if (type === 'draft') {
      await Setting.deleteOne({ _id });
    } else {
      await Setting.updateOne({ _id }, { $set: { isDeleted: true } });
    }
    // revalidatePath('/dashboard/settings', 'page');
    revalidatePaths([
      `/dashboard/settings/edit/[_id]`,
      `/dashboard/settings/draft/[_id]`,
      '/dashboard/settings/create',
    ]);
    // i should return a message here
    return { message: 'Setting deleted successfully' };
  } catch (error) {
    console.log('Failed to delete draft setting error:', error);
    throw Error('Could not delete setting to database: ' + error);
  }
}
