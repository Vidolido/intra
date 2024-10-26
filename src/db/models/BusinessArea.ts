import { BusinessAreasDocument, BusinessModel } from '@/types/types';
import mongoose, { Schema } from 'mongoose';

const businessAreaSchema: Schema = new Schema<
	BusinessAreasDocument,
	BusinessModel
>(
	{
		name: {
			type: Map,
			of: String,
			required: true,
			validate: {
				validator: function (map: Map<string, string>) {
					return map.size > 0;
				},
				message: 'Name must have at least one language entry',
			},
		},
		documentStatus: {
			type: String,
			enum: ['draft', 'published'],
			default: 'draft',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ strict: true }
);

businessAreaSchema.index({ documentStatus: 1 });
businessAreaSchema.index({ isDeleted: 1 });

// const BusinessArea =
// 	mongoose.models.BusinessArea ||
// 	mongoose.model('BusinessArea', businessAreaSchema);

const BusinessArea =
	(mongoose.models.BusinessArea as BusinessModel) ||
	mongoose.model<BusinessAreasDocument, BusinessModel>(
		'BusinessArea',
		businessAreaSchema
	);

export default BusinessArea;
