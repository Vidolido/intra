import { Setting } from '@/types/type';
interface TemplateSettings {
  products?: Setting;
  types?: Setting;
  countries?: Setting;
  fields?: Setting;
  laboratoryTemplates?: Setting;
}

type DynamicTemplateSettings = {
  [key: string]: Setting;
};

export const mutateTemplateSettings = (settings: Setting[]) => {
  return settings.reduce((acc: DynamicTemplateSettings, currentValue) => {
    const settingName = currentValue?.settingName;
    if (!settingName) return acc;
    acc[settingName.toLowerCase()] = currentValue;
    return acc;
  }, {});
};

// export const mutateTemplateSettings = (settings: Setting[]) => {
//   return settings.reduce((acc: TemplateSettings, currentValue) => {
//     switch (currentValue.settingName) {
//       case 'Products': {
//         acc = {
//           ...acc,
//           products: currentValue,
//         };
//         break;
//       }
//       case 'Types': {
//         acc = {
//           ...acc,
//           types: currentValue,
//         };
//         break;
//       }
//       case 'Countries': {
//         acc = {
//           ...acc,
//           countries: currentValue,
//         };
//         break;
//       }
//       case 'Fields': {
//         acc = {
//           ...acc,
//           fields: currentValue,
//         };
//         break;
//       }
//       case 'Laboratory Templates': {
//         acc = {
//           ...acc,
//           laboratoryTemplates: currentValue,
//         };
//         break;
//       }

//       default: {
//         return acc;
//       }
//     }
//     return acc;
//   }, {});
// };
