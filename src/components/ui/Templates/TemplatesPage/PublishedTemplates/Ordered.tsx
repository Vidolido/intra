'use client';
import { useState } from 'react';

// components
// import Template from './Template';
import ShowHideButton from '@/components/reusable/ShowHideButton';
import SinglePublishedTemplate from './SinglePublishedTemplate';
import {
  OrderByProductOutput,
  SchemaNames,
  Setting,
  SettingsCollection,
} from '@/types/type';

interface OrderedProps {
  product: OrderByProductOutput;
  data: {
    products: Setting;
    types: Setting;
    countries: Setting;
    schemaNames: SchemaNames;
  };
}

const Ordered = ({ product, data }: OrderedProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className='border border-slate-300 relative px-1 rounded'>
      <ShowHideButton
        heading={product.product.en}
        visible={visible}
        onClick={() => setVisible(!visible)}
      />

      {!visible && (
        <ul className='pb-1'>
          <li className='grid grid-cols-[1fr_1fr_1fr_25px] col-end-auto text-black font-semibold bg-slate-200 '>
            <p className='pl-1 pb-1 min-w-36'>Type</p>
            <p className='border-l border-slate-400 pl-1 pb-1'>Country</p>
            <p className='border-l border-slate-400 pl-1 pb-1'>Sample</p>
            <p></p>
          </li>
          {product?.templates?.map((template) => {
            return (
              <li
                key={template?._id?.toString()}
                className='grid grid-cols-[1fr_1fr_1fr_25px] border-b last-of-type:border-transparent hover:border-red-300'>
                <SinglePublishedTemplate template={template} data={data} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Ordered;
