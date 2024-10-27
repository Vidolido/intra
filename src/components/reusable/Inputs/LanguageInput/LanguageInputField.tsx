import { cn } from '@/functions/cn';
import { ChangeEvent, FocusEvent } from 'react';

interface LanguageInputFieldProps {
	id?: string;
	value: string | undefined;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: FocusEvent<HTMLInputElement>) => void;
	inputName?: string;
	inputClass?: string;
	disabled?: boolean;
	error?: boolean;
	required?: boolean;
}

const LanguageInputField = ({
	id,
	value,
	onChange,
	onBlur,
	inputName,
	inputClass,
	disabled,
	required,
}: LanguageInputFieldProps) => {
	return (
		<input
			id={id}
			name={inputName}
			type='text'
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			className={cn(
				inputClass,
				'min-w-28',
				'box-content border border-grey-50 border-opacity-60 rounded ',
				'hover:border-red-200 focus:outline-none h-[21px]'
			)}
		/>
	);
};

export default LanguageInputField;
