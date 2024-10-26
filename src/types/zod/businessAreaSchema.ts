import { z } from 'zod';
import { Types } from 'mongoose';
import { LanguageMapSchema } from './settingSchema';
import { isDeleted } from './types';

export const BusinesAreasSchema = z.object({
	// _id: z.union([z.instanceof(Types.ObjectId), z.string()]),
	_id: z.instanceof(Types.ObjectId),
	name: LanguageMapSchema,
	documentStatus: z.enum(['draft', 'published']).default('draft'),
	isDeleted: isDeleted,
});

export type BusinessSchema = z.infer<typeof BusinesAreasSchema>;
