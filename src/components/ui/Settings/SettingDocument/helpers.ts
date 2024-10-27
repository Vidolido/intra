import { z } from 'zod';
import {
	Collection,
	Options,
	SettingCollectionItem,
	SettingCollectionItemSchema,
	Settings,
	SettingsCollection,
} from '@/types/zod/settingSchema';
import { SearchParamsPayload } from '@/types/zod/typesZ';

const ZOptions = z.object({
	id: z.string(),
	showOptions: z.boolean(),
	options: z.object({
		edit: z.boolean(),
		expand: z.boolean(),
	}),
});
const ZOptionsState = z.array(ZOptions);
type OptionsState = z.infer<typeof ZOptionsState>;

const ZCollections = z.array(
	z.record(z.string(), z.array(SettingCollectionItemSchema))
);
type Collections = z.infer<typeof ZCollections>;

const ZParameter = z.object({
	name: z.object({
		singular: z.record(z.string(), z.string()),
	}),
});
const ZState = z.object({
	// optionsForSettings: ZOptionsState.nullable(),
	// initState: z
	// 	.object({
	// 		collections: z.array(z.any()).nullable(),
	// 		parameter: ZParameter.nullable(),
	// 	})
	// 	.nullable(),
	insertSettingsProps: z.object({
		selected: z.string().nullable(),
		parameterName: z.string(),
		collections: z.array(z.any()).nullable(),
		state: z.object({
			parameter: z.record(z.string(), z.any()),
			collections: z
				.record(z.string(), z.array(SettingCollectionItemSchema))
				.optional()
				.nullable(),
		}),
	}),
});

type State = z.infer<typeof ZState>;

export const createOptionsState = (
	settings: SettingsCollection[] | undefined | null = []
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

export const createInitialState = (
	optionsSchema: Options | null | undefined
): Options | null => {
	if (!optionsSchema) return null;
	return {
		...optionsSchema,
	};
};

type InsertSettingsState = {
	[key: string]: [] | SettingCollectionItem[];
};

export function createCollectionsState(
	collections: Collection[] | null = null
): InsertSettingsState | {} {
	if (!collections) return {};

	return collections.reduce(
		(acc, collection) => ({
			...acc,
			[collection?._id.toString()]: [],
		}),
		{}
	);
}

export const createServerState = (setting: Settings): State => {
	const collections = setting?.optionsSchema?.collections || null;
	const firstCollectionId = collections
		? collections[0]?._id?.toString()
		: null;
	const settings = setting?.settings;
	const optionsSchema = setting?.optionsSchema;

	return {
		// optionsForSettings: createOptionsState(settings),
		// initState: createInitialState(optionsSchema),
		insertSettingsProps: {
			selected: firstCollectionId,
			parameterName:
				setting?.optionsSchema?.parameter?.name?.singular?.en || '',
			collections: !collections ? [] : collections,

			state: {
				parameter: {},
				collections: createCollectionsState(collections),
			},
		},
	};
};

// Usage
//   export const createState = createServerState(setting);
