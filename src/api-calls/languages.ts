// types
import { SearchParamsProps } from '@/types/types';

// helper
import { queryParser } from '@/functions/queryParser';

export async function getLanguages(searchQuery?: SearchParamsProps) {
	const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`;

	let query = !searchQuery ? baseUrl : queryParser(baseUrl, searchQuery);

	const res = await fetch(query);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get languages from db. Reason: ' + res);
	}

	return res.json();
}
