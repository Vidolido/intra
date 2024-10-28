import { LanguageMap } from '@/types/type';

const getNestedValue = (obj: any, path: string) => {
	return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

export const mutateForSelect = <T extends Record<string, any>>(
	documents: T[],
	nameKey: string = 'name'
): Array<{ _id?: string; name: LanguageMap }> => {
	return documents.map((doc) => {
		const nestedValue = nameKey ? getNestedValue(doc, nameKey) : doc.name;
		const result: { _id?: string; name: LanguageMap } = {
			name: nestedValue || {},
		};
		if ('_id' in doc) {
			result._id = doc._id.toString();
		}
		return result;
	});
};
