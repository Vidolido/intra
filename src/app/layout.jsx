import './globals.css';

// state/context
import { GlobalStateContextProvider } from './_globalState/globalStateContext';

// components
import Navigation from './_components/navigation/navigation';

export const metadata = {
	title: 'IntraNet',
	description: 'Апликација за внатрешна организација',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<GlobalStateContextProvider>
					<header className='flex items-center justify-between p-5'>
						<Navigation />
					</header>
					{children}
				</GlobalStateContextProvider>
			</body>
		</html>
	);
}
