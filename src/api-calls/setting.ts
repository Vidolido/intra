// types
import { SearchParamsProps } from '@/types/types';

// helper
import { queryParser } from '@/functions/queryParser';

export async function getSettings(searchQuery?: SearchParamsProps) {
	const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`;

	let query = !searchQuery ? baseUrl : queryParser(baseUrl, searchQuery);

	const res = await fetch(query);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get settings from db. Reason: ' + res);
	}

	return res.json();
}
