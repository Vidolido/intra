// state/actions
import { orderByBusinessArea } from '@/functions/orderByBusinessArea';

// components
import Ordered from './Ordered';

// types
import { BusinessAreaGroup, BusinessAreas, Setting } from '@/types/type';
interface PublishedSettingsProps {
  businessAreas: BusinessAreas[];
  published: Setting[];
}

const PublishedSettings = ({
  businessAreas,
  published,
}: PublishedSettingsProps) => {
  const mutPublished = orderByBusinessArea(businessAreas, published) || [];

  console.log(mutPublished, 'mutPub');
  return (
    <div className='flex flex-col gap-1'>
      <h2>Settings</h2>
      {mutPublished.map((ordered, i) => (
        <Ordered key={i} groupedSetting={ordered} />
      ))}
    </div>
  );
};

export default PublishedSettings;
