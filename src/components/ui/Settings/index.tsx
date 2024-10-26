// components
// import HeaderForm from './HeaderForm';
// import OptionsSchema from './OptionsSchemaForm';
// import InsertSettingsForm from './InsertSettingsForm';
// import DisplaySettings from './DisplaySettings';

const Setting = ({ title, languages, sectors, setting }) => {
  let optionsForSettings =
    setting && setting?.settings?.length > 0
      ? setting?.settings?.map((setting) => ({
          _id: setting._id,
          showOptions: false,
          options: {
            edit: false,
            expand: false,
          },
        }))
      : [];
  let initState =
    setting?.optionsSchema != null
      ? {
          ...setting?.optionsSchema,
        }
      : null;
  // let optionsSchema = !setting.optionsSchema
  // 	? { parameter: '', collections: [] }
  // 	: { parameter: setting?.optionsSchema.parameter.name.singular?.en };

  let insertSettingsProps = {
    selected:
      setting?.optionsSchema?.collections != null
        ? setting?.optionsSchema?.collections[0]._id
        : '',
    parameterName: setting?.optionsSchema?.parameter.name?.singular?.en,
    collections:
      setting?.optionsSchema?.collections != null
        ? [...setting?.optionsSchema?.collections]
        : [],
    state: {
      parameter: {},
      collections:
        setting?.optionsSchema?.collections != null
          ? setting?.optionsSchema?.collections.reduce((acc, currentValue) => {
              return (acc = {
                ...acc,
                [currentValue._id]: [],
              });
            }, {})
          : null,
    },
  };

  return (
    // <div className='min-w-[400px] max-w-[85%]'>
    <div className='w-[85%]'>
      <h2>{title}</h2>
      <div className='flex gap-2'>
        <div className='w-full max-w-[45%]'>
          {/* <HeaderForm
            languages={languages}
            sectors={sectors}
            setting={setting}
          />
          {setting.settingName && (
            <OptionsSchema
              setting={setting}
              initState={initState}
              languages={languages}
            />
          )}
          {setting.optionsSchema != null && (
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

export default Setting;
