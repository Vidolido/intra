'use server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

// connection/moddels
import { connect } from '@/../conn';
import Settings from '@/app/_models/Settings';

// agregations
import { editGroupedSettings } from '../aggregation';

export async function GET(request, { params }) {
	cookies();

	const { nextUrl } = request;
	const lang = nextUrl.searchParams.get('lang');
	const { setting } = params;
	try {
		await connect();

		const settingForEddit = await Settings.aggregate(
			editGroupedSettings(lang, setting)
		);
		revalidateTag('setting');
		return Response.json(...settingForEddit);
	} catch (error) {
		throw Error('Error: ' + error, 'THE SECOND ERROR');
	}
}
