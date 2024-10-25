import { RootLayoutProps } from '@/types/types';
import '../globals.css';

// components
import DashboardNavigation from '@/components/navigation/DashBoardNavigation';

export const metadata = {
  title: 'Okta - Dashboard',
  description: 'Dashboard',
};

export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <main className='flex gap-2 h-[calc(100vh-75px)]'>
      <div>
        <DashboardNavigation />
      </div>
      {children}
    </main>
  );
}
