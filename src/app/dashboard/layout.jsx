import DashboardNavigation from '../_components/dashboardNavigation/DashboardNavigation';

const DashboardLayout = ({ children }) => {
  return (
    <main className='flex h-[calc(100vh-100px)]'>
      <DashboardNavigation />
      {children}
    </main>
  );
};

export default DashboardLayout;
