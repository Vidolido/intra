import SettingsForm from '@/app/_components/forms/settingsForm/SettingsForm';

export default function Setting({ params, searchParams }) {
	console.log(params, searchParams, 'these props');
	return (
		<div>
			<h2>Setting</h2>
			<SettingsForm />
		</div>
	);
}
