import { formatKeyValue } from '@/functions/formatKeyValue';
import {
	Collection,
	CollectionsOutput,
	CollectionsOutputSchema,
	Options,
	OptionsState,
	Setting,
	SettingCollectionItem,
	SettingsCollection,
	Value,
} from '@/types/type';

export const createOptionsState = (
	settings: SettingsCollection[]
): OptionsState => {
	if (!settings || !Array.isArray(settings)) return [];

	return settings.map((setting) => ({
		_id: setting._id.toString(),
		showOptions: false,
		edit: false,
		expand: false,
	}));
};

export function createCollectionsState(
	collections: Collection[]
): CollectionsOutput {
	if (!collections) return {};

	const result = {
		collections: {},
	};

	collections.forEach((collection) => {
		if (collection?._id) {
			const id = collection._id.toString();
			result.collections = {
				...result.collections,
				[id]: [],
			};
		}
	});

	return CollectionsOutputSchema.parse(result.collections);
}

export const createOptionsSchemaState = (
	optionsSchema: Options | undefined
): Options => {
	return {
		parameter: optionsSchema?.parameter || {
			name: {
				singular: {},
				plural: {},
			},
		},
		collections: optionsSchema?.collections || [],
	};
};

export const typeOfValue = (
	item: SettingCollectionItem,
	language: string
): string => {
	if (item.inputType === 'simple') {
		return String(item.value);
	}
	if (
		item.inputType === 'translations' &&
		typeof item.value === 'object' &&
		item.value !== null
	) {
		return String(item.value[language as keyof Value] || '');
	}
	if (
		item.inputType === 'key/value' &&
		typeof item.value === 'object' &&
		'key' in item.value
	) {
		const keyValue = item.value as { key: string; value: string };
		let formated = formatKeyValue(keyValue.key, keyValue.value, 'min', 'max');
		return formated;
	}
	return '';
};
