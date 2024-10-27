import { ApiError } from 'next/dist/server/api-utils';
import { z } from 'zod';

// types
import {
	BaseUrl,
	BaseUrlSchema,
	SeachQueryParamsSchema,
	SearchQueryParams,
} from '@/types/type';

export function queryParser(
	baseUrl: BaseUrl,
	searchParams: SearchQueryParams | null
): string {
	try {
		BaseUrlSchema.parse(baseUrl);

		if (searchParams) {
			SeachQueryParamsSchema.parse(searchParams);
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
			throw new ApiError(
				400,
				`URL Building Error: ${error.errors.map((e) => e.message).join(', ')}`
			);
		}
		throw error;
	}
}
