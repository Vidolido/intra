// types
import { BusinessAreaResponse, SearchQueryParams } from '@/types/type';

// helper
import { queryParser } from '@/functions/queryParser';

export async function getBusinessAreas(
	searchQuery?: SearchQueryParams
): Promise<BusinessAreaResponse> {
	const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/business-areas`;

	let query = !searchQuery ? baseUrl : queryParser(baseUrl, searchQuery);

	const res = await fetch(query);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get sectors from db. Reason: ' + res);
	}

	return res.json();
}
