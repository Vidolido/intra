'use client';
import Link from 'next/link';

// actions
import { displayData } from '@/app/utls/templateFunctions';

const colors = {
  'UNL-95': {
    bg: 'product-blue',
    border: 'product-blue-border',
  },
  'UNL-98': {
    bg: 'product-green',
    border: 'product-green-border',
  },
  ULSD: {
    bg: 'product-yellow',
    border: 'product-yellow-border',
  },
  'JET-A1': {
    bg: 'product-grey',
    border: 'product-grey-border',
  },
  'FUEL OIL': {
    bg: 'product-black',
    border: 'product-black-border',
  },
  'H.G.O.': {
    bg: 'product-red',
    border: 'product-red-border',
  },
  'L.P.G.': {
    bg: 'product-purple',
    border: 'product-purple-border',
  },
};

export default function DisplayTemplates({ data }) {
  const groupedItems = displayData(data);

  return (
    <div className='flex flex-wrap gap-6'>
      {!Object.keys(groupedItems).length && <h2>No data</h2>}
      {Object.entries(groupedItems).map(([collectionName, collection], i) => {
        const color = colors[collectionName];
        // console.log(color);

        return (
          <section
            key={i}
            className={`flex justify-start gap-6 min-h-[200px] min-w-[200px] ${color.border} cursor-pointer`}>
            <div
              className={`flex justify-center items-center min-w-14 ${color.bg}`}>
              <h2 className='rotate-[270deg]'>{collectionName}</h2>
            </div>

            <div>
              {collection.map((item, index) => {
                return (
                  <Link key={index} href={`/dashboard/templates/${item._id}`}>
                    {item.analisysType}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
