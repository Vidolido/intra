import './globals.css';
import { RootLayoutProps } from '@/types/types';
// import HeaderNavigation from '@/components/navigation/HeaderNavigation';
// import { VehicleContextProvider } from '@/state/vehicleContext';
// import { ErrorContextProvider } from '@/state/ErrorContext';

import HeaderNavigation from '@/components/navigation/HederNavigation';

export const metadata = {
	title: 'Okta',
	description: 'Application for internal organization',
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<body>
				{/* <VehicleContextProvider> */}
				<HeaderNavigation />
				{children}
				{/* </VehicleContextProvider> */}
			</body>
		</html>
	);
}
