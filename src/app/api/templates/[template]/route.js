'use server';
import { cookies, headers } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';

import { connect } from '@/../conn';
import Templates from '@/app/_models/Templates';

export async function GET(req, { params }) {
	// headers();
	const { template } = params;

	try {
		await connect();
		const newTemplate = await Templates.findOne({ _id: template });
		revalidateTag('template');
		return Response.json(newTemplate);
	} catch (error) {
		throw Error('Error: ' + error, 'TEMPLATES GET ERROR');
	}
}
