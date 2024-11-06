// import { getRowHeaders } from '@/utils/helpers/rowHeaders';

import { getRowHeaders } from '@/functions/getRowHeaders';
import { Setting } from '@/types/type';

interface FormHeadersProps {
	setting: Setting;
	defaultLanguage: string;
}

const FormHeaders = ({ setting, defaultLanguage }: FormHeadersProps) => {
	let headings = setting?.optionsSchema
		? getRowHeaders(setting?.optionsSchema, 'plural')
		: null;
	return (
		<div id='headings' className='grid grid-cols-7 gap-4 p-2'>
			{headings && headings.parameter && (
				<h6>
					{headings.parameter instanceof Map
						? headings.parameter.get(defaultLanguage)
						: (headings.parameter as Record<string, string>)[defaultLanguage]}
				</h6>
			)}
			{headings?.collections?.map((collection, index) => (
				<h6 key={index} className='px-1'>
					{collection instanceof Map
						? collection.get(defaultLanguage)
						: (collection as Record<string, string>)[defaultLanguage]}
				</h6>
			))}
			<h6>Default Value</h6>
			<h6>Margin of Error</h6>
		</div>
	);
};

export default FormHeaders;
