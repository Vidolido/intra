import mongoose, { Schema } from 'mongoose';

const translationsSchema = new Schema({
  type: Map,
  of: String,
});

const translationSchema = new Schema({
  documentId: { type: Schema.Types.ObjectId, required: true },
  field: { type: String, required: true },
  translations: {
    type: translationsSchema,
  },
});

const Translation =
  mongoose.models.Translation ||
  mongoose.model('Translation', translationSchema);

export default Translation;
