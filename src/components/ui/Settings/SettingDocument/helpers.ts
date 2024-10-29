import {
	Collection,
	CollectionsOuput,
	CollectionsOutputSchema,
	Options,
	OptionsState,
	Setting,
	SettingCollectionItem,
	State,
} from '@/types/type';
import { RmOptions } from 'fs';

export const createOptionsState = (
	settings: Setting[] | undefined | null = []
): OptionsState | null => {
	if (!settings) return null;

	return (
		settings?.map((setting) => ({
			id: setting?._id.toString(),
			showOptions: false,
			options: {
				edit: false,
				expand: false,
			},
		})) || null
	);
};

// export const createInitialState = (
// 	optionsSchema: Options | null | undefined
// ): Options | null => {
// 	if (!optionsSchema) return null;
// 	return {
// 		...optionsSchema,
// 	};
// };
// export const createInitialState = (optionsSchema: Options): Options => {
// 	// if (!optionsSchema) return null;
// 	return {
// 		...optionsSchema,
// 	};
// };

// type CollectionsOuput = {
//   collections: {
//     [key: string]: SettingCollectionItem[];
//   };
// };

export function createCollectionsState(
	collections: Collection[] | null = null
): CollectionsOuput | {} {
	if (!collections) return { collections: {} };

	const result: CollectionsOuput = {
		collections: {},
	};
	collections.forEach((collection) => {
		if (collection?._id) {
			const id = collection._id.toString();
			if (result.collections) result.collections[id] = [];
		}
	});

	return CollectionsOutputSchema.parse(result);
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

export const createServerState = (setting: Setting): State => {
	const collections = setting?.optionsSchema?.collections || null;
	const firstCollectionId = collections
		? collections[0]?._id?.toString()
		: null;

	return {
		insertSettingsProps: {
			selected: firstCollectionId || null,
			parameterName:
				setting?.optionsSchema?.parameter?.name?.singular?.en || '',
			collections: !collections ? [] : collections,

			state: {
				parameter: {},
				collections: createCollectionsState(collections) || {},
			},
		},
	};
};

// // Usage
// //   export const createState = createServerState(setting);
