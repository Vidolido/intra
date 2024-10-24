import '../globals.css';
import { RootLayoutProps } from '@/types/types';
// import { VehicleContextProvider } from '@/state/vehicleContext';
// import { ErrorContextProvider } from '@/state/ErrorContext';

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
