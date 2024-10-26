'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/models/db functions
import connection from '@/db/connection';
import Setting from '@/db/models/Setting';
import Sector from '@/db/models/BusinessArea';
import { revalidatePaths } from '@/functions/reavalidatePaths';

export async function GET(request: NextRequest) {
	console.log('THIS SHIT HAPPEND');
	let documentStatus =
		request?.nextUrl?.searchParams?.get('documentStatus') || 'draft';

	let isDeleted = request?.nextUrl?.searchParams?.get('isDeleted') || false;
	try {
		await connection();
		// await Sector
		let settings = await Setting.find({ documentStatus, isDeleted })
			.populate('sector')
			.sort({
				$natural: -1,
			});
		console.log(settings, 'the settings');
		revalidatePaths(['/dashboard/settings', '/dashboard/laboratory/documents']);
		// settings = settings.map(serializeMongoDocuments);

		// console.log(settings)
		// const pathsToRevalidate = [
		// 	'/dashboard/settings',
		// 	'/dashboard/laboratory/documents',
		// ];

		// pathsToRevalidate.forEach((path) => revalidatePath(path, 'page'));

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
