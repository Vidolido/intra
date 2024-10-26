import { z } from 'zod';
import { Types } from 'mongoose';
import { isDeleted } from './types';

// export const LanguageMapSchema = z.map(z.string(), z.string());
export const LanguageMapSchema = z.record(z.string(), z.string());

export const ParameterSchema = z.object({
	name: z.object({
		singular: LanguageMapSchema,
		plural: LanguageMapSchema,
	}),
});

export const CollectionSchema = z.object({
	_id: z.instanceof(Types.ObjectId),
	name: LanguageMapSchema,
});

export const OptionsSchema = z.object({
	parameter: ParameterSchema,
	collections: z.array(CollectionSchema),
});

export const ValueSchema = z.union([z.string(), z.number(), LanguageMapSchema]);

export const SettingCollectionItemSchema = z.object({
	_id: z.instanceof(Types.ObjectId),
	inputType: z.string(),
	value: ValueSchema,
});

export const SettingsCollectionSchema = z.object({
	_id: z.union([z.instanceof(Types.ObjectId), z.string()]),
	parameter: LanguageMapSchema,
	collections: z.record(
		z
			.array(SettingCollectionItemSchema)
			.length(0)
			.or(z.array(SettingCollectionItemSchema))
	),
});

export const SettingsSchema = z.object({
	documentStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
	isDeleted: isDeleted,
	_id: z.instanceof(Types.ObjectId),
	settingName: z.string().optional(),
	businessArea: z.instanceof(Types.ObjectId).optional(),
	optionsSchema: OptionsSchema.optional(),
	settings: z.array(SettingsCollectionSchema).optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Languages = z.infer<typeof LanguageMapSchema>;
export type Parameter = z.infer<typeof ParameterSchema>;
export type Collection = z.infer<typeof CollectionSchema>;
export type Options = z.infer<typeof OptionsSchema>;
export type Value = z.infer<typeof ValueSchema>;
export type SettingCollectionItem = z.infer<typeof SettingCollectionItemSchema>;
export type SettingsCollection = z.infer<typeof SettingsCollectionSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
