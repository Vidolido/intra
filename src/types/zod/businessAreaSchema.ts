import { z } from 'zod';
import { Types } from 'mongoose';
import { LanguageMapSchema } from './settingSchema';
import { isDeleted } from './types';

export const BusinesAreasSchema = z.object({
	name: LanguageMapSchema,
	documentStatus: z.enum(['draft', 'published']).default('draft'),
	isDeleted: isDeleted,
});

export type BusinessSchema = z.infer<typeof BusinesAreasSchema>;
