export const mutateTemplateSettings = (templateSettings) => {
	return templateSettings.reduce((acc, currentValue) => {
		switch (currentValue.settingName) {
			case 'Products': {
				acc = {
					...acc,
					products: currentValue,
				};
				break;
			}
			case 'Types': {
				acc = {
					...acc,
					types: currentValue,
				};
				break;
			}
			case 'Countries': {
				acc = {
					...acc,
					countries: currentValue,
				};
				break;
			}
			case 'Fields': {
				acc = {
					...acc,
					fields: currentValue,
				};
				break;
			}
			case 'Laboratory Templates': {
				acc = {
					...acc,
					laboratoryTemplates: currentValue,
				};
				break;
			}

			default: {
				return acc;
			}
		}
		return acc;
	}, {});
};
