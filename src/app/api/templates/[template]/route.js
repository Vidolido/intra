'use server';
import { cookies, headers } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';

import { connect } from '@/../conn';
import Templates from '@/app/_models/Templates';

export async function GET(req, { params }) {
	cookies();
	const { template } = params;

	try {
		await connect();
		const newTemplate = await Templates.findOne({ _id: template });
		// revalidatePath('/dashboard/templates', 'page');

		revalidateTag('template');
		return Response.json(newTemplate);
	} catch (error) {
		throw Error('Error: ' + error, 'TEMPLATES GET ERROR');
	}
}
