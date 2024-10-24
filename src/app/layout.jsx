// import HeaderNavigation from '@/components/navigation/HeaderNavigation';
// import './globals.css';
// import { VehicleContextProvider } from '@/state/vehicleContext';
// import { ErrorContextProvider } from '@/state/ErrorContext';

export const metadata = {
  title: 'Okta',
  description: 'Application for internal organization',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {/* <VehicleContextProvider> */}
        {/* <HeaderNavigation /> */}
        {children}
        {/* </VehicleContextProvider> */}
      </body>
    </html>
  );
}
