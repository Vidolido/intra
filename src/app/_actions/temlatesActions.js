'use server';
import { headers } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';

// import mongoose from 'mongoose';
import { connect } from '@/../conn';

// model
import Templates from '../_models/Templates';

export async function getTemplate(template) {
	headers();

	try {
		await connect();
		const newTemplate = await Templates.findOne({ _id: template });
		revalidatePath('/dashboard/templates', 'page');

		revalidateTag('template');
		return JSON.stringify(newTemplate);
	} catch (error) {
		throw Error('Error: ' + error, 'TEMPLATES GET ERROR');
	}
}

export async function createTemplate(formData) {
	// Да проверам убаво дали навистина ми треба ова
	headers();
	// console.log(formData);
	try {
		await connect();
		await Templates.create(formData);

		revalidateTag('templates');
	} catch (error) {
		throw Error('Could not create template in database: ' + error);
	}
}

export async function updateTemplate({
	id,
	analisysType,
	product,
	templateData,
	deleted,
}) {
	// const { analisysType, product, templateData } = formData;
	// console.log(id, analisysType, product, templateData, 'in templatActions');
	headers();
	try {
		await connect();
		const template = await Templates.findOne({ _id: id });
		// console.log(template);
		if (!template) {
			return new Error('Template with that id does not exist');
		}
		const payload = {};

		if (analisysType !== template.analisysType) {
			// console.log('AnalisysType does not match');
			payload.$set = { ...payload.$set, analisysType }; // set the field to
		}
		if (product !== template.product) {
			// console.log('Product does not match');
			payload.$set = { ...payload.$set, product };
		}

		// console.log(templateData, 'the template');
		// console.log(template.templateData, 'the template');

		if (deleted.length) {
			payload.$set = { ...payload.$set, templateData };
		}

		console.log(payload, 'THE PAYLOAD');
		await Templates.updateOne({ _id: id }, payload);
		revalidateTag('templates');

		// console.log(result, 'the result');
	} catch (error) {
		throw Error('Could not update template: ' + error);
	}
}
