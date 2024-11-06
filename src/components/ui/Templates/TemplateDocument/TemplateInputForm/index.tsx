// import Form from './Form';
import {
	DynamicTemplateSettings,
	Language,
	SettingCollectionItem,
} from '@/types/type';
import FormHeaders from './FormHeaders';
import InputForm from './InputForm';
// import Headers from './Headers';

interface ExtendedSettingsCollection extends SettingCollectionItem {
	result?: string;
	marginError?: string;
}

interface TemplateInputFormProps {
	documentId: string | undefined;
	languages: Language[];
	defaultLanguage: string;
	settings: DynamicTemplateSettings;
}

const TemplateInputForm = ({
	documentId,
	languages,
	settings,
	defaultLanguage,
}: TemplateInputFormProps) => {
	const { laboratoryTemplates, groupedParameters } = settings;

	// let test = laboratoryTemplates?.settings?.map((setting) => ({
	// 	...setting,
	// 	result: setting.result ?? '',
	// 	marginError: setting?.marginError ? setting.marginError : '',
	// }));

	return (
		<div id='addTemplateSchema' className='bg-slate-200 rounded w-[95%]'>
			<FormHeaders
				setting={laboratoryTemplates}
				defaultLanguage={defaultLanguage}
			/>

			<InputForm
				languages={languages}
				documentId={documentId}
				settings={settings}
				defaultLanguage={defaultLanguage}
			/>
		</div>
	);
};

export default TemplateInputForm;
