import { connect } from '@/../conn';

import Settings from '@/app/_models/(settings)/Settings';
import { getGroupedSettings } from './aggregation';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function GET() {
	// noStore();
	cookies();
	try {
		await connect();
		const allSettingsAg = await Settings.aggregate(getGroupedSettings);
		return Response.json(allSettingsAg);
	} catch (error) {
		throw Error('Error: ' + error, 'THE SECOND ERROR');
	}
}
