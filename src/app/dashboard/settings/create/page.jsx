//components
import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';

export default function Create() {
	return (
		<div className='w-1/2 px-2'>
			{/* <h3>Create a new Setting</h3> */}
			<SettingsForm data={undefined} shouldUpdate={false} />
		</div>
	);
}
