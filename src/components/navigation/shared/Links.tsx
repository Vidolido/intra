'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// components
import SubRoutes from './SubRoutes';
// types
import { LanguageMap, LinkContents, LinksProps } from '@/types/type';
type Classes = {
	[key: string]: string;
};

const Links = ({ link, location }: LinksProps) => {
	const pathname: string = usePathname();
	const { path, label, additionalLinks = null }: LinkContents = link;

	const getLabel = (label: LanguageMap) => {
		if (typeof label === 'string') {
			return label;
		}
		return label.en || Object.values(label)[0];
	};

	const classes: Classes = {
		header: `border-b-2 ${
			pathname === path || pathname.includes(getLabel(label).toLowerCase())
				? 'border-b-red-600'
				: 'border-b-[#fff]'
		} hover:border-b-red-800 block`,
		dashboard: `p-1 text-white hover:bg-red-500 ${
			pathname.includes(path) ? 'bg-red-500' : ''
		}`,
	};

	return (
		<>
			<Link href={path} className={classes[location]}>
				{getLabel(label)}
			</Link>
			{additionalLinks && pathname.includes(path) ? (
				<SubRoutes links={additionalLinks} />
			) : null}
		</>
	);
};

export default Links;
