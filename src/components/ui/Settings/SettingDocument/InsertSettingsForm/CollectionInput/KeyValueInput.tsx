import NormalInput from '@/components/reusable/Inputs/NormalInput';
import { InsertSettingData, Language, Metadata } from '@/types/type';

interface KeyValueProps {
	languages: Language[] | null;
	value: InsertSettingData;
	onChange: (value: InsertSettingData, meta: Metadata) => void;
}
const KeyValueInput = ({
	languages = null,
	value,
	onChange,
}: KeyValueProps) => {
	const handleExtraction = (data: string, dataObj: Metadata) => {
		onChange(data, dataObj);
	};

	return (
		<div>
			<NormalInput
				data={{
					state: value as string,
					name: 'key',
					fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
					inputClass:
						'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
					required: true,
				}}
				extractData={handleExtraction}
			/>
			<NormalInput
				data={{
					state: value as string,
					name: 'value',
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
export default KeyValueInput;
