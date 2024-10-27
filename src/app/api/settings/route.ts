'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/models/db functions
import connection from '@/db/connection';
import Setting from '@/db/models/Setting';
import BusinessArea from '@/db/models/BusinessArea';
import { revalidatePaths } from '@/functions/reavalidatePaths';
import { SearchParamsPayload } from '@/types/zod/typesZ';

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
		let settings = await Setting.find({ ...payload })
			.populate('businessArea')
			.sort({
				$natural: -1,
			});
		revalidatePaths(['/dashboard/settings', '/dashboard/laboratory/documents']);

		return NextResponse.json({ settings }, { status: 200 });
		// return NextResponse.json(
		// 	{ error: null, success: settings },
		// 	{ status: 200 }
		// );
	} catch (error) {
		// return NextResponse.json({ error, success: null }, { status: 500 });
		return NextResponse.json({ error }, { status: 500 });
	}
}
