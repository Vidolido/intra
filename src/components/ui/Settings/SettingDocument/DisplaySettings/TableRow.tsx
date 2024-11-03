'use state';
import DragSvg from '@/../public/files/drag.svg';
import { displayItemValue } from '@/functions/displayItemValue';
import {
	Language,
	OptionsState,
	Setting,
	SettingCollectionItem,
	SettingsCollection,
} from '@/types/type';
import RowOptions from './RowOptions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import InsertSettingsForm from '../InsertSettingsForm';
import EditSettingsForm from './EditSettingForm';
// import InsertSettingsForm from '../InsertSettingsForm';

interface TableRowProps {
	documentId: string;
	document: Setting;
	setting: SettingsCollection;
	languages: Language[];
	defaultLanguage: string;
	options: OptionsState;
	setOptions: Dispatch<SetStateAction<OptionsState>>;
}

const TableRow = ({
	documentId,
	document,
	setting,
	languages,
	defaultLanguage,
	options,
	setOptions,
}: TableRowProps) => {
	const option = options.find(
		(opt) => opt._id.toString() === setting._id.toString()
	);
	let length = Object.keys(setting?.collections).length + 1;
	return (
		<tr className='outline outline-slate-200 outline-1 hover:outline-red-500'>
			<td className='w-fit align-top cursor-pointer'>
				<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
			</td>
			{option && option.edit ? (
				<td colSpan={length} className='mb-1'>
					<EditSettingsForm
						defaultLanguage={defaultLanguage}
						languages={languages}
						document={document}
						setting={setting}
					/>
				</td>
			) : (
				<>
					<td className='text-left align-top px-2 my-2'>
						{setting?.parameter['en']}
					</td>
					{Object.entries(setting?.collections).map(([_id, collection]) => (
						<td key={_id.toString()} className='text-left align-top px-2'>
							{collection &&
								collection.map((item: SettingCollectionItem, i) => {
									if (option && !option.expand && i > 0) return;
									let value = item.value;
									return (
										<p key={item._id.toString()}>
											{displayItemValue(value, defaultLanguage, item.inputType)}
										</p>
									);
								})}
						</td>
					))}
				</>
			)}
			<td></td>
			<RowOptions
				documentId={documentId}
				settingId={setting._id.toString()}
				option={option}
				setOptions={setOptions}
			/>
		</tr>
	);
};

export default TableRow;
