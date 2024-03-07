'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const languages = ['en', 'mk', 'gr'];
const Languages = () => {
	const [language, setLanguage] = useState('en');

	const router = useRouter();
	const pathname = usePathname();

	// Прави проблем кога ќе се стисне истиот линк
	// да пробам да најдам друг начин за ова
	useEffect(() => {
		router.push(`?lang=${language}`);
	}, [router, pathname, language]);

	const handleOnLangChange = (e) => {
		setLanguage(e.target.value);
		// router.push(`?lang=${e.target.value}`);
	};

	return (
		<select
			className='border-2 border-grey-50 border-opacity-60 rounded px-3 py-1 hover:border-red-200 focus:outline-none cursor-pointer'
			onChange={handleOnLangChange}
			defaultValue={language}>
			{languages.map((lang, i) => (
				<option key={i} value={lang}>
					{lang}
				</option>
			))}
		</select>
	);
};

export default Languages;
