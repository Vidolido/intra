'use client';
import { useEffect, useState } from 'react';

// state/actions
import { generateID } from '@/functions/generateID';
import { createOptionsState } from '../helpers';
import { getRowHeaders } from '@/functions/getRowHeaders';

// components
import HeadingsTableRow from './HeadingTableRow';
import TableRow from './TableRow';

import {
	Language,
	Options,
	OptionsState,
	Setting,
	SettingsCollection,
} from '@/types/type';
type DisplaySettingsProps = {
	languages: Language[];
	defaultLanguage: string;
	document: Setting;
	documentId: string;
	optionsSchema: Options;
	settings: SettingsCollection[];
	settingOptions: OptionsState;
};

const DisplaySettings = ({
	languages,
	defaultLanguage,
	document,
	documentId,
	optionsSchema,
	settings,
	settingOptions,
}: DisplaySettingsProps) => {
	let headings = getRowHeaders(optionsSchema, 'singular') || null;

	const [options, setOptions] = useState<OptionsState>(() => {
		if (!settings?.length) return [];
		return settings.map((setting) => ({
			_id: setting._id.toString(),
			showOptions: false,
			edit: false,
			expand: false,
		}));
	});

	useEffect(() => {
		if (!settings?.length) {
			setOptions([]);
			return;
		}

		// Update options while preserving existing states
		setOptions((prevOptions) => {
			const newOptions = settings.map((setting) => {
				const existingOption = prevOptions.find(
					(opt) => opt._id === setting._id.toString()
				);
				return (
					existingOption || {
						_id: setting._id.toString(),
						showOptions: false,
						edit: false,
						expand: false,
					}
				);
			});
			return newOptions;
		});
	}, [settings]);

	return (
		<div>
			<table>
				<thead>
					<HeadingsTableRow
						headings={headings}
						defaultLanguage={defaultLanguage}
					/>
				</thead>
				<tbody>
					{settings.map((setting) => (
						<TableRow
							key={setting._id.toString()}
							documentId={documentId}
							document={document}
							setting={setting}
							languages={languages}
							defaultLanguage={defaultLanguage}
							options={options}
							setOptions={setOptions}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DisplaySettings;
