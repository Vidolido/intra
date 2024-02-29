import './globals.css';
import Navigation from './_components/navigation/navigation';

export const metadata = {
  title: 'IntraNet',
  description: 'Апликација за внатрешна организација',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <header className='flex items-center justify-between p-5'>
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
