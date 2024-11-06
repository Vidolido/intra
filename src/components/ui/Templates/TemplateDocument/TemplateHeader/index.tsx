'use client';
import { useFormState } from 'react-dom';

// state/actions
import { saveTemplateHeader } from '@/data-acceess/templates/saveTemplateHeader';

// components
import ContextButton from '@/components/reusable/ContextButton';
import DocumentStatus from './DocumentStatus';
import Product from './Product';
import TemplateName from './TemplateName';

// types
import {
  ActionResponse,
  DynamicTemplateSettings,
  LaboratoryTemplate,
} from '@/types/type';

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
  const wrappedAction = async (
    prevState: ActionResponse,
    formData: FormData
  ) => {
    if (settings.laboratoryTemplates) {
      formData.append(
        'options-schema',
        JSON.stringify(settings.laboratoryTemplates.optionsSchema)
      );
    }

    return saveTemplateHeader(prevState, formData);
  };
  const [state, formAction] = useFormState<ActionResponse, FormData>(
    wrappedAction,
    {
      data: null,
      success: null,
      error: null,
      message: null,
      component: null,
      isLoading: false,
    }
  );

  let hasName = template.header && template.header.templateName;
  console.log(settings, 'settings');
  return (
    <form
      action={formAction}
      // action={handleSubmit}
      className='border border-slate-300 rounded w-fit p-2'>
      <input
        type='text'
        className='hidden'
        defaultValue={template?._id?.toString()}
        name='document_id'
      />
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
        onClick={(e) => {
          e.preventDefault();
          const targetForm = (e.target as HTMLButtonElement).form;
          if (targetForm) targetForm.requestSubmit();
        }}
        classes='w-full'
        disabled={state.isLoading}
      />
    </form>
  );
};

export default TemplateHeader;
