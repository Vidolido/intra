'use client';
import { memo, useCallback, useEffect, useRef } from 'react';

// action
import { getTemplate } from '@/app/_actions/analisysActions';

// state/context
import {
	SET_ANALISYS_RESULT,
	SET_ANALISYS_TYPE,
	SET_PRODUCT,
	SET_TEMPLATES,
} from '@/app/dashboard/_state/analisys/actionTypes';
import {
	useAnalisysContext,
	useAnalisysDispatchContext,
} from '@/app/dashboard/_state/analisys/analisysContext';

export default memo(function AnalisysHeader() {
	const state = useAnalisysContext();
	const dispatch = useAnalisysDispatchContext();

	const productRef = useRef(null);
	const analisysRef = useRef(null);

	useEffect(() => {
		const setTemplateData = async () => {
			dispatch({ type: SET_PRODUCT, payload: productRef.current.value });
			dispatch({ type: SET_ANALISYS_TYPE, payload: analisysRef.current.value });

			let templates = await getTemplate(
				productRef.current.value,
				analisysRef.current.value
			);
			dispatch({ type: SET_TEMPLATES, payload: JSON.parse(templates) });
		};
		setTemplateData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productRef?.current?.value, analisysRef?.current?.value]);

	const hanldeOnProductChange = useCallback(async () => {
		dispatch({ type: SET_PRODUCT, payload: productRef.current.value });
		await getTemplate(productRef.current.value, analisysRef.current.value);
	}, [dispatch]);

	const hanldeOnAnalisysChange = useCallback(async () => {
		dispatch({ type: SET_ANALISYS_TYPE, payload: analisysRef.current.value });
		await getTemplate(productRef.current.value, analisysRef.current.value);
	}, [dispatch]);

	return (
		<>
			<fieldset>
				<label>
					<h3>Product</h3>
					<select
						ref={productRef}
						name='product'
						onChange={hanldeOnProductChange}
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
						<option value='UNL-95'>UNL-95</option>
						<option value='UNL-98'>UNL-98</option>
						<option value='ULSD'>ULSD</option>
						<option value='JET-A1'>JET-A1</option>
						<option value='FUEL OIL'>FUEL OIL</option>
						<option value='H.G.O.'>H.G.O.</option>
						<option value='L.P.G.'>L.P.G.</option>
					</select>
				</label>
				<label>
					<h3>Analisys Type</h3>
					<select
						ref={analisysRef}
						onChange={hanldeOnAnalisysChange}
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'>
						<option value='Certificate'>Certificate</option>
						<option value='Quality'>Quality</option>
					</select>
				</label>
			</fieldset>
			<fieldset className='flex flex-col gap-2'>
				<label className='flex flex-row items-center justify-between w-full gap-2'>
					<span>Client:</span>
					<input
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
						type='text'
					/>
				</label>
				<label className='flex flex-row items-center justify-between w-full gap-2'>
					<span>Destination:</span>
					<input
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
						type='text'
					/>
				</label>
				<label className='flex flex-row items-center justify-between w-full gap-2'>
					<span>Transport type:</span>
					<input
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
						type='text'
					/>
				</label>
				<label className='flex flex-row items-center justify-between w-full gap-2'>
					<span>Loading Date:</span>
					<input
						defaultValue={new Date().toISOString().substring(0, 10)}
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
						type='date'
					/>
				</label>
				<label className='flex flex-row items-center justify-between w-full gap-2'>
					<span>Tank No:</span>
					<input
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
						type='text'
					/>
				</label>
				<label className='flex flex-row items-center justify-between w-full gap-2'>
					<span>Issued date:</span>
					<input
						defaultValue={new Date().toISOString().substring(0, 10)}
						className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none'
						type='date'
					/>
				</label>
			</fieldset>
		</>
	);
});
