'use client';
import { ChangeEvent, useState } from 'react';

// state/actions
import { generateID } from '@/functions/generateID';

// import { addTemplateSetting } from '@/serverActions/laboratoryTemplates/addTemplateSetting';
// import { generateUUID } from '@/utils/generateUUID';
// import { mutateForSelect } from '@/utils/helpers/mutateForSelect';
// import { isObjectEmpty } from '@/utils/functions';
// import { formatKeyValue } from '@/utils/settings/formatKeyValue';

// components
import ContextButton from '@/components/reusable/ContextButton';
import NormalInput from '@/components/reusable/Inputs/NormalInput';
import SelectInput from '@/components/reusable/Inputs/SelectInput';
// import GroupParam from './GroupParam';
// import ContextButton from '@/components/buttons/ContextButton';
// import SelectInput from '@/components/reusable/SelectInput';
// import NormalInput from '@/components/reusable/NormalInput';

// types
import {
	DynamicTemplateSettings,
	Language,
	LanguageMap,
	Metadata,
	SettingsCollection,
} from '@/types/type';
import GroupParam from './GroupParam';
import { formatKeyValue } from '@/functions/formatKeyValue';
import { typeOfValue } from '@/components/ui/Settings/SettingDocument/helpers';
import { mutateForSelect } from '@/functions/mutateForSelect';

interface CollectionOption {
	_id: string;
	value:
		| string
		| Record<string, string>
		| Map<string, string>
		| {
				value: string;
				key: string;
		  };
}

interface CollectionsMap {
	[key: string]: CollectionOption[];
}

// interface ExtendedSettingsCollection extends SettingsCollection {
// 	result?: string;
// 	marginError?: string;
// }

interface InputFormProps {
	documentId: string | undefined;
	languages: Language[];
	defaultLanguage: string;
	settings: DynamicTemplateSettings;
}

interface ComponentOptions {
	[key: string]: string[];
}
const InputForm = ({
	documentId,
	languages,
	settings,
	defaultLanguage = 'en',
}: InputFormProps) => {
	const { laboratoryTemplates } = settings;

	const [selectedProperty, setSelectedProperty] = useState(
		laboratoryTemplates && laboratoryTemplates.settings
			? laboratoryTemplates?.settings[0]
			: null
	);

	const [selectedOptions, setSelectedOptions] = useState(
		{} as ComponentOptions
	);

	const [additional, setAdditional] = useState({
		result:
			selectedProperty && selectedProperty?.result
				? selectedProperty?.result
				: '',
		marginError: selectedProperty?.marginError
			? selectedProperty?.marginError
			: '',
	});

	// const [group, setGroup] = useState({});

	let properties =
		laboratoryTemplates.settings &&
		mutateForSelect(laboratoryTemplates.settings, 'parameter');

	const handleChange = (id: string, dataObj: Metadata) => {
		let selected = laboratoryTemplates?.settings?.find(
			(setting) => setting?._id.toString() === id
		);
		// TODO: Handle case if selected null/undefind
		selected && setSelectedProperty(selected);
		setSelectedOptions({});
		setAdditional({
			result: '',
			marginError: '',
		});
	};
	const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
		let { checked, name: collectionId, value } = e.target;

		if (checked && !selectedOptions[collectionId]) {
			setSelectedOptions((prevState) => ({
				...prevState,
				[collectionId]: [value],
			}));
		}

		if (checked && selectedOptions[collectionId]) {
			setSelectedOptions((prevState) => ({
				...prevState,
				[collectionId]: [...prevState[collectionId], value],
			}));
		}

		if (!checked) {
			let removeUnChecked = selectedOptions[collectionId].filter(
				(item) => item === value
			);
			setSelectedOptions((prevState) => ({
				...prevState,
				[collectionId]: removeUnChecked,
			}));
		}
	};
	const handleAdditionalInput = (data: string, dataObj: Metadata) => {
		setAdditional({
			...additional,
			[dataObj.name]: data,
		});
	};

	let handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
		let property = {
			_id: selectedProperty?._id,
			name: selectedProperty?.parameter,
		};

		let mutCollections: CollectionsMap = {};

		if (selectedProperty?.collections) {
			mutCollections = Object.entries(
				selectedProperty.collections
			).reduce<CollectionsMap>((acc, [_id, options]) => {
				if (_id in selectedOptions) {
					const itemsToFind = selectedOptions[_id].map((selectedOptionId) => {
						const option = options.find(
							(opt) => opt._id.toString() === selectedOptionId
						);
						return option
							? {
									_id: option._id.toString(),
									value: option.value,
							  } // return here
							: {
									_id: '',
									value: '',
							  }; // i dont want a return here
					});
					acc[_id] = itemsToFind;
				}
				return acc;
			}, {});
		}

		console.log(property, mutCollections, additional, 'OVIJA');

		// // Тука чекам грешка
		// await addTemplateSetting({
		// 	property,
		// 	mutCollections,
		// 	additional,
		// 	group: !isObjectEmpty(group) && group,
		// 	document,
		// });
	};

	// console.log(laboratoryTemplates, 'laboratoryTemplates');
	// console.log(selectedProperty, 'selectedProperty');
	// console.log(additional, 'additional');
	// console.log(selectedOptions, 'selectedOptions');
	// console.log(properties, 'properties');

	return (
		<form className='grid grid-cols-7 gap-4 border rounded bg-white h-[130px]'>
			<div className='flex flex-col justify-between gap-2 w-full p-1'>
				<SelectInput
					data={{
						state: properties,
						defaultLanguage: defaultLanguage,
						// defaultValue: selectedCollection,
						fieldSetClass: 'flex flex-col items-start bg-white px-[2px] w-full',
					}}
					extractData={handleChange}
				/>

				{/* <GroupParam
						languages={languages}
						setGroup={setGroup}
						groups={groups}
					/> */}
			</div>
			{selectedProperty &&
				Object.entries(selectedProperty?.collections)?.map(
					([_id, collection]) => {
						return (
							<fieldset
								key={_id || generateID()}
								className='w-full border-l px-1 overflow-y-scroll'>
								{collection.map((item) => {
									let check =
										selectedOptions[_id] &&
										selectedOptions[_id].includes(item._id.toString());
									return (
										<label
											key={generateID()}
											className='flex gap-1 hover:text-red-600 hover:font-semibold cursor-pointer'>
											<input
												type='checkbox'
												name={_id}
												value={item._id.toString()}
												onChange={handleCheck}
												checked={check && check}
											/>
											<span>{typeOfValue(item, defaultLanguage)}</span>
										</label>
									);
								})}
							</fieldset>
						);
					}
				)}
			<div className='py-1'>
				<NormalInput
					data={{
						state: additional?.result,
						name: 'result',
						fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
						inputClass:
							'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
					}}
					extractData={handleAdditionalInput}
				/>
			</div>
			<div className='py-1'>
				<NormalInput
					data={{
						state: additional?.marginError,
						name: 'marginError',
						fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
						inputClass:
							'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none h-[21px]',
					}}
					extractData={handleAdditionalInput}
				/>
			</div>
			<div className='py-1'>
				<ContextButton label='Add' type='edit' onClick={handleAdd} />
			</div>
		</form>
	);
};

export default InputForm;
