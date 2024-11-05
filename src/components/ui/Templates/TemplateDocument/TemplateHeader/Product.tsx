'use client';

// state/actions
import { mutateForSelect } from '@/functions/mutateForSelect';

// components
import SelectInput from '@/components/reusable/Inputs/SelectInput';

// types
import { LaboratoryTemplate, Setting } from '@/types/type';
interface ProductProps {
  defaultLanguage: string;
  products: Setting;
  template: LaboratoryTemplate;
}

const Product = ({ defaultLanguage, products, template }: ProductProps) => {
  let mutSettings =
    products?.settings && mutateForSelect(products?.settings, 'parameter');

  return (
    <fieldset name='product-list'>
      {/* <h6>Product</h6> */}
      <SelectInput
        data={{
          state: mutSettings,
          defaultLanguage: defaultLanguage,
          label: 'Product',
          selectName: 'product',
          fieldSetClass: 'flex flex-col items-start bg-white px-[2px] w-full',
        }}
      />
    </fieldset>
  );
};

export default Product;
