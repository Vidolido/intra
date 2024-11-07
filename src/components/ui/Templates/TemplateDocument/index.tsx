// components
import TemplateHeader from './TemplateHeader';
import TemplateInputForm from './TemplateInputForm';
import TemplateTable from './TemplateTable';

// types
import {
  DynamicTemplateSettings,
  LaboratoryTemplate,
  Language,
} from '@/types/type';
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

      <TemplateTable
        template={template}
        settings={settings}
        defaultLanguage={defaultLanguage}
      />
    </div>
  );
};

export default TemplateDocument;
