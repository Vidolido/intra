import { ApiError } from 'next/dist/server/api-utils';
import { z } from 'zod';

// types
import {
  BaseUrl,
  BaseUrlSchema,
  SearchQueryParamsSchema,
  SearchQueryParams,
} from '@/types/type';

export function queryParser(
  baseUrl: BaseUrl,
  searchParams: SearchQueryParams | null
): string {
  try {
    BaseUrlSchema.parse(baseUrl);
    const url = new URL(baseUrl);

    if (searchParams) {
      const filteredParams: SearchQueryParams = {};

      Object.keys(searchParams).forEach((key) => {
        const value = searchParams[key];
        if (Array.isArray(value)) {
          filteredParams[key] = value.map((item) => item.toString());
        } else if (typeof value === 'boolean') {
          filteredParams[key] = value;
        } else if (value === 'true' || value === 'false') {
          filteredParams[key] = value === 'true';
        } else if (value !== '') {
          filteredParams[key] = value.toString();
        }
      });
      SearchQueryParamsSchema.parse(filteredParams);

      Object.keys(filteredParams).forEach((key) => {
        const value = filteredParams[key];
        if (Array.isArray(value)) {
          value.forEach((item) => url.searchParams.append(key, item));
        } else {
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
