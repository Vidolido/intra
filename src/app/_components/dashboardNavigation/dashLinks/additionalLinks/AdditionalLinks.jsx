'use client';

import Link from 'next/link';

const AdditionalLinks = ({ dashLink }) => {
  return (
    <div>
      <Link
        className='p-1 block w-full text-white bg-[#df4c4e] hover:bg-[#f05b5d] text-center font-normal'
        href={`/dashboard/${dashLink.path}/create`}>
        Create New
      </Link>
    </div>
  );
};

export default AdditionalLinks;
