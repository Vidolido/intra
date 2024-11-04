'use server';
import { revalidatePath } from 'next/cache';

// moddels/db functions
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import connection from '@/db/connection';

// Да исхендлаам ерори
export async function deleteTemplate(_id: string, documentStatus: string) {
  try {
    await connection();
    let deleted;
    if (documentStatus === 'draft') {
      deleted = await LaboratoryTemplate.deleteOne({ _id });
    }
    if (documentStatus === 'published') {
      deleted = await LaboratoryTemplate.updateOne(
        { _id },
        { $set: { isDeleted: true } }
      );
    }
    revalidatePath('/dashboard/laboratory/templates', 'page');
    // return JSON.stringify(draft);

    // just for test, delete later
    return { message: deleted };
  } catch (error) {
    console.log('Failed to create draft setting error:', error);
    throw Error('Could not add draft setting to database: ' + error);
  }
}
