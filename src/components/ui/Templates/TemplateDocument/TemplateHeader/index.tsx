'use client';
// components
import ContextButton from '@/components/reusable/ContextButton';
import DocumentStatus from './DocumentStatus';
import Product from './Product';
import TemplateName from './TemplateName';

// types
import { DynamicTemplateSettings, LaboratoryTemplate } from '@/types/type';
import { saveTemplateHeader } from '@/data-acceess/templates/saveTemplateHeader';

interface TemplateHeaderProps {
  defaultLanguage: string;
  settings: DynamicTemplateSettings;
  template: LaboratoryTemplate;
}
const TemplateHeader = ({
  defaultLanguage,
  settings,
  template,
}: TemplateHeaderProps) => {
  let hasName = template.header && template.header.templateName;

  return (
    <form
      action={saveTemplateHeader}
      className='border border-slate-300 rounded w-fit p-2'>
      <div className='flex gap-2 mb-1'>
        <Product
          defaultLanguage={defaultLanguage}
          products={settings.products}
          template={template}
        />
        <TemplateName state={template.header?.templateName} />
        {hasName && (
          <DocumentStatus
            defaultLanguage={defaultLanguage}
            template={template}
          />
        )}
      </div>
      <ContextButton
        label='Save'
        type='edit'
        onClick={(e) => e.target.form.requestSubmit()}
        classes='w-full'
      />
    </form>
  );
};

export default TemplateHeader;
