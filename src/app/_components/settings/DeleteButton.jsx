'use client';

// state/context
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

// actions
import { deleteSettings } from '@/app/_actions/settingsActions';
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

export default function DeleteButton({ settings }) {
	const { deleteButtonLabels } = useStaticSettingsContext();
	const { language } = useGlobalStateContext();

	const handleClick = async () => {
		// console.log(e.target);
		// console.log(settings);
		await deleteSettings(settings);
	};

	return (
		<button
			type='button'
			className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-[0.3rem] px-4 rounded'
			onClick={handleClick}>
			{deleteButtonLabels[language]}
		</button>
	);
}
