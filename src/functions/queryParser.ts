import { z } from 'zod';
import {
	QueryParser,
	BaseUrlSchema,
	QueryParserSchema,
	APIError,
} from '@/types/zod/types';

export function queryParser(
	baseUrl: string,
	searchParams: QueryParser | null
): string {
	try {
		BaseUrlSchema.parse(baseUrl);

		if (searchParams) {
			QueryParserSchema.parse(searchParams);
		}
		const url = new URL(baseUrl);

		if (searchParams) {
			Object.keys(searchParams).forEach((key) => {
				const value = searchParams[key];
				if (Array.isArray(value)) {
					value.forEach((item) => url.searchParams.append(key, item));
				} else if (value !== '') {
					url.searchParams.append(key, value.toString());
				}
			});
		}

		return url.toString();
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new APIError(
				`URL Building Error: ${error.errors.map((e) => e.message).join(', ')}`,
				400,
				'INVALID_URL_PARAMS'
			);
		}
		throw error;
	}
}
