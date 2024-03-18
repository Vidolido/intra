import { SettingsContextProvider } from '../_state/settings/settingsContext';

const SettingsLayout = ({ children }) => {
	return <SettingsContextProvider>{children}</SettingsContextProvider>;
};

export default SettingsLayout;
