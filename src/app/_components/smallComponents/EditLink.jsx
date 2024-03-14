'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// state/context
import { useGlobalStateContext } from '@/app/_globalState/globalStateContext';

const EditLink = ({ groupName }) => {
	const [setting, setSetting] = useState('');
	// const globalState = useGlobalStateContext();
	const { language } = useGlobalStateContext();
	// const { language } = useGlobalStateContext();
	// console.log(language, 'the language in EditLink');
	// console.log(groupName, language, 'THESE ARE THE ONES');

	useEffect(() => {
		if (!groupName[language]) {
			// alert(`${language} does not have a ${groupName}`);
			// const newGroupName = Object.values(groupName)[0];
			// console.log(newGroupName, 'NEW GROUP NAME');
			setSetting(Object.values(groupName)[0].toString().split(' ').join('-'));
		} else {
			setSetting(groupName[language].toString().split(' ').join('-'));
		}
	}, [groupName, language]);

	return (
		<Link
			className='bg-red-500 hover:bg-red-700 text-white font-bold py-[0.3rem] px-4 rounded'
			href={`/dashboard/settings/${setting}?lang=${language}`}>
			Edit
		</Link>
	);
};

export default EditLink;
