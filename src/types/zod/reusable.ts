// import { FocusEvent } from 'react';
// import { z } from 'zod';
// import { LanguageMapSchema } from './settingSchema';
// export const ZOptionType = z.object({
// 	_id: z.union([z.string(), z.null()]).optional(),
// 	value: z.string(),
// });

// const ZMetadataSchema = z.object({
// 	id: z.string().optional(),
// 	name: z.string().optional(),
// 	type: z.string().optional(),
// });

// export const ZData = z.object({
// 	state: z
// 		.array(
// 			z.object({
// 				_id: z.union([z.string(), z.null()]),
// 				name: LanguageMapSchema,
// 			})
// 		)
// 		.optional(),
// 	label: z.string().optional(),
// 	id: z.string().optional(),
// 	selectName: z.string().optional(),
// 	classes: z.string().optional(),
// 	showEmptyOption: z.boolean().optional(),
// 	defaultValue: z.string().optional(),
// 	defaultLanguage: z.string().optional(),
// 	error: z.boolean().optional(),
// });
// const ZExtractDataSchema = z
// 	.function()
// 	.args(z.string(), ZMetadataSchema)
// 	.returns(z.void());

// const ZReset = z.object({
// 	resetData: z.record(z.string(), z.boolean()),
// 	setReset: z.function().returns(z.void()),
// 	resetType: z.string(),
// });
// export const ZSelectInputProps = z.union([
// 	z
// 		.object({
// 			data: ZData.optional(),
// 			extractData: ZExtractDataSchema.optional(),
// 			reset: ZReset.optional(),
// 		})
// 		.optional(),
// 	z.null(),
// ]);

// type Data = z.infer<typeof ZData>;
// type Metadata = z.infer<typeof ZMetadataSchema>;
// type Reset = z.infer<typeof ZReset>;
// export type OptionType = z.infer<typeof ZOptionType>;
// export type SelectInputProps = z.infer<typeof ZSelectInputProps>;
// export type SelectInputProps = {
// 	data?: Data | null;
// 	extractData?: (id: string, metadata: Metadata) => void;
// 	reset?: Reset;
// };

// NormalInput
// const ZInputData = z.object({
// 	_id: z.string().optional(),
// 	name: z.string().optional(),
// 	label: z.string().optional(),
// 	type: z
// 		.enum(['text', 'number', 'email', 'password', 'tel', 'url', 'search'])
// 		.optional(),
// 	state: z.string().optional(),
// 	required: z.boolean().optional(),
// 	defaultValue: z.string().optional(),
// 	placeholder: z.string().optional(),
// 	fieldsetClass: z.string().optional(),
// 	inputClass: z.string().optional(),
// 	helperText: z.string().optional(),
// 	error: z.boolean().optional(),
// 	disabled: z.boolean().optional(),
// });

// type InputData = z.infer<typeof ZInputData>;

// export interface NormalInputProps {
// 	data?: InputData | null;
// 	type?: 'default' | 'primary' | 'error' | 'success';
// 	extractData?: ((value: string, metadata: Metadata) => void) | null;
// 	reset?: Reset | null;
// 	onChange?: (value: string) => void;
// 	onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
// }
// NormalInput
// LanguageInput
// const ZLanguageInputData = z.object({});
// LanguageInput
