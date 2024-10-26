import mongoose, { Schema } from 'mongoose';

const languageSchema = new Schema({
	language: String,
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

const Language =
	mongoose.models.Language || mongoose.model('Language', languageSchema);

export default Language;
