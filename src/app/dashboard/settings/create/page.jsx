// state/context
import { StaticSettingsContextProvider } from '../../_state/settings/staticStateContext';
import { SettingsContextProvider } from '../../_state/settings/settingsContext';

//components
import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';

const Create = () => {
	return (
		<div className='w-1/2 px-2'>
			<StaticSettingsContextProvider>
				<SettingsContextProvider>
					<SettingsForm />
				</SettingsContextProvider>
			</StaticSettingsContextProvider>
		</div>
	);
};

export default Create;
