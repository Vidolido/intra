'use client';
import { useEffect, useState } from 'react';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

// Да ја преправам оваа компонента без useEffect и useState
const TranslatedString = ({ item }) => {
	const { language } = useGlobalStateContext();

	const [returnValue, setReturnValue] = useState(null);

	useEffect(() => {
		if (!item[language]) {
			const payload = Object.entries(item)[0];
			setReturnValue(payload[1]);
		} else {
			setReturnValue(item[language]);
		}
	}, [item, language]);
	return returnValue;
};

export default TranslatedString;
