import mongoose, { Schema } from 'mongoose';
import {
  Collection,
  LaboratoryTemplateDocument,
  LaboratoryTemplateModel,
  Options,
  Parameter,
} from '@/types/type';

const optionsParameterSchema = new Schema<Parameter>(
  {
    name: {
      singular: {
        type: Map,
        of: String,
        // required: true,
        // validate: {
        //   validator: function (map: Map<string, string>) {
        //     return map.size > 0;
        //   },
        //   message: 'Singular name must have at least one language entry',
        // },
        default: undefined,
      },
      plural: {
        type: Map,
        of: String,
        // required: true,
        // validate: {
        //   validator: function (map: Map<string, string>) {
        //     return map.size > 0;
        //   },
        //   message: 'Plural name must have at least one language entry',
        // },
        default: undefined,
      },
    },
  },
  { _id: false, strict: true }
);

const optionsCollectionSchema = new Schema<Collection>(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: Map,
      of: String,
      // validate: {
      //   validator: function (map: Map<string, string>) {
      //     return map.size > 0;
      //   },
      //   message: 'Collection name must have at least one language entry',
      // },
      default: undefined,
    },
  },
  { _id: false, strict: true }
);

const optionsSchema = new Schema<Options>(
  {
    parameter: {
      type: optionsParameterSchema,
      // validate: {
      //   validator: function (map: Map<string, string>) {
      //     return map.size > 0;
      //   },
      //   message: 'Parameter name must have at least one language entry',
      // },
      default: undefined,
    },
    collections: [optionsCollectionSchema],
  },
  { _id: false, strict: true }
);

const groupedSchema = new Schema(
  {
    isGrouped: {
      type: Boolean,
      default: false,
    },
    group: {
      _id: Schema.Types.ObjectId,
      // validate: {
      // 	validator: function (v: mongoose.Types.ObjectId) {
      // 		return mongoose.Types.ObjectId.isValid(v);
      // 	},
      // 	message: 'Invalid Group ID',
      // },
      name: {
        type: Map,
        of: String,
        // validate: {
        // 	validator: function (map: Map<string, string>) {
        // 		return map.size > 0;
        // 	},
        // 	message: 'Group name must have at least one language entry',
        // },
      },
    },
  },
  { _id: false }
);

const parameterSchema = new Schema(
  {
    name: {
      type: Map,
      of: String,
      // validate: {
      // 	validator: function (map: Map<string, string>) {
      // 		return map.size > 0;
      // 	},
      // 	message: 'Parameter name must have at least one language entry',
      // },
    },
    _id: {
      type: Schema.Types.ObjectId,
      // validate: {
      // 	validator: function (v: mongoose.Types.ObjectId) {
      // 		return mongoose.Types.ObjectId.isValid(v);
      // 	},
      // 	message: 'Invalid Parameter ID',
      // },
    },
  },
  { _id: false, strict: true }
);

const collectionItemSchema = new Schema(
  {
    value: {
      type: String,
      // validate: {
      //     validator: function(v: string) {
      //         return v.length > 0;
      //     },
      //     message: 'Value cannot be empty'
      // }
    },
    _id: {
      type: Schema.Types.ObjectId,
      // validate: {
      // 	validator: function (v: mongoose.Types.ObjectId) {
      // 		return mongoose.Types.ObjectId.isValid(v);
      // 	},
      // 	message: 'Invalid Collection Item ID',
      // },
    },
  },
  { _id: false, strict: true }
);

const templateSchema = new Schema(
  {
    parameter: {
      type: parameterSchema,
      // required: true,
    },

    collections: {
      type: Map,
      of: [collectionItemSchema],
      default: undefined,
      // validate: {
      //     validator: function(map: Map<string, any[]>) {
      //         return map ? map.size > 0 : true;
      //     },
      //     message: 'Collections must have at least one entry when provided'
      // }
    },
    result: {
      type: String,
      default: '0',
    },
    marginError: {
      type: String,
      default: null,
    },
    grouped: { type: groupedSchema, default: undefined },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { strict: true, _id: true }
);

const laboratoryTemplatesSchema = new Schema<
  LaboratoryTemplateDocument,
  LaboratoryTemplateModel
>(
  {
    header: {
      product: String,
      // sampleType: String,
      // origin: String,
      // documentType: String,
      templateName: {
        type: String,
        default: '',
      },
    },
    schemaNames: {
      type: optionsSchema,
      default: undefined,
    },
    template: {
      type: [templateSchema],
      default: undefined,
    },
    documentStatus: {
      type: String,
      enum: {
        values: ['draft', 'published', 'archived'],
        message: '{VALUE} is not a valid document status',
      },
      default: 'draft',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
    strict: true,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

laboratoryTemplatesSchema.index({ 'header.product': 1 });
// laboratoryTemplatesSchema.index({ 'header.sampleType': 1 });
// laboratoryTemplatesSchema.index({ 'header.origin': 1 });
// laboratoryTemplatesSchema.index({ 'header.documentType': 1 });
laboratoryTemplatesSchema.index({ 'header.templateName': 1 });
laboratoryTemplatesSchema.index({ documentStatus: 1 });
laboratoryTemplatesSchema.index({ isDeleted: 1 });
// const LaboratoryTemplate =
// 	mongoose.models.LaboratoryTemplate ||
// 	mongoose.model('LaboratoryTemplate', laboratoryTemplatesSchema);
const LaboratoryTemplate =
  (mongoose.models.LaboratoryTemplate as LaboratoryTemplateModel) ||
  mongoose.model<LaboratoryTemplateDocument, LaboratoryTemplateModel>(
    'LaboratoryTemplate',
    laboratoryTemplatesSchema
  );

export default LaboratoryTemplate;
