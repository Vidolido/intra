'use client';

import ErrorMsg from '@/components/reusable/ErrorMsg';
import LanguageInput from '@/components/reusable/Inputs/LanguageInput';
import { LanguageSchema } from '@/types/zod/languagesSchema';
import { Options } from '@/types/zod/settingSchema';
import { ActionResponse, ResetComponentsData } from '@/types/zod/typesZ';
import { Types } from 'mongoose';
import { Dispatch, SetStateAction } from 'react';
// components
// import LanguageInput from '@/components/reusable/LanguageInput';

type MainInputProps = {
	languages: LanguageSchema[];
	actionStatus: ActionResponse;
	state: Options | undefined | null;
	setState: Dispatch<SetStateAction<Options | null>>;
	reset: {
		[key: string]:
			| ResetComponentsData
			// | Dispatch<SetStateAction<ResetComponentsData>>
			| (() => void)
			| string[];
	};
};

// type StateFields = {
// 	parameter: {
// 		name: {
// 			singular: Record<string, string>;
// 			plural: Record<string, string>;
// 		};
// 	};
// 	collections: {
// 		_id: Types.ObjectId;
// 		name: Record<string, string>;
// 	}[];
// } | null;

// type Metadata = {
// 	id: string;
// 	name: string;
// };
type StateFields = Record<string, string>;

const MainInput = ({
	languages,
	actionStatus,
	state,
	setState,
	reset,
}: // resetLanguage,
// setResetLanguage,
// resetType,
MainInputProps) => {
	const handleParameter = (data: StateFields, dataObj: StateFields) => {
		// HANDLE ERROR
		// setState(prev => {
		//     if(!prev) return prev;
		//     retrun {
		//         ...prev,
		//         [dataObj.name]:
		//     }
		// })
		// let { id, name } = dataObj;
		// if (data != null) {
		// 	let parameter = {
		// 		name: {
		// 			[name]: data,
		// 		},
		// 	};
		// 	setState((prev) => {
		// 		if (!prev) return;
		// 		return { ...prev, parameter: parameter };
		// 	});
		// }
	};

	// setState((prev) => {
	//     if (!prev) return prev; // Handle null state case

	//     return {
	//         ...prev,
	//         parameter: {
	//             name: {
	//                 ...prev.parameter.name,
	//                 // Determine if this should update singular or plural
	//                 singular: prev.parameter.name.singular,
	//                 plural: prev.parameter.name.plural, // Preserve plural
	//             },
	//         },
	//     };
	// });
	return (
		<fieldset
			name='option-schema-main'
			className='border border-slate-300 rounded p-1 w-full'>
			<div className='flex flex-wrap gap-2'>
				<LanguageInput
					languages={languages}
					data={{
						defaultLanguage: languages[0].language,
						state: state?.parameter?.name?.singular,
						inputName: 'singular',
						label: 'Singular Name',
						labelClass: 'text-sm',
					}}
					extractData={handleParameter}
					reset={reset}
				/>
				{/* {error?.singular && <ErrorMsg msg={error?.singular} />} */}
				<LanguageInput
					languages={languages}
					data={{
						defaultLanguage: languages[0].language,
						state: state?.parameter?.name?.plural,
						inputName: 'plural',
						label: 'Plural Name',
						labelClass: 'text-sm',
					}}
					extractData={handleParameter}
					reset={reset}
				/>
				{/* {error?.plural && <ErrorMsg msg={error?.plural} />} */}
			</div>
		</fieldset>
	);
};

export default MainInput;
