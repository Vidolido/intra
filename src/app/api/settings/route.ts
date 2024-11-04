'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePaths } from '@/functions/reavalidatePaths';

// connection/models/db functions
import connection from '@/db/connection';
import Setting from '@/db/models/Setting';
import BusinessArea from '@/db/models/BusinessArea';
import { SearchParamsPayload } from '@/types/type';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isDeleted = searchParams.get('isDeleted') === 'false' ? false : true;

  const settingNames = searchParams.getAll('settingName');
  const documentStatus = searchParams.get('documentStatus') || undefined;

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
    let settings = await Setting.find(payload).populate('businessArea').sort({
      $natural: -1,
    });
    revalidatePaths([
      '/dashboard/settings',
      '/dashboard/laboratory/templates',
      '/dashboard/laboratory/documents',
    ]);

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
