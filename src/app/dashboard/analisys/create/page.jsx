// actions
// import { getTemplate } from '@/app/_actions/analisysActions';
import { getTemplates } from '../../templates/page';

// components
import AnalisysForm from '@/app/_components/forms/analisysForm/AnalisysForm';

// export const revalidate = 0;
export default async function Create() {
	// console.log(template, 'the template');
	const data = await getTemplates();
	// console.log(data, 'the data');
	return (
		<div className='w-10/12'>
			<h3>Create a new document</h3>
			<AnalisysForm templates={data} />
		</div>
	);
}
