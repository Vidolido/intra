'use server';
import { NextRequest, NextResponse } from 'next/server';
// import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import { LaboratoryTemplate } from '@/db/models';
import connection from '@/db/connection';

interface ParamProps {
  [key: string]: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: ParamProps }
) {
  let { _id } = params;
  try {
    console.log(params, 'the params in back');
    cookies();
    await connection();
    const template = await LaboratoryTemplate.findOne({
      _id,
    });
    console.log(template, 'the template');

    return NextResponse.json({ template }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  // revalidatePath('/dashboard/laboratory/templates/draft/[_id]', 'page');
}
