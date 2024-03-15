export async function getTemplateData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`, {
    next: { tags: ['templates'], revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data: ' + res.statusText);
  }
  return await res.json();
}
// components
import TemplateForm from '@/app/_components/forms/templateForm/TemplateForm';

const Create = async () => {
  const data = await getTemplateData();

  console.log(data);

  return (
    <div className='w-1/2 px-2'>
      <h3>Create a new Template</h3>
      <TemplateForm data={data} />
    </div>
  );
};

export default Create;
