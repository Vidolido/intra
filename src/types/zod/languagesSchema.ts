// import { z } from 'zod';
// import { isDeleted } from './typesZ';
// import { Types } from 'mongoose';

// export const LanguageDocumentSchema = z.object({
// 	_id: z.union([z.instanceof(Types.ObjectId), z.string()]),
// 	language: z.string(),
// 	documentStatus: z.enum(['draft', 'published']).default('draft'),
// 	active: z.boolean().default(false),
// 	isDeleted: isDeleted,
// });

// export type LanguageSchema = z.infer<typeof LanguageDocumentSchema>;
