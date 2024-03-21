'use server';
import { headers } from 'next/headers';
import { revalidateTag } from 'next/cache';

import { connect } from '@/../conn';

// model
import Templates from '../_models/Templates';

export async function createTemplate(formData) {
	// Да проверам убаво дали навистина ми треба ова
	headers();
	// console.log(formData);
	try {
		await connect();
		await Templates.create(formData);

		revalidateTag('templates');
	} catch (err) {
		throw err;
	}
}
