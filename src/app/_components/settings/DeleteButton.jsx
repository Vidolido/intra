'use client';
import { useSearchParams } from 'next/navigation';

// state/context
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

// actions
import { deleteSettings } from '@/app/_actions/settingsActions';

export default function DeleteButton({ settings }) {
	const { deleteButtonLabels } = useStaticSettingsContext();

	const searchParams = useSearchParams();
	const lang = searchParams.get('lang');

	const handleClick = async (e) => {
		// console.log(e.target);
		// console.log(settings);
		await deleteSettings(settings);
	};

	return (
		<button
			type='button'
			className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-[0.3rem] px-4 rounded'
			onClick={handleClick}>
			{deleteButtonLabels[lang]}
		</button>
	);
}
