import { Model, Types } from 'mongoose';
import { ReactNode, FocusEvent, Dispatch, SetStateAction } from 'react';
import { nullable, z } from 'zod';

const ReactNodeSchema = z.custom<ReactNode>((data) => true);
export type ReactNodes = z.infer<typeof ReactNodeSchema>;
export type LayoutType = {
	children: ReactNodes;
};

//--navigation
export type LinkItem = {
	label: LanguageMap;
	path: string;
};

export type LinkContents = LinkItem & {
	additionalLinks?: LinkItem[] | null;
};

export type LinksStateTypes = {
	[key: string]: LinkContents;
};

export type LinksProps = {
	link: LinkItem;
	location: string;
};
export type LinksType = {
	links: LinkItem | LinkItem[];
};
//--navigation

export const isDeleted = z
	.preprocess((val) => val === 'true', z.boolean())
	.default(false);

// export const SeachQueryParamsSchema = z.record(
//   z.string(),
//   z.union([z.string(), z.boolean(), z.array(z.string())]),
// );
export const SearchQueryParamsSchema = z
	.object({
		documentStatus: z.string().optional(),
		// isDeleted: z.string().optional(),
		isDeleted: z.boolean().optional(),
		settingName: z.union([z.string(), z.array(z.string())]).optional(),
	})
	.catchall(z.union([z.string(), z.boolean(), z.array(z.string())]));

//queryParser
export type SearchQueryParams = z.infer<typeof SearchQueryParamsSchema>;
export const BaseUrlSchema = z.string().url().startsWith('http');
export type BaseUrl = z.infer<typeof BaseUrlSchema>;
//queryParser

// Languages
// export const LanguageMapSchema = z.record(z.string());
export const LanguageMapSchema = z.union([
	z.record(z.string()),
	z.custom<Map<string, string>>((data) => data instanceof Map),
]);
export const LanguageSchema = z.object({
	_id: z.instanceof(Types.ObjectId),
	language: z.string(),
	documentStatus: z.enum(['draft', 'published']).default('draft'),
	active: z.boolean().default(false),
	isDeleted: isDeleted,
});
export type LanguageMap = z.infer<typeof LanguageMapSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export interface LanguagesDocument extends Language, Document {}
export type LanguageModel = Model<LanguagesDocument>;

// Languages

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
// BusinessAreas

// Settings

export const ParameterSchema = z.object({
	name: z.object({
		singular: LanguageMapSchema,
		plural: LanguageMapSchema,
	}),
});

export const CollectionSchema = z.object({
	_id: z.union([z.instanceof(Types.ObjectId), z.string()]).optional(),
	// id: z.string().optional(),
	name: LanguageMapSchema,
});
export type Collection = z.infer<typeof CollectionSchema>;

export const OptionsSchema = z.object({
	parameter: ParameterSchema,
	collections: z.array(CollectionSchema),
});

export type Options = z.infer<typeof OptionsSchema>;

const KeyValueSchema = z.object({
	key: z.string(),
	value: z.string(),
});

export type KeyValueProps = z.infer<typeof KeyValueSchema>;

export const ValueSchema = z.union([
	z.string(),
	LanguageMapSchema,
	KeyValueSchema,
]);

export type ItemValue = z.infer<typeof ValueSchema>;

export const SettingCollectionItemSchema = z.object({
	id: z.string().optional(),
	_id: z.union([z.instanceof(Types.ObjectId), z.string()]),
	inputType: z.string(),
	value: ValueSchema,
});

export const SettingsCollectionSchema = z.object({
	_id: z.union([z.instanceof(Types.ObjectId), z.string()]),
	parameter: LanguageMapSchema,
	collections: z.record(z.array(SettingCollectionItemSchema)),
	result: z.string().optional(),
	marginError: z.string().optional(),
});

export const CollectionsOutputSchema = z
	.record(z.string(), z.array(SettingCollectionItemSchema).default([]))
	.default({});

export type CollectionsOutput = z.infer<typeof CollectionsOutputSchema>;

export const InsertSettingsStateSchema = z.object({
	parameter: LanguageMapSchema,
	collections: CollectionsOutputSchema,
});

export type InsertSettingsState = z.infer<typeof InsertSettingsStateSchema>;

const InputTypeSchema = z.enum(['simple', 'translations', 'key/value']);

export type InputType = z.infer<typeof InputTypeSchema>;

const InsertSettingDataSchema = z.union([
	z.string(),
	LanguageMapSchema,
	KeyValueSchema,
]);

export type InsertSettingData = z.infer<typeof InsertSettingDataSchema>;

export const SettingSchema = z.object({
	documentStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
	isDeleted: isDeleted,
	_id: z.instanceof(Types.ObjectId),
	settingName: z.string().optional(),
	businessArea: z
		.union([
			z.instanceof(Types.ObjectId).optional(),
			BusinessAreasSchema.optional(),
		])
		.optional(),
	optionsSchema: OptionsSchema.optional(),
	settings: z.array(SettingsCollectionSchema).optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Languages = z.infer<typeof LanguageMapSchema>;
export type Parameter = z.infer<typeof ParameterSchema>;
export type Value = z.infer<typeof ValueSchema>;
export type SettingCollectionItem = z.infer<typeof SettingCollectionItemSchema>;
export type SettingsCollection = z.infer<typeof SettingsCollectionSchema>;

export type Setting = z.infer<typeof SettingSchema>;
export type SettingsArray = Setting[];
// export type SettingsResponse = Record<string, Setting>;
export interface SettingsDocument extends Setting, Document {}
export type SettingsModel = Model<SettingsDocument>;

export const SettingHeaderSchema = z.object({
	businessArea: z.string(),
	settingName: z.string(),
	documentStatus: z.string().default('draft'),
});
export type SettingHeader = z.infer<typeof SettingHeaderSchema>;

const BusinessAreaGroupShema = z.object({
	name: z.string(),
	documents: z.array(SettingSchema),
});

export type BusinessAreaGroup = z.infer<typeof BusinessAreaGroupShema>;
// Settings

// LaboratoryTemplates
export const GroupedSchema = z.object({
	isGrouped: z.boolean().default(false),
	group: z
		.object({
			_id: z.instanceof(Types.ObjectId),
			name: LanguageMapSchema,
		})
		.optional(),
});

export type Grouped = z.infer<typeof GroupedSchema>;

export const TemplateCollectionItemSchema = z.object({
	value: z.string(),
	_id: z.instanceof(Types.ObjectId),
});

export type CollectionItem = z.infer<typeof TemplateCollectionItemSchema>;

export const TemplateSchema = z.object({
	parameter: ParameterSchema,
	collections: z.record(z.array(TemplateCollectionItemSchema)).optional(),
	result: z.string().default('0'),
	marginError: z.string().nullable().default(null),
	grouped: GroupedSchema.optional(),
	isDeleted: isDeleted,
	_id: z.instanceof(Types.ObjectId),
});

export type Template = z.infer<typeof TemplateSchema>;

// Laboratory Templates Schema
export const LaboratoryTemplatesHeaderSchema = z.object({
	product: z.string().optional(),
	// sampleType: z.string().optional(),
	// origin: z.string().optional(),
	// documentType: z.string().optional(),
	templateName: z.string().optional(),
});

export type LaboratoryTemplatesHeader = z.infer<
	typeof LaboratoryTemplatesHeaderSchema
>;

// export const NamesSchema = z.object({
//   parameter: ParameterSchema.optional(),
//   collections: z.array(CollectionSchema).optional(),
// });

export const NamesSchema = z.object({
	parameter: z
		.object({
			name: z.object({
				singular: LanguageMapSchema,
				plural: LanguageMapSchema,
			}),
		})
		.optional(),
	collections: z.array(CollectionSchema).optional(),
});

export type SchemaNames = z.infer<typeof NamesSchema>;

export const LaboratoryTemplateSchema = z.object({
	_id: z.instanceof(Types.ObjectId).optional(),
	product: z.string().optional(),
	templateName: z.string().optional(),
	// header: LaboratoryTemplatesHeaderSchema.optional(),
	schemaNames: NamesSchema.optional(),
	template: z.array(TemplateSchema).optional(),
	documentStatus: z.enum(['draft', 'published', 'archived']).default('draft'),
	isDeleted: isDeleted,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type LaboratoryTemplate = z.infer<typeof LaboratoryTemplateSchema>;
export interface LaboratoryTemplateDocument
	extends LaboratoryTemplate,
		Document {}
export type LaboratoryTemplateModel = Model<LaboratoryTemplateDocument>;
export type TemplateResponse = Record<string, LaboratoryTemplate[]>;
// LaboratoryTemplates

const ResetComponentsDataSchema = z.object({
	singular: z.boolean().optional(),
	plural: z.boolean().optional(),
	collections: z.boolean().optional(),
	collection: z.string().optional(),
});
export type ResetComponentsData = z.infer<typeof ResetComponentsDataSchema>;

const ZMetadataSchema = z.object({
	id: z.string().default(''),
	name: z.string().default(''),
	type: z.string().default(''),
});
export type Metadata = z.infer<typeof ZMetadataSchema>;

const ZExtractDataSchema = z
	.function()
	.args(z.string(), ZMetadataSchema)
	.returns(z.void());

const ResetSchema = z.object({
	resetData: ResetComponentsDataSchema,
	setReset: z
		.function()
		.args(
			z.union([
				ResetComponentsDataSchema,
				z
					.function()
					.args(ResetComponentsDataSchema)
					.returns(ResetComponentsDataSchema),
			])
		)
		.returns(z.void()),
	components: z.array(z.string()),
});
export type Reset = z.infer<typeof ResetSchema>;

// Forms
const SettingsHeaderStateSchema = z.object({
	message: z.string().nullable(),
});
export type SettingsHeaderFormState = {
	message: string | null;
	success: boolean | null;
	error: boolean | null;
};
// Forms

//makeDraft
export type ModelType = 'Setting' | 'LaboratoryTemplate';

export interface CreateDraftProps {
	model: ModelType;
	redirectPath: string;
	buttonText: string;
	additionalData?: Record<string, any>;
}

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
	data: z.null().optional(),
	success: z.boolean().nullable().optional(),
	error: z.boolean().optional(),
	message: z.string().nullable(),
	component: z.string().nullable().optional(),
	isLoading: z.boolean().default(false),
});

export const ActionResponseSchema = z.union([
	SuccessResponseSchema,
	ErrorResponseSchema,
]);

export type ActionResponse = z.infer<typeof ActionResponseSchema>;
//makeDraft

//mutateForSelect
const HasIdAndNameSchema = z.object({
	_id: z.union([z.instanceof(Types.ObjectId), z.string()]).optional(),
	name: LanguageMapSchema,
});

export type HasIdAndName = z.infer<typeof HasIdAndNameSchema>;
//mutateForSelect

// Reusables
// NormalInputComponent
const ZInputData = z.object({
	_id: z.string().optional(),
	name: z.string().optional(),
	label: z.string().optional(),
	labelClass: z.string().optional(),
	type: z
		.enum(['text', 'number', 'email', 'password', 'tel', 'url', 'search'])
		.optional(),
	state: z.string().optional(),
	required: z.boolean().optional(),
	defaultValue: z.string().optional(),
	placeholder: z.string().optional(),
	fieldsetClass: z.string().optional(),
	inputClass: z.string().optional(),
	helperText: z.string().optional(),
	error: z.boolean().optional(),
	disabled: z.boolean().optional(),
});

type InputData = z.infer<typeof ZInputData>;

export interface NormalInputProps {
	data?: InputData | null;
	type?: 'default' | 'primary' | 'error' | 'success';
	extractData?: ((value: string, metadata: Metadata) => void) | null;
	reset?: Reset | null;
	onChange?: (value: string) => void;
	onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}
// NormalInputComponent
// SelectInputComponent
export const ZOptionType = z.object({
	_id: z.union([z.string(), z.null()]).nullable().optional(),
	value: z.string().optional(),
});

export const ZData = z.object({
	state: z
		.array(
			z.object({
				_id: z.union([z.string(), z.null()]).optional(),
				name: LanguageMapSchema,
			})
		)
		.optional(),
	fieldSetClass: z.string().optional(),
	label: z.string().optional(),
	id: z.string().optional(),
	selectName: z.string().optional(),
	selectClasses: z.string().optional(),
	//   classes: z.string().optional(),
	showEmptyOption: z.boolean().optional(),
	defaultValue: z.string().optional(),
	defaultLanguage: z.string().optional(),
	error: z.boolean().optional(),
});
export type Data = z.infer<typeof ZData>;

export type SelectInputProps = {
	data?: Data | null;
	extractData?: (id: string, metadata: Metadata) => void;
	reset?: Reset;
};
export type OptionType = z.infer<typeof ZOptionType>;

export const LanguageInputComponentSchema = z.record(z.string(), z.string());
export type LanguageInputComponent = z.infer<
	typeof LanguageInputComponentSchema
>;

const LanguageInputDataSchema = z
	.object({
		id: z.string().optional(),
		state: LanguageInputComponentSchema.optional(),
		defaultLanguage: z.string().optional(),
		label: z.string().optional(),
		labelClass: z.string().optional(),
		inputName: z.string().optional(),
		inputClass: z.string().optional(),
		fieldSetName: z.string().optional(),
		fieldSetClass: z.string().optional(),
		required: z.boolean().optional(),
		disabled: z.boolean().optional(),
		error: z.boolean().optional(),
		helperText: z.string().optional(),
	})
	.nullable();
export type LanguageInputData = z.infer<typeof LanguageInputDataSchema>;

// LanguageInputComponent
// Reusables

const ZOptions = z.object({
	_id: z.string(),
	showOptions: z.boolean(),
	edit: z.boolean(),
	expand: z.boolean(),
});
const ZOptionsState = z.array(ZOptions);
export type OptionsState = z.infer<typeof ZOptionsState>;

const ZCollections = z.array(
	z.record(z.string(), z.array(SettingCollectionItemSchema))
);
export type Collections = z.infer<typeof ZCollections>;

const ZState = z.object({
	insertSettingsProps: z.object({
		selected: z.string().nullable(),
		parameterName: z.string(),
		// collections: z.array(z.any()).nullable(),
		collections: z.array(CollectionSchema).nullable(),
		state: z.object({
			parameter: z.record(z.string(), z.any()),
			collections: z
				.record(z.string(), z.array(SettingCollectionItemSchema))
				.optional()
				.nullable(),
		}),
	}),
});

export type State = z.infer<typeof ZState>;

export type OrderByProductOutput = {
	_id: string;
	product: LanguageMap;
	templates: LaboratoryTemplate[];
};
// helper functions

// Buttons
export type ContextButtonProps = {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	type: 'default' | 'edit' | 'delete';
	classes?: string;
	disabled?: boolean;
	formMethod?: string;
};

export const SearchParamData = z.record(z.union([z.string(), z.boolean()]));
export interface SearchParamsPayload {
	documentStatus?: string;
	isDeleted: boolean;
	settingName?: {
		$in: string[];
	};
	[key: string]: any;
}

export const SettingQuerySchema = z.object({
	documentStatus: z.enum(['draft', 'published']).optional(),
	isDeleted: z.boolean().default(false),
	settingName: z.union([z.string(), z.array(z.string())]).optional(),
});

export type SettingQuery = z.infer<typeof SettingQuerySchema>;
export type DynamicTemplateSettings = {
	[key: string]: Setting;
};

export type SettingsArrayResponse = {
	settings: Setting[];
};

export type SettingsResponse = SettingsArrayResponse | DynamicTemplateSettings;
