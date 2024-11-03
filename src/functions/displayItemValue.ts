import { ItemValue } from '@/types/type';

export const displayItemValue = (
	value: ItemValue,
	defaultLanguage: string,
	type: string
): string => {
	if (type === 'simple') {
		return value as string;
	} else if (type === 'translations') {
		return value[defaultLanguage as keyof ItemValue];
	} else if (typeof value === 'object' && 'key' in value && 'value' in value) {
		return `${value.key} - ${value.value}`;
	}
	return '';
};
