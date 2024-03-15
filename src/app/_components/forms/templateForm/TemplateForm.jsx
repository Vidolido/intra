'use client';

import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

import CertificateType from './CertificateType';
import ParentForm from './ParentForm';
import Product from './Product';
import TemplateInput from './TemplateInput';

export default function TemplateForm({ data }) {
  const { language } = useGlobalStateContext();
  const { addButtonLabels } = useStaticSettingsContext();
  //   console.log(data, 'in templateForm');

  return (
    <ParentForm>
      <CertificateType />
      <Product />
      <div>
        {data &&
          data.map((items, index) => (
            <TemplateInput
              key={index}
              groupName={items.groupName}
              collection={items.collection}
            />
          ))}
        <button
          type='button'
          className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4'>
          {addButtonLabels[language]}
        </button>
      </div>
    </ParentForm>
  );
}
