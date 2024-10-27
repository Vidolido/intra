// import { Document } from 'mongoose';

import { LanguageLabels } from '@/types/typesTS';
import { LanguageMapSchema, Languages } from '@/types/zod/settingSchema';
import { Types } from 'mongoose';
import { z } from 'zod';

export interface HasIdAndName {
	_id: Types.ObjectId;
	name: Record<string, string>;
}

interface TransformedSelectItem {
	_id: string;
	name: LanguageLabels;
}

export const mutateForSelect = <T extends HasIdAndName>(
	documents: T[]
): TransformedSelectItem[] => {
	return documents.map((doc) => ({
		_id: doc._id.toString(),
		name: doc.name,
	}));
};
