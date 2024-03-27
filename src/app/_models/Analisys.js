import mongoose, { Schema } from 'mongoose';

const normalInputSchema = new mongoose.Schema(
	{ type: String, value: String, name: String },
	{ _id: false }
);
const dateInputSchema = new mongoose.Schema({
	type: String,
	value: Schema.Types.Date,
	name: String,
});

const analysesSchema = new mongoose.Schema({
	product: String,
	analysesType: String,
	templateName: String,
	header: {
		client: normalInputSchema,
		destination: normalInputSchema,
		transportType: normalInputSchema,
		loadingDate: dateInputSchema,
		tankNo: normalInputSchema,
		issuedDate: dateInputSchema,
	},
	// templates: {
	// 	type: Schema.Types.Mixed,
	// },
	analysesResult: Schema.Types.Mixed,
	footer: {
		note: String,
		issuer: Schema.Types.Date,
		city: String,
		date: Schema.Types.Date,
	},
});

const Analyses =
	mongoose.models.analyses || mongoose.model('analyses', analysesSchema);

export default Analyses;
