import NormalInput from '@/components/reusable/Inputs/NormalInput';
import { InsertSettingData, Language, Metadata } from '@/types/type';

interface SimpleInputProps {
	languages: Language[] | null;
	value: InsertSettingData;
	onChange: (value: InsertSettingData, dataObj: Metadata) => void;
}

const SimpleInput = ({
	languages = null,
	value,
	onChange,
}: SimpleInputProps) => {
	const handleExtraction = (data: string, dataObj: Metadata) => {
		onChange(data, dataObj);
	};
	// if(typeof value !== 'string') return

	return (
		<div>
			<NormalInput
				data={{
					state: value as string,
					fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
					inputClass:
						'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
					required: true,
				}}
				extractData={handleExtraction}
			/>
		</div>
	);
};

export default SimpleInput;
