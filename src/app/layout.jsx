import './globals.css';
import Navigation from './_components/navigation/navigation';
import { GlobalStateContextProvider } from './_globalState/globalStateContext';
import { GlobalStateDispatchContext } from './_globalState/globalStateContext';

export const metadata = {
  title: 'IntraNet',
  description: 'Апликација за внатрешна организација',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <GlobalStateContextProvider>
          <GlobalStateContextProvider>
            <header className='flex items-center justify-between p-5'>
              <Navigation />
            </header>
            {children}
          </GlobalStateContextProvider>
        </GlobalStateContextProvider>
      </body>
    </html>
  );
}
