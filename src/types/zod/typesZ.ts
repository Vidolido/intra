import { Types } from 'mongoose';
import { z } from 'zod';

// export class APIError extends Error {
// 	constructor(message: string, public status?: number, public code?: string) {
// 		super(message);
// 		this.name = 'APIError';
// 	}
// }

// export const isDeleted = z
// 	.preprocess((val) => val === 'true', z.boolean())
// 	.default(false);
//

// export const SearchParamData = z.record(z.union([z.string(), z.boolean()]));
// export type SearchParamsPayload = z.infer<typeof SearchParamData>;

// //queryParser
// export const BaseUrlSchema = z.string().url().startsWith('http');
// export const QueryParserSchema = z.record(
// 	z.union([z.string(), z.array(z.string()), z.boolean()])
// );

// export type QueryParser = z.infer<typeof QueryParserSchema>;
// //queryParser

// let dataSchema = z.record(
// 	z.string(),
// 	z.union([
// 		z.string(),
// 		z.instanceof(Types.ObjectId),
// 		z.record(z.string(), z.union([z.string(), z.instanceof(Types.ObjectId)])),
// 	])
// );
// //makeDraft
// export const SuccessResponseSchema = z.object({
// 	success: z.boolean().default(true).nullable(),
// 	data: dataSchema.nullable(),
// 	error: z.boolean().default(false).nullable(),
// 	isLoading: z.boolean().default(false)
// });

// export const ErrorResponseSchema = z.object({
// 	success: z.literal(false).nullable(),
// 	data: z.null(),
// 	error: z
// 		.object({
// 			document: z.string().optional(),
// 			catch: z.string().optional(),
// 		})
// 		.nullable(),
// });

// export const ActionResponseSchema = z.union([
// 	SuccessResponseSchema,
// 	ErrorResponseSchema,
// ]);

// export type ActionResponse = z.infer<typeof ActionResponseSchema>;
// //makeDraft

// ResetComponentsData
const ResetComponentsDataSchema = z.object({
	singular: z.boolean().default(false),
	plural: z.boolean().default(false),
	collections: z.boolean().default(false),
	collection: z.string(),
});
export type ResetComponentsData = z.infer<typeof ResetComponentsDataSchema>;
// ResetComponentsData
