// import Links from './Links';

import { LinksStateTypes } from '@/types/types';
import Links from '../Links';

const links: LinksStateTypes = {
	laboratory: {
		label: { en: 'Laboratory', mk: 'Лабораторија' },
		path: '/dashboard/laboratory',
		additionalLinks: [
			{
				label: { en: 'All Documents', mk: 'Сите Документи' },
				path: '/dashboard/laboratory/documents/all',
			},
			{
				label: { en: 'New Document', mk: 'Нов Документ' },
				path: '/dashboard/laboratory/documents',
			},
			{
				label: { en: 'Templates', mk: 'Шаблони' },
				path: '/dashboard/laboratory/templates',
			},
		],
	},
	administration: {
		label: { en: 'Administration', mk: 'Администрација' },
		path: '/dashboard/administration',
		additionalLinks: [
			{
				label: { en: 'Vehicles', mk: 'Возила' },
				path: '/dashboard/administration/vehicles',
			},
			{
				label: { en: 'Rentals', mk: 'Јавни' },
				path: '/dashboard/administration/rentals',
			},
		],
	},
	customers: {
		label: { en: 'Customers', mk: 'Клиенти' },
		path: '/dashboard/admin/customers',
	},
	users: {
		label: { en: 'Users', mk: 'Корисници' },
		path: '/dashboard/admin/users',
	},
	settings: {
		label: { en: 'Settings', mk: 'Подесувања' },
		path: '/dashboard/settings',
	},
};

const DashboardNavigation: React.FC = () => {
	return (
		<nav
			id='dashboardNav'
			className='flex flex-col w-[130px] h-full bg-[#cf2b2f]'>
			{Object.entries(links).map(([id, link]) => {
				return <Links key={id} link={link} location='dashboard' />;
			})}
		</nav>
	);
};

export default DashboardNavigation;
