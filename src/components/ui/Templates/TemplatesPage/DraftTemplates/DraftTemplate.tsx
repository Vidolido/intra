'use client';
import Link from 'next/link';

// state/actions
import { deleteTemplate } from '@/data-acceess/templates/deleteTemplate';

// components
import ContextButton from '@/components/reusable/ContextButton';

// types
import { LaboratoryTemplate } from '@/types/type';
import { formatDate } from '@/functions/formatDate';

const DraftTemplate = ({ draft }: { draft: LaboratoryTemplate }) => {
	const handleDelete = async (_id: string) => {
		await deleteTemplate(_id, 'draft');
	};
	const templateName = draft?.templateName || null;
	let { date, time } = formatDate(draft?.createdAt);
	return (
		<div className='flex gap-2 justify-between p-2'>
			<Link
				key={draft?._id?.toString()}
				href={`/dashboard/laboratory/templates/draft/${draft._id}`}>
				{templateName && (
					<p>
						<b>Name: </b> <span>{templateName}</span>
					</p>
				)}
				<p>
					<b>Date: </b>
					<span>{date}</span>
					<span> | </span>
					<b>Time: </b>
					<span>{time}</span>
				</p>
			</Link>
			<ContextButton
				label='Delete'
				type='edit'
				onClick={() => draft?._id && handleDelete(draft?._id?.toString())}
			/>
		</div>
	);
};

export default DraftTemplate;
