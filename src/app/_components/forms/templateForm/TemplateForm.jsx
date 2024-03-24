'use client';
import { Suspense, useCallback, useEffect, useState } from 'react';

// state/context
import {
	ADD_TEMPLATE_ITEM,
	RESET,
	SET_STATE,
} from '@/app/dashboard/_state/templates/actionTypes';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';
import {
	useTemplatesContext,
	useTemplatesDispatchContext,
} from '@/app/dashboard/_state/templates/templatesContext';

// components
import AnalysisType from './AnalysisType';
import ParentForm from './ParentForm';
import Product from './Product';
import TemplateInput from './TemplateInput';
import FormCollection from './FormCollection';
import CollectionItems from './CollectionItems';
import Loading from '@/app/dashboard/loading';
// components

export default function TemplateForm({ data, template, shouldUpdate }) {
	// const state = useTemplatesContext();
	const { language } = useGlobalStateContext();
	const { addButtonLabels } = useStaticSettingsContext();
	const { templateData } = useTemplatesContext();
	const dispatch = useTemplatesDispatchContext();

	const setFormState = (template, shouldUpdate) => {
		const { _id, analisysType, product, templateData } = template;

		const payload = {
			_id,
			analisysType,
			product,
			templateData,
			shouldUpdate,
		};
		dispatch({ type: SET_STATE, payload });
	};
	useEffect(() => {
		if (!template) {
			dispatch({ type: RESET });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [template]);

	useEffect(() => {
		if (template) {
			dispatch({ type: RESET });
			setFormState(template, shouldUpdate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [template, shouldUpdate]);

	const handleOnAdd = useCallback(() => {
		dispatch({ type: ADD_TEMPLATE_ITEM });
	}, [dispatch]);
	return (
		<ParentForm>
			<fieldset className='flex gap-2'>
				<AnalysisType />
				<Product />
			</fieldset>
			<fieldset className='flex gap-2'>
				{data &&
					data.map((items, index) => (
						<TemplateInput
							key={index}
							groupName={items.groupName}
							collection={items.collection}
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
			<Suspense fallback={<Loading />}>
				<FormCollection>
					{templateData.length > 0 && <CollectionItems data={data} />}
				</FormCollection>
			</Suspense>
		</ParentForm>
	);
}
