import { connect } from '@/../conn';
import Settings from '@/app/_models/(settings)/Settings';

import { getGroupedSettings } from './aggregation';

export async function GET() {
	try {
		await connect();
		const allSettingsAg = await Settings.aggregate(getGroupedSettings);
		console.log(allSettingsAg);
		// const allSettings = await Settings.find({});
		return Response.json(allSettingsAg);
	} catch (error) {
		throw Error('Error: ' + error);
	}
}
