import { StaticSettingsContextProvider } from '../_state/settings/staticStateContext';
import { SettingsContextProvider } from '../_state/settings/settingsContext';

const SettingsLayout = ({ children }) => {
  return (
    // <StaticSettingsContextProvider>
    <SettingsContextProvider>{children}</SettingsContextProvider>
    // </StaticSettingsContextProvider>
  );
};

export default SettingsLayout;
