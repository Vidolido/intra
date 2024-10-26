import { Types } from 'mongoose';
import { z } from 'zod';

export class APIError extends Error {
	constructor(message: string, public status?: number, public code?: string) {
		super(message);
		this.name = 'APIError';
	}
}

export const isDeleted = z
	.preprocess((val) => val === 'true', z.boolean())
	.default(false);
//

export const SearchParamData = z.record(z.union([z.string(), z.boolean()]));
export type SearchParamsPayload = z.infer<typeof SearchParamData>;
// type SearchParamsPayload = {
// 	[key: string]: string | boolean;
// };

//queryParser
export const BaseUrlSchema = z.string().url().startsWith('http');
export const QueryParserSchema = z.record(
	z.union([z.string(), z.array(z.string()), z.boolean()])
);

export type QueryParser = z.infer<typeof QueryParserSchema>;
//queryParser

//makeDraft
export const SuccessResponseSchema = z.object({
	success: z.literal(true),
	data: z.object({
		_id: z.union([z.string(), z.instanceof(Types.ObjectId)]),
		message: z.string(),
	}),
	error: z.null(),
});

export const ErrorResponseSchema = z.object({
	success: z.null(),
	error: z.object({
		document: z.string().optional(),
		catch: z.string().optional(),
	}),
});

export const ActionResponseSchema = z.discriminatedUnion('success', [
	SuccessResponseSchema,
	ErrorResponseSchema,
]);

export type ActionResponse = z.infer<typeof ActionResponseSchema>;
//makeDraft
