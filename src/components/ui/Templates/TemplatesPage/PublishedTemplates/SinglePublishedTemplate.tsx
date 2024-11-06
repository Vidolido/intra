'use client';

// state/actions
import { deleteTemplate } from '@/data-acceess/templates/deleteTemplate';

// components
import Options from '../../shared/Options';
import { LaboratoryTemplate, SchemaNames, Setting } from '@/types/type';
// import Options from '@/components/options/Options'; // might delete or refactor

type SinglePublishedTemplateProps = {
	template: LaboratoryTemplate;
	data: {
		products: Setting;
		types: Setting;
		countries: Setting;
		schemaNames: SchemaNames;
	};
};

const SinglePublishedTemplate = ({
	template,
	data,
}: SinglePublishedTemplateProps) => {
	const handleDelete = async (_id: string) => {
		// console.log(_id, 'DELETE ITEM');
		// await deleteDraftSetting(_id);
		await deleteTemplate(_id, 'published');
	};
	const name = template.templateName ?? null;
	// const documentType =
	// 	data?.types?.settings &&
	// 	data?.types?.settings.find(
	// 		(type) => type._id === template?.header?.documentType
	// 	);
	// const sampleType =
	// 	(data?.types?.settings &&
	// 		data.types?.settings.find(
	// 			(type) => type._id === template?.header?.sampleType
	// 		)) ||
	// 	'none';

	// const country =
	// 	data?.countries?.settings &&
	// 	data.countries?.settings.find(
	// 		(country) => country._id === template?.header?.origin
	// 	);
	console.log(template, 'template');
	console.log(data, 'data');
	return (
		<>
			{/* <p className='pl-1 border-l border-transparent'>
				{documentType?.parameter.en || '--'}
			</p>
			<p className='pl-1 border-l border-slate-300'>
				{country?.parameter['en'] || '--'}
			</p> */}
			{/* <p className='pl-1 border-l border-slate-300'>
				{sampleType !== 'none' ? sampleType?.parameter['en'] : '--'}
			</p> */}
			{/* <p className='pl-1 border-l border-slate-300'>
				{sampleType !== 'none' ? sampleType?.parameter['en'] : '--'}
			</p> */}
			<p className='w-full pl-1 border-l border-slate-300'>
				{name ? name : 'Please name this template.'}
			</p>
			<div className='border-l border-slate-300 relative'>
				<Options
					_id={template._id}
					edit={{
						show: true,
						link: '/dashboard/laboratory/templates/edit/',
						classes: 'hover:underline text-black',
					}}
					deleteItem={{
						show: true,
						type: 'default',
						onClick: handleDelete,
						classes: 'self-end',
					}}
				/>
			</div>
		</>
	);
};

export default SinglePublishedTemplate;
