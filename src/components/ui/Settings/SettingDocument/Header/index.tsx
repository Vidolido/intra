'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';

// state/actions
import { saveSettingHeader } from '@/data-acceess/settings/saveSettingHeader';
import { mutateForSelect } from '@/functions/mutateForSelect';

// components
import ShowHideButton from '@/components/reusable/ShowHideButton';
import SelectInput from '@/components/reusable/Inputs/SelectInput';
import NormalInput from '@/components/reusable/Inputs/NormalInput';
import ContextButton from '@/components/reusable/ContextButton';
import ErrorMsg from '@/components/reusable/ErrorMsg';

// types
import { ActionResponse, BusinessAreas, Language, Setting } from '@/types/type';

const status = [
	{
		_id: null,
		name: {
			en: 'draft',
			mk: 'драфт',
			gr: 'гр',
		},
	},
	{
		_id: null,
		name: {
			en: 'published',
			mk: 'објавен',
			gr: 'гр',
		},
	},
];

interface HeaderFormProps {
	languages: Language[];
	businessAreas: BusinessAreas[];
	setting: Setting;
}

const HeaderForm = ({ languages, businessAreas, setting }: HeaderFormProps) => {
	const [state, formAction] = useFormState<ActionResponse, FormData>(
		saveSettingHeader,
		{
			data: null,
			success: null,
			error: null,
			message: null,
			component: null,
			isLoading: false,
		}
	);
	let hasName = setting.settingName;
	const [visible, setVisible] = useState(() => !hasName);
	const defaultLanguage = languages[0]?.language.toString() || 'en';

	const settingName = !hasName ? '' : setting?.settingName;

	const businessAreasTransformed = mutateForSelect(businessAreas);

	return (
		<form
			action={formAction}
			className='p-1 border border-slate-200 rounded w-full min-w-72 mb-1'>
			<input
				type='text'
				className='hidden'
				defaultValue={setting._id.toString()}
				name='document_id'
			/>
			<ShowHideButton
				heading='Document Settings'
				visible={visible}
				onClick={() => setVisible(!visible)}
			/>

			{visible && (
				<div
					className={`flex w-full gap-[1px] bg-white border-[1px] border-slate-200 rounded pb-1`}>
					<SelectInput
						data={{
							defaultLanguage,
							state: businessAreasTransformed,
							defaultValue: setting?.businessArea?.toString(),
							label: 'Business Area',
							selectName: 'businessArea',
							showEmptyOption: false,
							fieldSetClass: 'flex flex-col items-start bg-white px-[2px]',
						}}
					/>
					<NormalInput
						data={{
							state: settingName,
							name: 'settingName',
							label: 'Setting Name',
							fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
							inputClass:
								'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
							required: true,
						}}
					/>

					{hasName && (
						<SelectInput
							data={{
								state: status,
								defaultValue: setting?.documentStatus,
								label: 'Status',
								selectName: 'status',
								showEmptyOption: false,
								fieldSetClass: 'flex flex-col items-start bg-white px-[2px]',
								defaultLanguage,
							}}
						/>
					)}
				</div>
			)}

			{state?.error && <ErrorMsg msg={state?.message} />}
			{visible && (
				<ContextButton
					label='Save Document Settings'
					type='edit'
					onClick={(e) => {
						e.preventDefault();
						const targetForm = (e.target as HTMLButtonElement).form;
						if (targetForm) targetForm.requestSubmit();
					}}
					classes='w-full mt-[2px]'
					formMethod='post'
				/>
			)}
		</form>
	);
};

export default HeaderForm;
