import DashboardNavigation from '../_components/dashboardNavigation/DashboardNavigation';

const DashboardLayout = ({ children }) => {
	return (
		<main className='flex min-h-[calc(100vh-90px)]'>
			<DashboardNavigation />
			{children}
		</main>
	);
};

export default DashboardLayout;
