'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// connection/models/db functions
import { Setting, BusinessArea } from '@/db/models';
import connection from '@/db/connection';
// import  from '@/db/models/Setting';

// types
import { DynamicTemplateSettings, SearchParamsPayload } from '@/types/type';

export async function GET(request: NextRequest) {
  try {
    await connection();

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

    const settings = await Setting.find(payload)
      .populate('businessArea')
      .sort({ $natural: -1 });

    if (!settings) {
      return NextResponse.json({ error: 'No settings found' }, { status: 404 });
    }

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
    console.error('API Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
