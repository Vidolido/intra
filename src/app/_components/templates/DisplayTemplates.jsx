// 'use client';
import Link from 'next/link';

import { displatData } from '@/app/utls/templateFunctions';

const colors = {
	'UNL-95': '#28cc3b',
	'UNL-98': '#2885cc',
	ULSD: '#dae263',
	'JET-A1': '#efefef',
	'FUEL OIL': '#b5b5b5',
	'H.G.O.': '#f72a2d',
	'L.P.G.': '#892af7',
};

// export default function DisplayTemplates({ data }) {
export default async function DisplayTemplates({ data }) {
	const groupedItems = displatData(data);
	console.log(groupedItems);
	return (
		<div className='flex flex-wrap gap-6'>
			{!Object.keys(groupedItems).length && <h2>No data</h2>}
			{Object.entries(groupedItems).map(([collectionName, collection], i) => {
				let bg = 'bg-[#' + colors[collectionName] + ']';

				return (
					<section
						key={i}
						style={{ border: `2px solid ${colors[collectionName]}` }}
						className='flex justify-start gap-6 min-h-[200px] min-w-[200px]'>
						<div
							style={{ backgroundColor: colors[collectionName] }}
							className={`flex justify-center items-center min-w-14 border border-white`}>
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
