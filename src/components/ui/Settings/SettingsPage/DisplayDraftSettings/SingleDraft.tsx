'use client';
import Link from 'next/link';

// state/actions
import { deleteSettingDocument } from '@/data-acceess/settings/deleteSettingsDocument';

// components
import ContextButton from '@/components/reusable/ContextButton';
import { Setting } from '@/types/type';
import { formatDate } from '@/functions/formatDate';

interface SingleDraftProps {
	draft: Setting;
}

const SingleDraft = ({ draft }: SingleDraftProps) => {
	const handleDelete = async (_id: string) => {
		await deleteSettingDocument(_id, 'draft');
	};

	// let time = new Date(draft?.createdAt).toDateString();
	let { date, time } = formatDate(draft?.createdAt);

	return (
		<div className='flex gap-2 justify-between border-2 border-slate-200 hover:border-red-200 p-2'>
			<Link
				key={draft?._id.toString()}
				href={`/dashboard/settings/draft/${draft._id.toString()}`}>
				{/* <h5>{draft?._id.toString()}</h5> */}
				{draft?.settingName && (
					<p>
						<b>Name: </b>
						<span>{draft?.settingName}</span>
					</p>
				)}
				<div className='flex gap-1'>
					<p>
						<b>Date: </b>
						<span>{date}</span>
					</p>
					<span> | </span>
					<p>
						<b>Time: </b>
						<span>{time}</span>
					</p>
				</div>
			</Link>
			<ContextButton
				label='Delete'
				type='edit'
				onClick={() => handleDelete(draft._id.toString())}
				classes='self-end'
			/>
		</div>
	);
};

export default SingleDraft;
