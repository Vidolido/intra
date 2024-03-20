import mongoose, { Schema } from 'mongoose';

const templatesSchema = new mongoose.Schema({
	product: String,
	analisysType: String,
	note: String,
	templateData: [
		{
			type: Schema.Types.Mixed,
			ref: 'settings',
			default: undefined,
		},
	],
});

const Templates =
	mongoose.models.templates || mongoose.model('templates', templatesSchema);

export default Templates;
