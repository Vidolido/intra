'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/moddels/database functions
import connection from '@/db/connection';
import Language from '@/db/models/Language';
import { SearchParamsPayload } from '@/types/zod/types';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const isDeleted = searchParams.get('isDeleted') === 'false' ? false : true;

	const payload = Array.from(searchParams.entries()).reduce(
		(acc: SearchParamsPayload, [key, value]) => {
			acc[key] = key === 'isDeleted' ? isDeleted : value;
			return acc;
		},
		{}
	);

	try {
		await connection();
		const languages = await Language.find({ ...payload })
			.lean()
			.exec();

		revalidatePath('/');
		return NextResponse.json({ languages }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
