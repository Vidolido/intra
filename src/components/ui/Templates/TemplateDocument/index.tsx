// components
import TemplateHeader from './TemplateHeader';
import InputForm from './TemplateInputForm';
import Template from './Template';

// types
import {
	DynamicTemplateSettings,
	LaboratoryTemplate,
	Language,
} from '@/types/type';
import TemplateInputForm from './TemplateInputForm';
interface TemplateDocumentProps {
	title: string;
	defaultLanguage: string;
	languages: Language[];
	settings: DynamicTemplateSettings;
	template: LaboratoryTemplate;
}

const TemplateDocument = ({
	title,
	defaultLanguage,
	languages,
	settings,
	template,
}: TemplateDocumentProps) => {
	return (
		<div className='flex flex-col gap-1 w-full pr-2'>
			<h2>{title}</h2>
			<TemplateHeader
				defaultLanguage={defaultLanguage}
				settings={settings}
				template={template}
			/>
			<TemplateInputForm
				documentId={template?._id?.toString()}
				defaultLanguage={defaultLanguage}
				languages={languages}
				settings={settings}
			/>

			<h3>Template</h3>

			{/* <Template
        template={template}
        setting={setting}
        defaultLanguage={defaultLanguage}
      /> */}
		</div>
	);
};

export default TemplateDocument;
