// state/actions
import { ReadonlyURLSearchParams } from 'next/navigation';

// types
import { getSearchParam } from '@/types/types';
type NextSearchParams = {
  searchParams: ReadonlyURLSearchParams & { _id?: string };
};

// state/actions
import { getLanguages, getSectors, getSettingById } from '../../apiCalls';

// components
// import Setting from '@/components/Settings/Setting';
import Setting from '@/components/ui/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ searchParams }: NextSearchParams) => {
  const _id = getSearchParam<string>(searchParams, '_id');
  //   const { _id } = searchParams || '';

  const { languages } = await getLanguages();
  const { sectors } = await getSectors();

  const { setting: draft } = await getSettingById(_id);

  return (
    <Setting
      title='Add New Setting'
      languages={languages}
      sectors={sectors}
      setting={draft}
    />
  );
};

export default page;
