'use server';
// const {
// 	AnalisysContextProvider,
// } = require('../_state/analisys/analisysContext');
import { AnalisysContextProvider } from '../_state/analisys/analisysContext';

export default async function AnalisysLayout({ children }) {
	return <AnalisysContextProvider>{children}</AnalisysContextProvider>;
}
