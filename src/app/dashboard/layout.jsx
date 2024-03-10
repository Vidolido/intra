import DashboardNavigation from '../_components/dashboardNavigation/DashboardNavigation';

const DashboardLayout = ({ children }) => {
	return (
		<main className='flex min-h-screen gap-2'>
			<DashboardNavigation />
			{children}
		</main>
	);
};

export default DashboardLayout;
