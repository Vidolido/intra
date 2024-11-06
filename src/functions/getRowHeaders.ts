import { LanguageMap, Options } from '@/types/type';

export const getRowHeaders = (
	optionsSchema: Options,
	type: 'singular' | 'plural'
): { parameter: LanguageMap; collections: LanguageMap[] } => ({
	parameter: optionsSchema?.parameter?.name[type],
	collections: optionsSchema?.collections?.map((setting) => setting.name),
});
