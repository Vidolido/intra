import { queryParser } from '@/functions/queryParser';
import { SearchQueryParams, TemplateResponse } from '@/types/type';

export async function getLaboratoryTemplates(
  searchQuery: SearchQueryParams
): Promise<TemplateResponse> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/laboratory/templates/get-laboratory-templates`;

  let query = queryParser(baseUrl, searchQuery);

  const res = await fetch(query);

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get draft document from db. Reason: ' + res);
  }

  return res.json();
}

export async function getTemplateById(_id: string) {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/laboratory/templates/${_id}`;

  const res = await fetch(baseUrl);

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get draft template from db. Reason: ' + res);
  }

  return res.json();
}
