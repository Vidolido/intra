'use client';
import { memo, useCallback, useMemo, useState } from 'react';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import {
	useTemplatesContext,
	useTemplatesDispatchContext,
} from '@/app/dashboard/_state/templates/templatesContext';

// components
import CertificateType from './CertificateType';
import ParentForm from './ParentForm';
import Product from './Product';
import TemplateInput from './TemplateInput';
import { ADD_TEMPLATE_ITEM } from '@/app/dashboard/_state/templates/actionTypes';
import FormCollection from './FormCollection';
import CollectionItems from './CollectionItems';
// components

export default function TemplateForm({ data }) {
	const { language } = useGlobalStateContext();
	const { addButtonLabels } = useStaticSettingsContext();
	const state = useTemplatesContext();
	const dispatch = useTemplatesDispatchContext();
	//   console.log(data, 'in templateForm');
	const { templateData } = state;
	const [insertData, setInsertData] = useState([]);
	// const [insertData, setInsertData] = useState(null);
	// const [templateData, setTemplateData] = useState([]);

	const handleOnAdd = useCallback(() => {
		dispatch({ type: ADD_TEMPLATE_ITEM, payload: insertData });
		setInsertData([]);
	}, [insertData, dispatch]);

	// console.log(state, 'the state');
	// console.log(data, 'the original data');
	return (
		<ParentForm>
			<fieldset className='flex gap-2'>
				<CertificateType />
				<Product />
			</fieldset>
			<fieldset className='flex gap-2'>
				{data &&
					data.map((items, index) => (
						<TemplateInput
							key={index}
							groupName={items.groupName}
							collection={items.collection}
							setInsertData={setInsertData}
						/>
					))}
				<button
					onClick={handleOnAdd}
					type='button'
					className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4 h-10 self-end'>
					{addButtonLabels[language]}
				</button>
			</fieldset>
			<hr className='m-5' />
			<FormCollection>
				{templateData.length > 0 && <CollectionItems data={data} />}
			</FormCollection>
		</ParentForm>
	);
}
