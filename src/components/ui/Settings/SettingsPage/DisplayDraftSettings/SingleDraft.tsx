'use client';
import Link from 'next/link';

// state/actions
import { deleteSettingDocument } from '@/data-acceess/settings/deleteSettingsDocument';

// components
import ContextButton from '@/components/reusable/ContextButton';
import { Setting } from '@/types/type';

interface SingleDraftProps {
  draft: Setting;
}

const SingleDraft = ({ draft }: SingleDraftProps) => {
  const handleDelete = async (_id: string) => {
    await deleteSettingDocument(_id, 'draft');
  };

  let time = new Date(draft?.createdAt).toDateString();
  return (
    <div className='flex gap-2 justify-between border-2 border-slate-200 hover:border-red-200 p-2'>
      <Link
        key={draft?._id.toString()}
        href={`/dashboard/settings/draft/${draft._id.toString()}`}>
        {/* <h5>{draft?._id.toString()}</h5> */}
        <p>
          <b>Name: </b>
          <span>{draft?.settingName}</span>
        </p>
        <p>
          <b>Time: </b>
          <span>{time}</span>
        </p>
      </Link>
      <ContextButton
        label='Delete'
        type='edit'
        onClick={() => handleDelete(draft._id.toString())}
        classes='self-end'
      />
    </div>
  );
};

export default SingleDraft;
