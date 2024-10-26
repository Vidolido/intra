import { Types } from 'mongoose';
import { z } from 'zod';

export const isDeleted = z
	.preprocess((val) => val === 'true', z.boolean())
	.default(false);

//queryParser
export const BaseUrlSchema = z.string().url().startsWith('http');
export const QueryParserSchema = z.record(
	z.union([z.string(), z.array(z.string()), z.boolean()])
);

export type QueryParser = z.infer<typeof QueryParserSchema>;
//queryParser

export class APIError extends Error {
	constructor(message: string, public status?: number, public code?: string) {
		super(message);
		this.name = 'APIError';
	}
}
