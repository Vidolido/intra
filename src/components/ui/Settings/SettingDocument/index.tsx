// components
import HeaderForm from '@/components/ui/Settings/SettingDocument/Header';
import OptionsSchema from '@/components/ui/Settings/SettingDocument/OptionsSchema';
import InsertSettingsForm from './InsertSettingsForm';
// import InsertSettingsForm from './InsertSettingsForm';
// import DisplaySettings from './DisplaySettings';

// types
import { BusinessAreas, Language, Setting } from '@/types/type';
import { createOptionsSchemaState } from './helpers';
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
	const hasSettingsCollection = setting?.settings ? true : false;
	let optionsSchema = createOptionsSchemaState(setting.optionsSchema);
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
					{setting.optionsSchema != null && (
						<InsertSettingsForm setting={setting} languages={languages} />
					)}
				</div>
				{/* {setting?.settings?.length > 0 && (
					<DisplaySettings
						defaultLanguage={languages[0].language}
						languages={languages}
						documentId={setting._id}
						optionsSchema={setting?.optionsSchema}
						settings={setting?.settings}
						optionsForSettings={optionsForSettings}
					/>
				)} */}
			</div>
		</div>
	);
};

export default SettingDocument;
