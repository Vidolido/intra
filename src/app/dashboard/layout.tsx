import '../globals.css';

// components
import DashboardNavigation from '@/components/navigation/DashBoardNavigation';

// types
import { LayoutType } from '@/types/type';

export const metadata = {
	title: 'Okta - Dashboard',
	description: 'Dashboard',
};

export default function DashboardLayout({ children }: LayoutType) {
	return (
		<main className='flex gap-2 h-[calc(100vh-75px)]'>
			<div>
				<DashboardNavigation />
			</div>
			{children}
		</main>
	);
}
