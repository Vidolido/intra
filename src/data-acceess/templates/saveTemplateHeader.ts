'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// connection/moddels/database functions
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import connection from '@/db/connection';

// I NEED TO HANDLE ERRORS HERE
export async function saveTemplateHeader(_id: string, formData: FormData) {
  console.log(_id, 'the id');
  console.log(formData, 'the formData');
  const documentStatus = !formData?.get('status')
    ? 'draft'
    : formData.get('status');
  const payload = {
    product: formData.get('product'),
    sampleType: formData.get('sampleType'),
    origin: formData.get('origin'),
    documentType: formData.get('documentType'),
  };
  let shouldRedirect = false;
  try {
    await connection();
    let updated = await LaboratoryTemplate.updateOne(
      { _id },
      { $set: { documentStatus, header: payload } }
    );

    shouldRedirect = updated.modifiedCount === 1 ? true : false;

    const pathsToRevalidate = [
      '/dashboard/laboratory/templates/draft/[_id]',
      '/dashboard/laboratory/templates/edit/[_id]',
      '/dashboard/laboratory/templates/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));
    // shouldRedirect = updated.modifiedCount === 1 ? true : false;
  } catch (error) {
    console.log('Failed to save template header, error:', error);
    return {
      error: error.message,
    };
    // console.log('Failed to create draft Template error:', error);
    // throw Error('Could not add draft Template to database: ' + error);
  } finally {
    if (shouldRedirect) {
      let redirectTo = documentStatus === 'published' ? 'edit' : 'draft';
      redirect(`/dashboard/laboratory/templates/${redirectTo}/${_id}`);
    }
  }
}

// if (payload.documentStatus === 'published') {
//   redirect(`/dashboard/laboratory/templates/edit/${_id}`);
// } else {
//   redirect(`/dashboard/laboratory/templates/draft/${_id}`);
// }
