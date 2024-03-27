'use server';
import { cookies, headers } from 'next/headers';

import { connect } from '@/../conn';
import Templates from '@/app/_models/Templates';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET() {
	headers();
	try {
		await connect();
		const getTemplates = await Templates.find({});
		revalidateTag('templates');
		return Response.json(getTemplates);
	} catch (error) {
		console.log(error);
		throw Error('Error: ' + error, 'TEMPLATES GET ERROR');
	}
}
