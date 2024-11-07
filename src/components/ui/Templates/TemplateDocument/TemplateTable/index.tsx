import { Fragment } from 'react';

// state/actions
import { getRowHeaders } from '@/functions/getRowHeaders';
import { groupParameters } from '@/functions/groupParameters';
import { generateID } from '@/functions/generateID';

// components
import TemplateRow from './TemplateRow';

// types
import { DynamicTemplateSettings, LaboratoryTemplate } from '@/types/type';
interface TemplateItemsProps {
  defaultLanguage: string;
  settings: DynamicTemplateSettings;
  template: LaboratoryTemplate;
}

const TemplateItems = ({
  template,
  settings,
  defaultLanguage,
}: TemplateItemsProps) => {
  console.log(settings, 'the settings');
  const { optionsSchema } = settings.laboratoryTemplates;

  let headings = optionsSchema ? getRowHeaders(optionsSchema, 'plural') : null;
  let mutTemplate = groupParameters(template.template) || [];

  return (
    <div className='border w-3/4'>
      <div className='grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_1fr_25px] border border-slate-400 bg-slate-100'>
        <div className='border-r border-slate-400'></div>
        {headings && headings?.parameter && (
          <h6 className='text-left border-r border-slate-400 pl-2'>
            {headings.parameter instanceof Map
              ? headings.parameter.get(defaultLanguage)
              : (headings.parameter as Record<string, string>)[defaultLanguage]}
          </h6>
        )}
        {headings &&
          headings?.collections &&
          headings?.collections?.map((collection, index) => (
            <h6
              key={index}
              className='text-left border-double border-r border-slate-400 pl-2'>
              {collection instanceof Map
                ? collection.get(defaultLanguage)
                : (collection as Record<string, string>)[defaultLanguage]}
            </h6>
          ))}
        <h6 className='text-left border-r border-slate-400 pl-2'>
          Default Value
        </h6>
        <h6 className='pl-2'>Margin of Error</h6>
        <p></p>
      </div>
      {mutTemplate.map((item) => {
        if (item.isGroup == undefined && item.parameter) {
          return (
            <TemplateRow key={item._id} item={item} templateId={template._id} />
          );
        }
        if (item.isGroup) {
          return item.items.map((collectionItem, i) => {
            let length = i === item.items.length - 1;
            return (
              <Fragment key={generateID()}>
                {i === 0 ? (
                  <div className='w-full border-b border-b-slate-300 border border-slate-400 pl-[32px] pb-[1px]'>
                    {item?.name['en']}
                  </div>
                ) : null}
                <TemplateRow
                  item={collectionItem}
                  templateId={template._id}
                  classes={`border border-slate-300 border-l-slate-400 border-r-slate-400 ${
                    length ? 'border-slate-400 border-t-0' : ''
                  }`}
                />
              </Fragment>
            );
          });
        }
      })}
    </div>
  );
};

export default TemplateItems;
