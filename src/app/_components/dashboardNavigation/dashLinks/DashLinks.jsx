'use client';

import { usePathname, useRouter } from 'next/navigation';

// components
import AdditionalLinks from './additionalLinks/AdditionalLinks';

const DashLinks = ({ dashLink }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <button
        className={`px-4 py-1 text-left block w-full text-white hover:bg-[#df4c4e] ${
          pathname.includes(dashLink.path) ? 'bg-[#df4c4e]' : ''
        } font-medium`}
        onClick={() => router.push(`/dashboard/${dashLink.path}`)}>
        {dashLink.title}
      </button>
      {pathname.includes(dashLink.path) && (
        <AdditionalLinks dashLink={dashLink} />
      )}
    </div>
  );
};

export default DashLinks;
