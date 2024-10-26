import { LanguageModel } from '@/types/types';
import { LanguageSchema } from '@/types/zod/languagesSchema';
import mongoose, { Schema } from 'mongoose';

const languageSchema = new Schema({
	language: String,
	locale: String,
	active: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

// const Language =
// 	mongoose.models.Language || mongoose.model('Language', languageSchema);

const Language =
	(mongoose.models.Language as LanguageModel) ||
	mongoose.model<LanguageSchema, LanguageModel>('Language', languageSchema);

export default Language;
