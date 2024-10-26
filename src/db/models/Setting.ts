import { SettingsDocument, SettingsModel } from '@/types/types';
import mongoose, { Schema } from 'mongoose';

const parameterSchema = new Schema(
	{
		name: {
			singular: {
				type: Map,
				of: String,
				// required: true,
				// validate: {
				// 	validator: function (map: Map<string, string>) {
				// 		return map.size > 0;
				// 	},
				// 	message: 'Singular name must have at least one language entry',
				// },
				default: undefined,
			},
			plural: {
				type: Map,
				of: String,
				// required: true,
				// validate: {
				// 	validator: function (map: Map<string, string>) {
				// 		return map.size > 0;
				// 	},
				// 	message: 'Plural name must have at least one language entry',
				// },
				// default: undefined,
			},
		},
	},
	{ _id: false, strict: true }
);

const collectionSchema = new Schema(
	{
		name: {
			type: Map,
			of: String,
			// validate: {
			// 	validator: function (map: Map<string, string>) {
			// 		return map.size > 0;
			// 	},
			// 	message: 'Collection name must have at least one language entry',
			// },
			// default: undefined,
		},
	},
	{ _id: true, strict: true }
);

const optionsSchema = new Schema(
	{
		parameter: {
			type: parameterSchema,
			// validate: {
			// 	validator: function (map: Map<string, string>) {
			// 		return map.size > 0;
			// 	},
			// 	message: 'Parameter name must have at least one language entry',
			// },
			// default: undefined,
		},
		collections: [collectionSchema],
	},
	{ _id: false, strict: true }
);

const settingCollectionItemSchema = new Schema(
	{
		inputType: {
			type: String,
			required: true,
			enum: ['simple', 'translations', 'key/value'],
		},
		value: {
			type: Schema.Types.Mixed,
			validate: {
				validator: function (v: unknown) {
					return (
						typeof v === 'string' || typeof v === 'number' || v instanceof Map
					);
				},
				message:
					'Setting value must be a text, number, or a language translation.',
			},
		},
	},
	{ _id: true, strict: true }
);

const settingsCollectionSchema = new Schema(
	{
		parameter: {
			type: Map,
			of: String,
		},
		collections: {
			type: Map,
			of: [settingCollectionItemSchema],
		},
	},
	{ _id: true }
);

const settingsSchema: Schema = new Schema<SettingsDocument, SettingsModel>(
	{
		settingName: {
			type: String,
			// validate: {
			// 	validator: function (v: string) {
			// 		return v.length >= 2;
			// 	},
			// 	message: 'Setting name must be at least 2 characters long',
			// },
			default: undefined,
		},
		businessArea: {
			type: Schema.Types.ObjectId,
			ref: 'BusinessArea',
			// required: true,
			// validate: {
			// 	validator: function (v: mongoose.Types.ObjectId) {
			// 		return mongoose.Types.ObjectId.isValid(v);
			// 	},
			// 	message: 'Invalid Business Area ID',
			// },
			default: undefined,
		},
		optionsSchema: {
			type: optionsSchema,
			default: undefined,
		},
		settings: {
			type: [settingsCollectionSchema],
			default: undefined,
		},
		documentStatus: {
			type: String,
			enum: ['draft', 'published', 'archived'],
			default: 'draft',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		strict: true,
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

settingsSchema.index({ settingName: 1 });
settingsSchema.index({ businessArea: 1 });
settingsSchema.index({ documentStatus: 1 });
settingsSchema.index({ isDeleted: 1 });

const Setting =
	(mongoose.models.Setting as SettingsModel) ||
	mongoose.model<SettingsDocument, SettingsModel>('Setting', settingsSchema);

export default Setting;
