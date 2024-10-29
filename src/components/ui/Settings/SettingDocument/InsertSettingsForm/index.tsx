'use client';
import { useEffect, useState } from 'react';
import { createCollectionsState } from '../helpers';

// state/actions
// import { insertSettings } from '@/data-access/settings/insertSettings';
// import { isObjectEmpty } from '@/utils/helpers/isObjectEmpty';

// components
// import LanguageInput from '@/components/reusable/LanguageInput';
// import SelectInput from '@/components/reusable/SelectInput';
// import ErrorMsg from '@/components/reusable/ErrorMsg';
// import RadioButtons from './RadioButtons';
// import CollectionInput from './CollectionInput';
// import DisplayCollections from './DisplayCollections';
// import ContextButton from '@/components/buttons/ContextButton';
import {
	ActionResponse,
	CollectionsOuput,
	Language,
	LanguageMap,
	Parameter,
	ResetComponentsData,
	Setting,
} from '@/types/type';
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import ErrorMsg from '@/components/reusable/ErrorMsg';
import RadioButtons from './RadioButtons';
import SelectInput from '@/components/reusable/Inputs/SelectInput';
import CollectionInput from './CollectionInput';
import DisplayCollections from './DisplayCollections';
import ContextButton from '@/components/reusable/ContextButton';
import { isObjectEmpty } from '@/functions/isObjectEmpty';

interface InsertSettingsFormProps {
	languages: Language[];
	setting: Setting;
}

type StateSchema = {
	parameter: LanguageMap;
	collections: CollectionsOuput;
};

const InsertSettingsForm = ({
	setting,
	languages,
}: InsertSettingsFormProps) => {
	let parameterName = setting.optionsSchema?.parameter;
	let collections = setting.optionsSchema?.collections;

	// const [state, setState] = useState(() => insertSettingsProps?.state || {});

	// const [state, setState] = useState<StateSchema>({
	// 	parameter: {},
	// 	collections:
	// 		createCollectionsState(collections) || ({} as CollectionsOuput),
	// });
	const [state, setState] = useState<StateSchema>({
		parameter: {},
		collections: createCollectionsState(collections) || {},
	});
	const [selectedCollection, setSelectedCollection] = useState(
		(collections && collections[0]._id?.toString()) || ''
	);

	const [actionStatus, setActionStatus] = useState<ActionResponse>({
		data: null,
		success: null,
		error: null,
		message: null,
		component: null,
		isLoading: false,
	});
	const [resetComponents, setResetComponents] = useState<ResetComponentsData>({
		singular: false,
		plural: false,
		collections: false,
		collection: '',
	});
	// const [actionStatus, setActionStatus] = useState({
	//   error: null,
	//   success: null,
	// });
	const [inputType, setInputType] = useState('simple');
	const [inputData, setInputData] = useState(null);

	// const [resetComponents, setResetComponents] = useState({
	//   submit: false,
	//   add: false,
	//   collections: false,
	// });

	useEffect(() => {
		if (
			collections &&
			Object.keys(collections).length !==
				Object.keys(state.collections || {}).length
		) {
			setState((prev) => ({
				...prev,
				collections: createCollectionsState(collections),
			}));
		}
	}, [collections, state.collections]);

	const handleMainParam = (data: LanguageMap) => {
		setState((prev) => ({ ...prev, parameter: data }));
	};

	const handleChangeInputType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputType(e.target.value);
		setInputData(null);
	};

	const handleSelection = (data: string) => {
		setSelectedCollection(data);
	};

	const handleSubmit = async () => {
		let col: CollectionsOuput = state.collections;
		let areCollectionsEmpty = Object.values(col).every(
			(coll) => coll === undefined || (Array.isArray(coll) && coll.length === 0)
		);

		let isEmpty = isObjectEmpty(state?.parameter);

		if (isEmpty) {
			setActionStatus({
				data: null,
				success: null,
				error: true,
				message: "This field can't be empty.",
				component: null,
				isLoading: false,
			});

			// setActionStatus({
			//   error: { mainParameter: "This field can't be empty." },
			//   success: null,
			// });
		} else if (areCollectionsEmpty) {
			setActionStatus({
				error: { collectionInput: 'Enter a value' },
				success: null,
			});
		} else {
			const { error, success } = await insertSettings(state, setting._id);
			setActionStatus({
				error: error || null,
				success: success || null,
			});
			console.log(success, 'SUCCEESSS');
			success &&
				(setInputType('simple'),
				setState(insertSettingsProps?.state),
				setSelectedCollection(insertSettingsProps?.selected),
				setResetComponents({ submit: true, add: true, collections: true }));
		}
	};

	return (
		<form className='border border-slate-200 rounded p-1'>
			<LanguageInput
				languages={languages}
				data={{
					defaultLanguage: languages[0].language,
					state: state?.parameter,
					label: parameterName?.name?.singular?.en,
					labelClass: 'block',
					inputName: 'main-parameter',
				}}
				extractData={handleMainParam}
				// reset={{
				//   resetData: resetComponents,
				//   setReset: setResetComponents,
				//   resetType: 'submit',
				// }}
			/>

			{actionStatus?.error &&
				actionStatus.components.includes('main-parameter') && (
					<ErrorMsg msg={actionStatus?.error?.mainParameter} />
				)}

			<div className='flex gap-2'>
				<fieldset className='flex flex-col min-w-[200px]'>
					<label>Collection</label>
					<SelectInput
						defaultLanguage={languages[0].language}
						data={{
							state: collections,
							defaultValue: selectedCollection,
							classes: 'flex flex-col items-start bg-white px-[2px] w-full',
						}}
						extractData={handleSelection}
						// reset={{
						//   resetData: resetComponents,
						//   setReset: setResetComponents,
						//   resetType: 'submit',
						// }}
						// resetComponentData={resetComponents}
						// setResetComponentData={setResetComponents}
						// resetType='submit'
					/>
				</fieldset>
				<fieldset className='flex flex-col'>
					<label>Input Type</label>
					<RadioButtons
						divClasses='flex gap-1 w-full'
						labelClasses={`flex flex-col items-center border border-slate-200 rounded hover:bg-red-500 hover:text-white cursor-pointer px-3 py-[2px]`}
						inputClasses='hidden'
						labels={['Simple', 'Translations', 'key/value']}
						name='inputType'
						inputType={inputType}
						onChange={handleChangeInputType}
					/>
				</fieldset>
			</div>
			<CollectionInput
				languages={languages}
				inputType={inputType}
				selectedCollection={selectedCollection}
				state={state}
				setState={setState}
				actionStatus={actionStatus}
				setActionStatus={setActionStatus}
				inputData={inputData}
				setInputData={setInputData}
				reset={{
					resetData: resetComponents,
					setReset: setResetComponents,
					resetType: 'add',
				}}
				// resetComponent={resetComponents}
				// setResetComponent={setResetComponents}
				// resetType
				buttonLabel='Add to collection'
			/>

			{/* {actionStatus?.error?.collectionInput && (
        <ErrorMsg msg={actionStatus?.error?.collectionInput} />
      )} */}

			<div className='border border-slate-300 rounded p-1'>
				<h5>Items</h5>
				<DisplayCollections
					languages={languages}
					state={state}
					setState={setState}
					selectedCollection={selectedCollection}
				/>
			</div>
			<ContextButton
				label='Add Setting'
				type='edit'
				classes='w-full'
				onClick={handleSubmit}
			/>
		</form>
	);
};

export default InsertSettingsForm;
