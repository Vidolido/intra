import { cn } from '@/functions/cn';
import { Language } from '@/types/type';
import { ChangeEvent, FocusEvent } from 'react';

interface LanguageSelectorProps {
	languages: Language[];
	selectedLanguage: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	selectName?: string;
	disabled?: boolean;
}

const LanguageSelector = ({
	languages,
	selectedLanguage,
	onChange,
	selectName,
	disabled,
}: LanguageSelectorProps) => {
	return (
		<select
			name={selectName}
			value={selectedLanguage}
			onChange={onChange}
			className={cn(
				'box-content border border-grey-50 border-opacity-60 rounded',
				'hover:border-red-200 focus:outline-none cursor-pointer h-[21px] text-sm pl-[2px]'
			)}
			disabled={disabled || false}>
			{languages.map((lang) => (
				<option key={lang._id.toString()} value={lang.language}>
					{lang.language}
				</option>
			))}
		</select>
	);
};

export default LanguageSelector;
// cn(
// 	'box-content border border-grey-50 border-opacity-60 rounded px-2 py-[1px]',
// 	'hover:border-red-200 focus:outline-none cursor-pointer h-[22px]'
// )
