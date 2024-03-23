'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';
import { useStaticSettingsContext } from '@/app/dashboard/_state/settings/staticStateContext';

const EditLink = ({ groupName }) => {
	const { language } = useGlobalStateContext();
	const { editButtonLabels } = useStaticSettingsContext();

	const router = useRouter();

	// local state
	const [route, setRoute] = useState();

	useEffect(() => {
		if (!groupName[language]) {
			setRoute(
				'/dashboard/settings/' +
					Object.values(groupName)[0] +
					'?lang=' +
					Object.keys(groupName)[0]
			);
		} else {
			setRoute(
				'/dashboard/settings/' +
					groupName[language].toString().split(' ').join('-') +
					'?lang=' +
					language
			);
		}
	}, [groupName, language]);

	return (
		<button
			type='button'
			onClick={() => router.push(route)}
			className='bg-red-500 hover:bg-red-700 text-white font-bold py-[0.3rem] px-4 rounded'>
			{editButtonLabels[language]}
		</button>
	);
};

export default EditLink;
