import { useState } from 'react';
import { useSettingsContext } from '@/app/dashboard/_state/settings/useSettingsContext';

import {
	SET_COLLECTION_TYPE,
	SET_COLLECTION,
} from '@/app/dashboard/_state/settings/actionTypes';

export const useSettings = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		groupName,
		collectionType,
		collection,
		language,
		buttonTypes,
		dispatch,
	} = useSettingsContext();

	const setCollectionType = (type) => {
		console.log(type, 'TYPE IN USESETTINGS');
		dispatch({ type: SET_COLLECTION_TYPE, payload: type });
	};
	const setCollection = (item) => {
		dispatch({ type: SET_COLLECTION, payload: item });
	};

	return {
		groupName,
		collectionType,
		collection,
		language,
		buttonTypes,
		isLoading,
		setCollectionType,
		setCollection,
	};
};
