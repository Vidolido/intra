// state/actions/utils
import { createOptionsSchemaState, createOptionsState } from './helpers';

// components
import HeaderForm from '@/components/ui/Settings/SettingDocument/Header';
import OptionsSchema from '@/components/ui/Settings/SettingDocument/OptionsSchema';
import InsertSettingsForm from './InsertSettingsForm';
import DisplaySettings from './DisplaySettings';

// types
import {
	BusinessAreas,
	Language,
	Setting,
	SettingsCollection,
} from '@/types/type';
interface SettingDocumentProps {
	title: string;
	businessAreas: BusinessAreas[];
	languages: Language[];
	setting: Setting;
}

const SettingDocument = ({
	title,
	languages,
	businessAreas,
	setting,
}: SettingDocumentProps) => {
	const hasName = setting?.settingName ? true : false;
	const hasSchema = setting?.optionsSchema ? true : false;
	let optionsSchema = createOptionsSchemaState(setting.optionsSchema);
	let settingOptions = createOptionsState(
		setting?.settings as SettingsCollection[]
	);
	return (
		<div className='w-[85%]'>
			<h2>{title}</h2>
			<div className='flex gap-2'>
				<div className='w-full max-w-[45%]'>
					<HeaderForm
						languages={languages}
						businessAreas={businessAreas}
						setting={setting}
					/>
					{hasName && (
						<OptionsSchema
							setting={setting}
							optionsSchema={optionsSchema}
							languages={languages}
						/>
					)}
					{hasSchema && (
						<InsertSettingsForm setting={setting} languages={languages} />
					)}
				</div>
				{setting?.settings && setting?.settings?.length > 0 && (
					<DisplaySettings
						languages={languages}
						defaultLanguage={languages[0].language}
						documentId={setting._id.toString()}
						document={setting}
						optionsSchema={optionsSchema}
						settings={setting.settings}
						settingOptions={settingOptions}
					/>
				)}
			</div>
		</div>
	);
};

export default SettingDocument;
