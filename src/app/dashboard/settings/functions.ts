import { getBusinessAreas } from '@/app/api-calls/businessArea';
import { getSettings } from '@/app/api-calls/setting';
import {
  DynamicTemplateSettings,
  Setting,
  SettingsArrayResponse,
  SettingsResponse,
} from '@/types/type';

// export async function getSettingsPageData(_id: string) {
//   try {
//     const [languagesData, sectorsData, settingData] = await Promise.all([
//       // getLanguages(),
//       getBusinessAreas(),
//       getSettings(),
//       getSettings({ _id, documentStatus: 'draft' }),
//       // getSettingById(_id),
//     ]);

//     return {
//       languages: languagesData.languages,
//       sectors: sectorsData.sectors,
//       setting: settingData.setting,
//     };
//   } catch (error) {
//     console.error('Error fetching page data:', error);
//     return {
//       error: {
//         message: 'Something went wrong.',
//         catchError: error,
//       },
//     };
//     // throw error; // Re-throw to be handled by error boundary
//   }
// }

// export function isSettingsArrayResponse(
//   response: SettingsResponse
// ): response is SettingsArrayResponse {
//   return 'settings' in response && Array.isArray(response.settings);
// }

// // Type guard to check if response is DynamicTemplateSettings
// export function isDynamicTemplateSettings(
//   response: SettingsResponse
// ): response is DynamicTemplateSettings {
//   return !('settings' in response) || !Array.isArray(response.settings);
// }

// export function ensureSettingsArray(settings: SettingsResponse): Setting[] {
//   if (isSettingsArrayResponse(settings)) {
//     return settings.settings;
//   }
//   return [];
// }
