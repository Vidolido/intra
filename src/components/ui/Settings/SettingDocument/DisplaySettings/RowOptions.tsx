import OptionsSvg from '@/../public/files/options.svg';
import ContextButton from '@/components/reusable/ContextButton';
import { OptionsState } from '@/types/type';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface Test {
	_id: string;
	showOptions: boolean;
	edit: boolean;
	expand: boolean;
}

interface RowOptionsProps {
	documentId: string;
	settingId: string;
	option: Test | undefined;
	setOptions: Dispatch<SetStateAction<OptionsState>>;
}

const RowOptions = ({
	documentId,
	settingId,
	option,
	setOptions,
}: RowOptionsProps) => {
	const handleOptions = useCallback(
		(optionId: string, key: 'showOptions' | 'expand' | 'edit') => {
			setOptions((prev) =>
				prev.map((opt) =>
					opt._id === optionId
						? { ...opt, [key]: !opt[key] }
						: { ...opt, showOptions: false, expand: false, edit: false }
				)
			);
		},
		[setOptions]
	);

	const defaultState = {
		showOptions: false,
		edit: false,
		expand: false,
	};

	const handleDelete = (settingId: string, documentId: string) => {
		console.log(settingId, documentId, 'delete');
	};
	const currentOption = option || defaultState;
	return (
		<td className='cursor-pointer align-top relative'>
			<OptionsSvg
				onClick={() => handleOptions(settingId, 'showOptions')}
				className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px]'
			/>
			<div
				className={`flex flex-col absolute top-0 right-[-65px] ${
					currentOption.showOptions ? 'visible' : 'hidden'
				}`}>
				<ContextButton
					label='expand'
					type='default'
					onClick={() => handleOptions(settingId, 'expand')}
				/>
				<ContextButton
					label='edit'
					type='default'
					onClick={() => handleOptions(settingId, 'edit')}
				/>
				<ContextButton
					label='delete'
					type='default'
					onClick={() => handleDelete(settingId, documentId)}
				/>
			</div>
		</td>
	);
};

export default RowOptions;
