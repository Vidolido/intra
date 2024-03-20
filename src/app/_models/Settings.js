import mongoose, { Schema } from 'mongoose';

// const translatedStringsSchema = new mongoose.Schema(
// 	{
// 		language: String,
// 		value: String,
// 	},
// 	{ _id: false, default: undefined }
// );

const settingsSchema = new mongoose.Schema({
	groupName: {
		type: Schema.Types.Mixed,
		// default: undefined,
	},
	collectionType: {
		type: String,
	},
	single: {
		type: String,
		default: undefined,
	},
	translatedString: {
		type: Schema.Types.Mixed,
		default: undefined,
	},
	limit: {
		from: Number,
		to: Number,
		textualLimit: {
			type: Schema.Types.Mixed,
			default: undefined,
		},
	},
	sector: String,
});

const Settings =
	mongoose.models.settings || mongoose.model('settings', settingsSchema);

export default Settings;
