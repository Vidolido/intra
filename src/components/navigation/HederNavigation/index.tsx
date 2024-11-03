import Link, { LinkProps } from 'next/link';
import Image from 'next/image';

// types
// import { LinksStateTypes } from '@/types/typesTS';

// components
import Links from '../shared/Links';
import { LinksStateTypes } from '@/types/type';

const links: LinksStateTypes = {
	home: {
		label: { en: 'Overview', mk: 'Преглед' },
		path: '/',
	},
	carPool: {
		label: { en: 'Car Pool', mk: 'Возен Парк' },
		path: '/car-pool',
	},
	dashboard: {
		label: { en: 'Dashboard', mk: 'Контролен панел' },
		path: '/dashboard',
	},
	login: {
		label: { en: 'Login', mk: 'Најава' },
		path: '/login',
	},
};

const HeaderNavigation = () => {
	return (
		<header className='flex justify-between p-1'>
			<Link href='/'>
				<Image
					width={200}
					height={60}
					src='/files/logo.png'
					alt='The company symbol'
					priority
				/>
			</Link>
			<nav className='flex justify-between gap-2 p-5'>
				{Object.entries(links).map(([id, link]) => {
					return <Links key={id} link={link} location='header' />;
				})}
			</nav>
		</header>
	);
};

export default HeaderNavigation;
