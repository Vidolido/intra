'use client';
import { memo, useCallback, useEffect, useRef } from 'react';

// action

// state/context
import {
	SET_ANALISYS_TYPE,
	SET_PRODUCT,
	SET_TEMPLATES,
} from '@/app/dashboard/_state/analisys/actionTypes';
import {
	useAnalisysContext,
	useAnalisysDispatchContext,
} from '@/app/dashboard/_state/analisys/analisysContext';
import Product from './Product';
import AnalysisType from './AnalisysType';
import AnalisysHeaderOptions from './AnalisysHeaderOptions';

export default memo(function AnalisysHeader(props) {
	// console.log(props, 'THE PROPS');
	// const dispatch = useAnalisysDispatchContext();
	const state = useAnalisysContext();
	const { product, analisysType } = state;

	return (
		<>
			<fieldset>
				<Product product={product} />
				<AnalysisType analisysType={analisysType} />
			</fieldset>
			<fieldset className='flex flex-col gap-2'>
				{Object.entries(props).map(([option, optionSettings]) => {
					return (
						<AnalisysHeaderOptions
							key={option}
							option={option}
							optionSettings={optionSettings}
						/>
					);
				})}
			</fieldset>
		</>
	);
});
