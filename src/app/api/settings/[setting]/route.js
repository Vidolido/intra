'use server';
import { connect } from '@/../conn';

import Settings from '@/app/_models/(settings)/Settings';
import { editGroupedSettings } from '../aggregation';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function GET(request, { params, searchParams }) {
	// noStore();
	cookies();
	const { nextUrl } = request;
	const lang = nextUrl.searchParams.get('lang');
	const setting = params.setting;

	try {
		await connect();
		const setingForEdit = await Settings.aggregate(
			editGroupedSettings(lang, setting)
		);
		return Response.json(...setingForEdit);
	} catch (error) {
		throw Error('Error: ' + error, 'THE SECOND ERROR');
	}
}
