import DashLinks from './dashLinks/DashLinks';

// od baza
const links = [
	{
		title: 'Analisys',
		path: 'analisys',
	},
	{
		title: 'Templates',
		path: 'templates',
	},
	{
		title: 'Settings',
		path: 'settings',
	},
];

const DashboardNavigation = () => {
	return (
		<div
			id='dashboardNav'
			className='flex flex-col w-40 bg-[#cf2b2f] divide-y-4 divide-[#cf2b2f]'>
			{links.map((dashLink) => (
				<DashLinks key={dashLink.title} dashLink={dashLink} />
			))}
		</div>
	);
};

export default DashboardNavigation;
