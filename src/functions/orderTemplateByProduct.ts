import {
	LaboratoryTemplate,
	OrderByProductOutput,
	SettingsCollection,
} from '@/types/type';

export const orderByProduct = (
	templates: LaboratoryTemplate[],
	products: SettingsCollection[]
): OrderByProductOutput[] => {
	let ordered = products?.map((product) => {
		let filteredTemplates = templates.filter(
			(template) => template?.product === product._id.toString()
		);

		return {
			_id: product?._id?.toString(),
			product: product?.parameter,
			templates: filteredTemplates,
		};
	});
	return ordered;
};
