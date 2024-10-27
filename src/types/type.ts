import { Model, Types } from 'mongoose';
import { ReactNode } from 'react';
import { z } from 'zod';

const ReactNodeSchema = z.custom<ReactNode>((data) => true);
export type ReactNodes = z.infer<typeof ReactNodeSchema>;
export type LayoutType = {
	children: ReactNodes;
};

export const isDeleted = z
	.preprocess((val) => val === 'true', z.boolean())
	.default(false);

export const SeachQueryParamsSchema = z.record(
	z.string(),
	z.union([z.string(), z.boolean(), z.array(z.string())])
);

//queryParser
export type SearchQueryParams = z.infer<typeof SeachQueryParamsSchema>;
export const BaseUrlSchema = z.string().url().startsWith('http');
export type BaseUrl = z.infer<typeof BaseUrlSchema>;
// export const QueryParserSchema = z.record(
// 	z.union([z.string(), z.array(z.string()), z.boolean()])
// );

// export type QueryParser = z.infer<typeof QueryParserSchema>;
//queryParser

// Languages
export const LanguageMapSchema = z.record(z.string(), z.string());
export const LanguageSchema = z.object({
	_id: z.instanceof(Types.ObjectId),
	language: z.string(),
	documentStatus: z.enum(['draft', 'published']).default('draft'),
	active: z.boolean().default(false),
	isDeleted: isDeleted,
});
export type LanguageMap = z.infer<typeof LanguageSchema>;
export type LanguageSchema = z.infer<typeof LanguageSchema>;
export interface LanguagesDocument extends LanguageSchema, Document {}
export type LanguageModel = Model<LanguagesDocument>;

// BusinessAreas
export const BusinessAreasSchema = z.object({
	_id: z.instanceof(Types.ObjectId),
	name: LanguageMapSchema.optional(),
	documentStatus: z.enum(['draft', 'published']).default('draft'),
	isDeleted: isDeleted,
});

export type BusinessAreas = z.infer<typeof BusinessAreasSchema>;
export type BusinessAreaResponse = Record<string, BusinessAreas[]>;
export interface BusinessAreasDocument extends BusinessAreas, Document {}
export type BusinessModel = Model<BusinessAreasDocument>;

// Settings
export const ParameterSchema = z.object({
	name: z.object({
		singular: LanguageMapSchema,
		plural: LanguageMapSchema,
	}),
});

export const CollectionSchema = z.object({
	_id: z.union([z.instanceof(Types.ObjectId), z.string()]),
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

export const SettingSchema = z.object({
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

export type Setting = z.infer<typeof SettingSchema>;
export type SettingsResponse = Record<string, Setting[]>;
export interface SettingsDocument extends Setting, Document {}
export type SettingsModel = Model<SettingsDocument>;

//makeDraft
const dataSchema = z.record(
	z.string(),
	z.union([
		z.string(),
		z.instanceof(Types.ObjectId),
		z.record(z.string(), z.union([z.string(), z.instanceof(Types.ObjectId)])),
	])
);
export const SuccessResponseSchema = z.object({
	data: dataSchema.nullable().default(null),
	success: z.boolean().default(true).nullable(),
	error: z.boolean().default(false).nullable(),
	message: z.string().nullable().default(null),
	component: z.string().nullable(),
	isLoading: z.boolean().default(false),
});

export const ErrorResponseSchema = z.object({
	data: z.null(),
	success: z.boolean().nullable(),
	error: z.boolean(),
	message: z.string().nullable(),
	component: z.string().nullable(),
	isLoading: z.boolean().default(false),
});

export const ActionResponseSchema = z.union([
	SuccessResponseSchema,
	ErrorResponseSchema,
]);

export type ActionResponse = z.infer<typeof ActionResponseSchema>;
//makeDraft
