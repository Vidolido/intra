// components
import TemplateHeader from './TemplateHeader';
import TemplateInputForm from './TemplateInputForm';
import Template from './Template';

// types
import {
  DynamicTemplateSettings,
  LaboratoryTemplate,
  SettingsResponse,
} from '@/types/type';
interface TemplateDocumentProps {
  title: string;
  defaultLanguage: string;
  settings: DynamicTemplateSettings;
  template: LaboratoryTemplate;
}

const TemplateDocument = ({
  title,
  defaultLanguage,
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
      {/* <TemplateInputForm
        languages={languages}
        document={template._id}
        setting={setting}
        groups={groups}
        defaultLanguage={defaultLanguage}
      />

      <h3>Template</h3>

      <Template
        template={template}
        setting={setting}
        defaultLanguage={defaultLanguage}
      /> */}
    </div>
  );
};

export default TemplateDocument;
