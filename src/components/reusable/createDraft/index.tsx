'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// types
type ActionStatus = {
	error: string | null;
	success: boolean;
	isLoading: boolean;
};

// state/actions
import { makeDraft } from '@/data-acceess/makeDraft';

// components
import ErrorMsg from '../ErrorMsg';

const CreateDraft = () => {
	const [actionStatus, setActionStatus] = useState<ActionStatus>({
		error: null,
		success: false,
		isLoading: false,
	});
	const router = useRouter();

	const handdleClick = async () => {
		try {
			setActionStatus((prev) => ({ ...prev, isLoading: true, error: null }));
			const response = await makeDraft('Setting');

			// console.log(response, 'the response');

			if (response.success != null) {
				setActionStatus({
					error: null,
					success: true,
					isLoading: false,
				});
				router.push(
					`/dashboard/settings/create?_id=${response?.data?._id.toString()}`
				);
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
			{actionStatus?.error && (
				<p>
					<ErrorMsg msg={actionStatus?.error} />
				</p>
			)}
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
