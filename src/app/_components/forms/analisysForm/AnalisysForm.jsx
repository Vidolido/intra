'use client';
import { useEffect } from 'react';

// actions
// import { getTemplate } from '@/app/_actions/analisysActions';

// state/context
import { SET_TEMPLATES } from '@/app/dashboard/_state/analisys/actionTypes';
import {
	useAnalisysContext,
	useAnalisysDispatchContext,
} from '@/app/dashboard/_state/analisys/analisysContext';

// components
import AnalisysHeader from './AnalisysHeader';
import ParentForm from './ParentForm';
import TemlpateData from './TemlpateData';

// export const revalidate = 0;

export default function AnalisysForm({ templates }) {
	const dispatch = useAnalisysDispatchContext();
	const state = useAnalisysContext();
	const { product, analisysType, temlpateData } = state;

	useEffect(() => {
		const setTemplateData = async () => {
			let template = templates.filter(
				(item) => item.product === product && item.analisysType === analisysType
			);
			// console.log(template, 'in useEffect');
			dispatch({ type: SET_TEMPLATES, payload: template });
		};

		setTemplateData();
	}, [product, analisysType]);
	// console.log(templates);

	// useEffect(() => {
	// 	const setTemplateData = async () => {
	// 		let templates = JSON.parse(await getTemplate(product, analisysType));
	// 		dispatch({ type: SET_TEMPLATES, payload: templates });
	// 	};
	// 	setTemplateData();
	// }, [product, analisysType, dispatch]);

	// console.log(product, analisysType, 'OVIJA GI GLEAM');
	// console.log(state);
	return (
		<ParentForm>
			<div className='flex gap-2'>
				<div className='flex w-1/3 flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
					<AnalisysHeader {...state.header} />
				</div>
				<div className='flex w-1/2 flex-col border-2 border-grey-50 border-opacity-60 rounded p-2 bg-gray-50 gap-2'>
					<TemlpateData />
				</div>
			</div>
		</ParentForm>
	);
}
