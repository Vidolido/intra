'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// connection/models/db functions
import connection from '@/db/connection';
import Setting from '@/db/models/Setting';
import BusinessArea from '@/db/models/BusinessArea';
import { DynamicTemplateSettings, SearchParamsPayload } from '@/types/type';

// const getSettings = async (searchParams: SearchParamsPayload) => {
//   try {
//     await connection();
//     let settings = await Setting.find(searchParams)
//       .populate('businessArea')
//       .sort({ $natural: -1 });

//     const dynamicSettings: DynamicTemplateSettings = settings.reduce(
//       (acc, currentValue) => {
//         const settingName = currentValue?.settingName;
//         if (!settingName) return acc;
//         const words = settingName.split(' ');
//         let first = words[0].toLocaleLowerCase();
//         let rest = words.slice(1).join('');
//         let formattedName = first + rest;
//         acc[formattedName] = currentValue;
//         return acc;
//       },
//       {} as DynamicTemplateSettings
//     );

//     revalidatePaths([
//       '/dashboard/settings',
//       '/dashboard/laboratory/templates',
//       '/dashboard/laboratory/documents',
//     ]);
//     return dynamicSettings;
//   } catch (error) {
//     if (error instanceof Error)
//       throw new Error(`Error fetching settings: ${error.message}`);
//   }
// };

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isDeleted = searchParams.get('isDeleted') === 'false' ? false : true;

  const settingNames = searchParams.getAll('settingName');
  const documentStatus = searchParams.get('documentStatus') || 'draft';

  const payload: SearchParamsPayload = {
    isDeleted,
    ...(documentStatus && { documentStatus }),
  };

  if (settingNames.length > 0) {
    payload.settingName = {
      $in: settingNames,
    };
  }
  try {
    await connection();
    const settings = await Setting.find(payload)
      .populate('businessArea')
      .sort({ $natural: -1 });

    if (settingNames.length > 0) {
      const dynamicSettings: DynamicTemplateSettings = settings.reduce(
        (acc, setting) => {
          const settingName = setting?.settingName;
          if (!settingName) return acc;
          const words = settingName.split(' ');
          let first = words[0].toLocaleLowerCase();
          let rest = words.slice(1).join('');
          let formattedName = first + rest;
          acc[formattedName] = setting;
          return acc;
        },
        {} as DynamicTemplateSettings
      );
      return NextResponse.json(dynamicSettings, { status: 200 });
    } else {
      return NextResponse.json({ settings }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
