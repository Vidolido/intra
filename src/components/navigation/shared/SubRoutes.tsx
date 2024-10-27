'use client';
import { LinkItem, LinksType } from '@/types/typesTS';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//types

const SubRoutes = ({ links }: LinksType) => {
	const pathname: string = usePathname();

	return (
		<div className='flex flex-col bg-[#cf2b2f] border-b border-b-white'>
			{Object.entries(links).map(([id, link]) => {
				return (
					<Link
						key={id}
						href={link.path}
						className={`text-white hover:bg-red-500 py-1 px-2 ${
							pathname === link.path && 'bg-red-500'
						}`}>
						{link.label.toString()}
					</Link>
				);
			})}
		</div>
	);
};

export default SubRoutes;
