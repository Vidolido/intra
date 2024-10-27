// components
import HeaderForm from '@/components/forms/settings/Header';
import OptionsSchema from '@/components/forms/settings/OptionsSchema';
// import InsertSettingsForm from './InsertSettingsForm';
// import DisplaySettings from './DisplaySettings';

// types
import { BusinessAreasDocument, LanguagesDocument } from '@/types/typesTS';
import { Settings } from '@/types/zod/settingSchema';

interface SettingDocumentProps {
	title: string;
	businessAreas: BusinessAreasDocument[];
	languages: LanguagesDocument[];
	setting: Settings;
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
	return (
		// <div className='min-w-[400px] max-w-[85%]'>
		<div className='w-[85%]'>
			<h2>{title}</h2>
			<div className='flex gap-2'>
				<div className='w-full max-w-[45%]'>
					<HeaderForm
						languages={languages}
						businessAreas={businessAreas}
						setting={setting}
					/>
					{setting.settingName && (
						<OptionsSchema setting={setting} languages={languages} />
					)}
					{/* {setting.optionsSchema != null && (
						<InsertSettingsForm
							setting={setting}
							insertSettingsProps={insertSettingsProps}
							initState={initState}
							languages={languages}
						/>
					)} */}
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
