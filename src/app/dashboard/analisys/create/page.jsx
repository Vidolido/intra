import AnalisysForm from '@/app/_components/forms/analisysForm/AnalisysForm';

export default async function Create() {
	return (
		<div className='w-10/12'>
			<h3>Create a new document</h3>
			<AnalisysForm />
		</div>
	);
}
