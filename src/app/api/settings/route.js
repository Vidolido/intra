import { connect } from '@/../conn';

import { getGroupedSettings } from './aggregation';

import Settings from '@/app/_models/Settings';
import { cookies } from 'next/headers';

export async function GET() {
	cookies();
	try {
		await connect();
		const allSettingsAg = await Settings.aggregate(getGroupedSettings);
		return Response.json(allSettingsAg);
	} catch (error) {
		throw Error('Error: ' + error, 'THE SECOND ERROR');
	}
}
