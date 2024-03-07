// import SettingsForm from '../../../../../deletedFiles/SettingsForm';
// import { SettingsContextProvider } from '../../../../../deletedFiles/SettingsContext';
import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';

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
