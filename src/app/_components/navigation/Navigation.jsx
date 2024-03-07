import Link from 'next/link';
import Image from 'next/image';

//custom components
import Links from './links/links';
import Languages from './languages/Languages';

const Navigation = () => {
	return (
		<>
			<Link href='/'>
				<Image src='/logo.png' width={200} height={150} alt='45Years Okta' />
			</Link>
			<Languages />
			<Links />
		</>
	);
};

export default Navigation;
