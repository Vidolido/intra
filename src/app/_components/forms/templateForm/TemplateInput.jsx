'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import SelectInput from './SelectInput';

const TemplateInput = ({ groupName, collection, setInsertData }) => {
	const { language } = useGlobalStateContext();

	return (
		<label>
			<h3 className='capitalize'>{groupName[language]}</h3>
			<SelectInput collection={collection} setInsertData={setInsertData} />
		</label>
	);
};

export default TemplateInput;
