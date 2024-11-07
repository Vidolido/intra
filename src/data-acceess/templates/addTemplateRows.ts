'use server';
import { revalidatePath } from 'next/cache';

// moddels/db functions
import connection from '@/db/connection';
import { LaboratoryTemplate } from '@/db/models';

// I NEED TO HANDLE ERRORS HERE
export async function addTemplateRows({
  property,
  mutCollections,
  additional,
  group,
  document,
}) {
  let payload = {
    parameter: property,
    collections: mutCollections,
    result: additional.result,
    grouped: !group ? {} : { isGrouped: true, group },

    marginError: additional.marginError,
  };

  try {
    await connection();
    const foundDocument = await LaboratoryTemplate.findOne({ _id: document });
    let template =
      foundDocument && foundDocument.template ? foundDocument.template : [];
    template.push(payload);

    let updatedTemplate = await LaboratoryTemplate.updateOne(
      { _id: document },
      { $set: { template } }
    )
      .lean()
      .exec();

    const pathsToRevalidate = [
      `/dashboard/laboratory/templates/edit/[_id]`,
      `/dashboard/laboratory/templates/draft/[_id]`,
      '/dashboard/laboratory/templates/create',
    ];

    pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

    revalidatePath('/dashboard/laboratory/templates/create', 'page');
    return {
      message: 'addTemplateSetting ran',
      updatedTemplate,
    };
  } catch (error) {
    console.log('Failed to create draft Template error:', error);
    throw Error('Could not add draft Template to database: ' + error);
  }
}
