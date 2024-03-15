import DashboardNavigation from '../_components/dashboardNavigation/DashboardNavigation';
import { StaticSettingsContextProvider } from './_state/settings/staticStateContext';

const DashboardLayout = ({ children }) => {
  return (
    <main className='flex min-h-screen gap-2'>
      <StaticSettingsContextProvider>
        <DashboardNavigation />
        {children}
      </StaticSettingsContextProvider>
    </main>
  );
};

export default DashboardLayout;
