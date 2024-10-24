import { ReactNode } from 'react';
import '../globals.css';
// import { VehicleContextProvider } from '@/state/vehicleContext';
// import { ErrorContextProvider } from '@/state/ErrorContext';

export const metadata = {
	title: 'Okta',
	description: 'Application for internal organization',
};
interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<body>
				{/* <ErrorContextProvider> */}
				{/* <VehicleContextProvider> */}
				{/* <HeaderNavigation /> */}
				{children}
				{/* </VehicleContextProvider> */}
				{/* </ErrorContextProvider> */}
			</body>
		</html>
	);
}
