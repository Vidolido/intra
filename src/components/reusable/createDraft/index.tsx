'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraft } from '@/data-acceess/makeDraft';

// components
import ErrorMsg from '../ErrorMsg';

// types
import { ActionResponse } from '@/types/type';

const CreateDraft = () => {
	const router = useRouter();
	const [actionStatus, setActionStatus] = useState<ActionResponse>({
		data: null,
		success: null,
		error: null,
		message: null,
		component: null,
		isLoading: false,
	});

	const handdleClick = async () => {
		setActionStatus((prev) => ({ ...prev, isLoading: true }));
		try {
			const response = await makeDraft('Setting');

			if (!response) {
				throw new Error('No response received from server');
			}

			if (response.success && response.data?._id) {
				setActionStatus({
					data: response.data,
					success: true,
					error: null,
					message: response.message || 'Draft created successfully',
					component: null,
					isLoading: false,
				});
				router.push(`/dashboard/settings/create?_id=${response.data._id}`);
				return;
			}

			setActionStatus({
				data: null,
				success: false,
				error: true,
				message: response.message || 'Failed to create draft',
				component: 'createDraft',
				isLoading: false,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'An unexpected error occurred';

			setActionStatus({
				data: null,
				success: false,
				error: true,
				message: errorMessage,
				component: 'createDraft',
				isLoading: false,
			});
		}
	};

	const isLoading = actionStatus.isLoading;
	const hasError =
		actionStatus.error && actionStatus.component === 'createDraft';
	return (
		<>
			{hasError && (
				<ErrorMsg msg={actionStatus.message || 'An error occurred'} />
			)}
			<button
				type='button'
				onClick={handdleClick}
				disabled={isLoading}
				className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
				{isLoading ? 'Creating...' : 'Add New Setting'}
			</button>
		</>
	);
};

export default CreateDraft;
