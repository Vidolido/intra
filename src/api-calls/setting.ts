// types
// import { SearchParamsProps } from '@/types/typesTS';

// helper
import { queryParser } from '@/functions/queryParser';
import { SearchQueryParams, SettingsResponse } from '@/types/type';

export async function getSettings(
	searchQuery?: SearchQueryParams
): Promise<SettingsResponse> {
	const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`;

	let query = !searchQuery ? baseUrl : queryParser(baseUrl, searchQuery);

	const res = await fetch(query);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get settings from db. Reason: ' + res);
	}

	return res.json();
}

export async function getSettingById(_id: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/${_id}`
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get setting from db. Reason: ' + res);
	}

	return res.json();
}
