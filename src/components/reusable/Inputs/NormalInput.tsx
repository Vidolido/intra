import React, { useEffect, useState, ChangeEvent, FocusEvent } from 'react';
import { cn } from '@/functions/cn';
import { NormalInputProps } from '@/types/zod/reusable';

// const inputVariants = {
// 	default:
// 		'w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
// 	primary:
// 		'w-full px-3 py-2 bg-white border-2 border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600',
// 	error:
// 		'w-full px-3 py-2 bg-white border border-red-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
// 	success:
// 		'w-full px-3 py-2 bg-white border border-green-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
// };

const NormalInput = ({
	data = null,
	type = 'default',
	extractData = null,
	reset = null,
	onChange,
	onFocus,
}: NormalInputProps) => {
	const [value, setValue] = useState<string>(data?.state ?? '');
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		const shouldReset = reset?.resetData
			? Object.values(reset.resetData).some((value) => value === true)
			: false;

		if (shouldReset) {
			setValue('');
			if (reset?.setReset) {
				const newResetData = Object.fromEntries(
					Object.keys(reset.resetData).map((key) => [key, false])
				);
				reset.setReset(newResetData);
			}
		}
	}, [reset]);

	useEffect(() => {
		if (data?.state !== undefined) {
			setValue(data.state);
		}
	}, [data?.state]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		onChange?.(newValue);
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		if (extractData) {
			extractData(value, {
				id: e.target.id,
				name: e.target.name,
				type: e.target.type,
			});
		}
	};

	const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
		setIsFocused(true);
		onFocus?.(e);
	};

	return (
		<fieldset className={cn(data?.fieldsetClass)}>
			{data?.label && (
				<label
					htmlFor={data._id}
					className={cn(
						'block text-sm font-medium',
						data.error ? 'text-red-500' : 'text-gray-700'
					)}>
					{data.label}
					{data.required && <span className='text-red-500 ml-1'>*</span>}
				</label>
			)}
			<input
				id={data?._id}
				type={data?.type ?? 'text'}
				name={data?.name}
				value={value}
				onChange={handleInputChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				placeholder={data?.placeholder}
				required={data?.required}
				disabled={data?.disabled}
				className={cn(data?.inputClass)}
				aria-invalid={data?.error ? 'true' : 'false'}
				aria-describedby={
					data?.helperText ? `${data._id}-description` : undefined
				}
			/>
			{data?.helperText && (
				<p
					id={`${data._id}-description`}
					className={cn(
						'text-sm',
						data.error ? 'text-red-500' : 'text-gray-500'
					)}>
					{data.helperText}
				</p>
			)}
		</fieldset>
	);
};

export default NormalInput;
