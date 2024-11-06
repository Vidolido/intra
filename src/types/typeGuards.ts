export const isMap = (value: any): value is Map<string, string> => {
  return value instanceof Map;
};

export const convertLanguageMap = (
  value: Map<string, string> | Record<string, string>
) => {
  if (isMap(value)) {
    return Object.fromEntries(value);
  }
  return value;
};

export const transformForValidation = (data: any) => {
  if (!data?.schemaNames) return data;

  return {
    ...data,
    schemaNames: {
      parameter: data.schemaNames.parameter
        ? {
            name: {
              singular: convertLanguageMap(
                data.schemaNames.parameter.name?.singular
              ),
              plural: convertLanguageMap(
                data.schemaNames.parameter.name?.plural
              ),
            },
          }
        : undefined,
      collections: data.schemaNames.collections?.map((collection: any) => ({
        ...collection,
        name: convertLanguageMap(collection.name),
      })),
    },
  };
};
