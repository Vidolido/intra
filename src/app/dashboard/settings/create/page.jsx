import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';
import { SettingsContextProvider } from '../../_state/settings/SettingsContext';

const Create = () => {
	return (
		<div className='w-1/2 px-2'>
			<h2 className='mb-2'>Create New Setting</h2>
			{/* <SettingsContextProvider> */}
			<SettingsForm />
			{/* </SettingsContextProvider> */}
		</div>
	);
};

export default Create;
