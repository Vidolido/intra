'use client';
import { useEffect, useState } from 'react';

// state/actions
import { saveOptionSchema } from '@/data-acceess/settings/saveOptionSchema';

// components
// import ArrowSvg from '@/../public/arrow.svg';
// import MainInput from './MainInput';
// import AddCollections from './AddCollections';
// import Collections from './Collections';
import ErrorMsg from '@/components/reusable/ErrorMsg';
import MainInput from './MainInput';
import ShowHideButton from '@/components/reusable/ShowHideButton';
import ContextButton from '@/components/reusable/ContextButton';

// types
import { Options, Settings } from '@/types/zod/settingSchema';
import { LanguageSchema } from '@/types/zod/languagesSchema';
import { createInitialState } from '@/components/ui/Settings/SettingDocument/helpers';
import { ActionResponse, ResetComponentsData } from '@/types/zod/typesZ';

type OptionsSchemaProps = {
	setting: Settings;
	languages: LanguageSchema[];
};
type Parameter = {
	name: {
		[key: string]: Record<string, string>;
	};
};
type DataObj = {
	[key: string]: string;
};
const OptionsSchema = ({ setting, languages }: OptionsSchemaProps) => {
	let optionsSchema = setting.optionsSchema;
	const [state, setState] = useState<Options | null>(() =>
		createInitialState(optionsSchema)
	);
	const [visible, setVisible] = useState(setting?.optionsSchema ? false : true);
	// const [resetComponents, setResetComponents] = useState({
	// 	submit: false,
	// 	add: false,
	// 	collections: false,
	// });
	const [actionStatus, setActionStatus] = useState<ActionResponse>({
		error: false,
		success: true,
		data: null,
	});
	const [resetComponents, setResetComponents] = useState<ResetComponentsData>({
		singular: false,
		plural: false,
		collections: false,
		collection: '',
	});

	console.log(state, 'the state');

	const handleParameter = (
		data: Parameter,
		dataObj: { [key: string]: string }
	) => {
		console.log(data, dataObj);
	};
	const handleParameterChange = (data: Parameter, dataObj: DataObj) => {
		const param: Parameter | undefined = state?.parameter;
		const { _id, name } = dataObj;
		// if (data != null && name.length > 0) {
		// 	const newState: Parameter = { ...param };
		// 	newState?.parameter[name] = data;
		// }
	};
	// const handleParameterChange = (data, dataObj) => {
	// let { name } = dataObj;
	// let parameter: Parameter | null = (state && { ...state?.parameter }) || {};
	// if (name && name.length > 0 && parameter != null) {
	// 	parameter[name] = data;
	// }
	// };
	// const [resetLanguage, setResetLanguage] = useState({
	// 	submit: false,
	// 	add: false,
	// 	collections: false,
	// });

	// const handleCollectionsUpdate = (collections) => {
	// 	setState((prev) => ({ ...prev, collections }));
	// };
	const submit = () => console.log('CLICKED');
	// const submit = async () => {
	// 	const { error, success } = await saveOptionSchema(
	// 		state,
	// 		setting._id.toString()
	// 	);
	// 	setActionStatus({
	// 		error: error || null,
	// 		success: success || null,
	// 	});
	// 	setResetLanguage({
	// 		submit: true,
	// 		add: true,
	// 		collections: true,
	// 	});
	// };

	return (
		<form className='flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-1 rounded min-w-72 w-full mb-1'>
			<input
				type='text'
				className='hidden'
				defaultValue={setting._id.toString()}
				name='document_id'
			/>
			<ShowHideButton
				heading='Options Schema'
				visible={visible}
				onClick={() => setVisible(!visible)}
			/>
			{visible && (
				<>
					<MainInput
						languages={languages}
						actionStatus={actionStatus}
						state={state}
						setState={handleParameter}
						reset={{
							resetData: resetComponents,
							setReset: setResetComponents,
							// resetType: 'submit',
							components: ['singular', 'plural'],
						}}
					/>
					{/* 
					<AddCollections
						languages={languages}
						setState={setState}
						setActionStatus={setActionStatus}
						reset={{
							resetData: resetComponents,
							setReset: setResetComponents,
							resetType: 'add',
						}}
					/>

					{actionStatus?.error?.collections && (
						<ErrorMsg msg={actionStatus?.error?.collections} />
					)}

					{!!state?.collections.length && (
						<Collections
							languages={languages}
							state={state}
							setState={setState}
							functions={{ handleCollectionsUpdate }}
							reset={{
								resetData: resetComponents,
								setReset: setResetComponents,
								resetType: 'add',
							}}
						/>
					)} */}
					<ContextButton
						label='Save Options Schema'
						type='edit'
						onClick={submit}
						classes=''
						formMethod=''
					/>
				</>
			)}
		</form>
	);
};

export default OptionsSchema;
