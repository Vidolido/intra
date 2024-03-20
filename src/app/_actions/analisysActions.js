'use server';
import { revalidatePath } from 'next/cache';

import { connect } from '@/../conn';

// model
import Templates from '../_models/Templates';
import Settings from '../_models/Settings';

// Да додадам try/catch блок
export async function getTemplate(product, analisysType) {
	await connect();
	const templates = await Templates.find({ product, analisysType });
	const setTemplateData = await Promise.all(
		templates.map(async (template) => {
			let templateData = await Promise.all(
				template.templateData.map(async (data) => {
					let finalArray = await Promise.all(data.map((final) => final));

					return await Promise.all(
						finalArray.map(async (item) => {
							const doc = await Settings.find({ _id: item[1] });
							return [item[0], ...doc];
						})
					);
				})
			);
			return templateData;
		})
	);

	return JSON.stringify(setTemplateData);
}
