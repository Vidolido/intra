'use server';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';

// db connection
import { connect } from '@/../conn';

// model
import Templates from '../_models/Templates';
import Settings from '../_models/Settings';

// Да додадам try/catch блок
// и да направам рекурзивна функција за оваа проблематика
export async function getTemplate(product, analisysType) {
	// console.log(product, analisysType, 'in getTemplate in analisysActions');
	try {
		headers();
		cookies();
		await connect();
		const templates = await Templates.find({ product, analisysType });
		const setTemplateData = await Promise.all(
			templates.map(async (template) => {
				let templateData = await Promise.all(
					template.templateData.map(async (data) => {
						let finalArray = await Promise.all(data.map((final) => final));

						return await Promise.all(
							finalArray.map(async (item) => {
								try {
									// headers();
									// cookies();
									await connect();

									const doc = await Settings.find({ _id: item[1] });
									return [item[0], ...doc];
								} catch (error) {
									if (error.code === 'ECONNREFUSED') {
										console.error('Connection to the server was refused.');
										// Additional error handling specific to ECONNREFUSED can be added here
									} else {
										console.error('An error occurred:', error.message);
										// Handle other types of errors here
									}
								}
							})
						);
					})
				);
				return templateData;
			})
		);
		revalidatePath('/dashboard/analisys/create', 'page');
		return JSON.stringify(setTemplateData);
	} catch (error) {
		if (error.code === 'ECONNREFUSED') {
			console.error('Connection to the server was refused.');
			// Additional error handling specific to ECONNREFUSED can be added here
		} else {
			console.error('An error occurred:', error.message);
			// Handle other types of errors here
		}
	}
}

export async function createAnalisys(formData) {
	console.log(formData);
}
