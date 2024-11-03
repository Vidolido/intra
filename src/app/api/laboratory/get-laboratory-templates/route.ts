'use server';
import { NextRequest, NextResponse } from 'next/server';
// import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// connection/models/db functions
import LaboratoryTemplate from '@/db/models/LaboratoryTemplate';
import connection from '@/db/connection';
import { SortOrder } from 'mongoose';

export async function GET(request: NextRequest) {
	let documentStatus =
		request.nextUrl?.searchParams?.get('documentStatus') || 'draft';
	let sort: SortOrder = !request.nextUrl?.searchParams?.get('sorted') ? 1 : -1;
	try {
		cookies();
		await connection();
		const templates = await LaboratoryTemplate.find({
			documentStatus,
			isDeleted: false,
		}).sort({ _id: sort });
		// revalidatePath('/dashboard/laboratory/templates/draft/[_id]', 'page');
		return NextResponse.json({ templates }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
