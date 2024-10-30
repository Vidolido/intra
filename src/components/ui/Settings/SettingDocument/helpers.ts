import {
  Collection,
  CollectionsOutput,
  CollectionsOutputSchema,
  Options,
  OptionsState,
  Setting,
} from '@/types/type';

export const createOptionsState = (
  settings: Setting[] | undefined | null = []
): OptionsState | null => {
  if (!settings) return null;

  return (
    settings?.map((setting) => ({
      id: setting?._id.toString(),
      showOptions: false,
      options: {
        edit: false,
        expand: false,
      },
    })) || null
  );
};

// export const createInitialState = (
// 	optionsSchema: Options | null | undefined
// ): Options | null => {
// 	if (!optionsSchema) return null;
// 	return {
// 		...optionsSchema,
// 	};
// };
// export const createInitialState = (optionsSchema: Options): Options => {
// 	// if (!optionsSchema) return null;
// 	return {
// 		...optionsSchema,
// 	};
// };

export function createCollectionsState(
  collections: Collection[]
): CollectionsOutput {
  if (!collections) return {};

  const result = {
    collections: {},
  };

  collections.forEach((collection) => {
    if (collection?._id) {
      const id = collection._id.toString();
      result.collections = {
        ...result.collections,
        [id]: [],
      };
    }
  });

  //   console.log(result, 'the result');
  //   console.log(
  //     CollectionsOutputSchema.safeParse(result.collections),
  //     'the validation'
  //   );

  return CollectionsOutputSchema.parse(result.collections);
}

export const createOptionsSchemaState = (
  optionsSchema: Options | undefined
): Options => {
  return {
    parameter: optionsSchema?.parameter || {
      name: {
        singular: {},
        plural: {},
      },
    },
    collections: optionsSchema?.collections || [],
  };
};

// export const createServerState = (setting: Setting): State => {
//   const collections = setting?.optionsSchema?.collections || null;
//   const firstCollectionId = collections
//     ? collections[0]?._id?.toString()
//     : null;

//   return {
//     insertSettingsProps: {
//       selected: firstCollectionId || null,
//       parameterName:
//         setting?.optionsSchema?.parameter?.name?.singular?.en || '',
//       collections: !collections ? [] : collections,

//       state: {
//         parameter: {},
//         collections: createCollectionsState(collections) || {},
//       },
//     },
//   };
// };

// // Usage
// //   export const createState = createServerState(setting);
