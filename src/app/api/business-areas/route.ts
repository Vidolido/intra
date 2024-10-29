'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import connection from '@/db/connection';
import BusinessArea from '@/db/models/BusinessArea';
import { SearchQueryParams } from '@/types/type';
// import { SearchParamsPayload } from '@/types/zod/typesZ';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isDeleted = searchParams.get('isDeleted') === 'false' ? false : true;
  const payload = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = key === 'isDeleted' ? isDeleted : value;
      return acc;
    },
    {} as SearchQueryParams
  );

  try {
    await connection();
    const businessAreas = await BusinessArea.find({ ...payload });
    revalidatePath('/');
    return NextResponse.json({ businessAreas }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
