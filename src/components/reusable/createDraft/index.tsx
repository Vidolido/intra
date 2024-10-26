'use client';
import { useRouter } from 'next/navigation';

// types
type ActionStatus = {
	error: string | null;
	success: boolean;
	isLoading: boolean;
};

// state/actions
// import { makeDraftSetting } from '@/data-access/settings/makeDraftSetting';
import { makeDraft, ActionResponseSchema } from '@/data-acceess/makeDraft';
import { useState } from 'react';

// components
import ErrorMsg from '../ErrorMsg';
// import ErrorMsg from '@/components/reusable/ErrorMsg';

const CreateDraft = () => {
	const [actionStatus, setActionStatus] = useState<ActionStatus>({
		error: null,
		success: false,
		isLoading: false,
	});
	const router = useRouter();

	const handdleClick = async () => {
		console.log('THIS SHITNOW');
		// const { error, success } = await makeDraft();
		// router.push(`/dashboard/settings/create?_id=${success._id}`);
		try {
			setActionStatus((prev) => ({ ...prev, isLoading: true, error: null }));
			const response = await makeDraft();

			console.log(response, 'the response');

			if (response.success) {
				setActionStatus({
					error: null,
					success: true,
					isLoading: false,
				});
				router.push(`/dashboard/settings/create?_id=${response?.success?._id}`);
			} else {
				setActionStatus({
					error:
						response.error?.document ||
						response.error?.catch ||
						'An unknown error occurred',
					success: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error, 'THE ERROR');
			setActionStatus({
				error:
					error instanceof Error ? error.message : 'An unknown error occurred',
				success: false,
				isLoading: false,
			});
		}
	};

	return (
		<>
			{actionStatus?.error && <ErrorMsg msg={actionStatus?.error} />}
			<button
				type='button'
				onClick={handdleClick}
				className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
				Add New Setting
			</button>
		</>
	);
};

export default CreateDraft;
