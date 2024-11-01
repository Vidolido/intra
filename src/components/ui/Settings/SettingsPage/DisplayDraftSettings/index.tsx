// components

import { Setting } from '@/types/type';
import SingleDraft from './SingleDraft';

interface DisplayDraftSettingsProps {
  drafts: Setting[];
}

const DisplayDraftSettings = ({ drafts }: DisplayDraftSettingsProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <h2>Draft Settings</h2>
      {!drafts.length
        ? 'There are no draft versions.'
        : drafts?.map((draft) => (
            <SingleDraft key={draft?._id.toString()} draft={draft} />
          ))}
    </div>
  );
};

export default DisplayDraftSettings;
