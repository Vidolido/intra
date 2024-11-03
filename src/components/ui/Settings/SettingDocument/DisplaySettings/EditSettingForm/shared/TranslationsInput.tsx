import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import {
	InsertSettingData,
	Language,
	LanguageMap,
	Metadata,
} from '@/types/type';

interface TranslationsInputProps {
	languages: Language[];
	value: InsertSettingData;
	onChange: (value: InsertSettingData, dataObj: Metadata) => void;
}

const TranslationsInput = ({
	languages,
	value,
	onChange,
}: TranslationsInputProps) => {
	const handleExtraction = (data: LanguageMap, dataObj: Metadata) => {
		onChange(data, dataObj);
	};
	return (
		<div>
			<LanguageInput
				languages={languages}
				data={{
					defaultLanguage: languages[0].language,
					state: value as LanguageMap,
					labelClass: 'block',
				}}
				extractData={handleExtraction}
				// reset={{
				//   resetData: resetComponents,
				//   setReset: setResetComponents,
				//   resetType: 'submit',
				// }}
			/>
		</div>
	);
};

export default TranslationsInput;
