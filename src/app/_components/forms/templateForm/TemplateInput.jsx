'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import SelectInput from './SelectInput';
import { memo } from 'react';

const TemplateInput = ({ groupName, collection }) => {
	const { language } = useGlobalStateContext();

	return (
		<label>
			<h3 className='capitalize'>{groupName[language]}</h3>
			<SelectInput collection={collection} />
		</label>
	);
};

export default memo(TemplateInput);
