// state/actions
import { orderByProduct } from '@/functions/orderTemplateByProduct';

// components
import Ordered from './Ordered';

// types
import { LaboratoryTemplate, SchemaNames, Setting } from '@/types/type';
interface PublishedTemplatesProps {
  published: LaboratoryTemplate[];
  data: {
    products: Setting;
    types: Setting;
    countries: Setting;
    schemaNames: SchemaNames;
  };
}

const PublishedTemplates = ({ published, data }: PublishedTemplatesProps) => {
  const mutPublished =
    (data?.products?.settings &&
      orderByProduct(published, data.products.settings)) ||
    [];

  return (
    <div className='flex flex-col min-w-[40%] gap-1'>
      <h4>Templates</h4>
      {mutPublished.map(
        (product) =>
          product.templates.length > 0 && (
            <Ordered
              key={product._id.toString()}
              product={product}
              data={data}
            />
          )
      )}
    </div>
  );
};

export default PublishedTemplates;
