'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// connection/models/db functions
import Setting from '@/db/models/Setting';
import connection from '@/db/connection';
import { revalidatePaths } from '@/functions/reavalidatePaths';

interface ParamProps {
	[key: string]: string;
}

export async function GET(
	request: NextRequest,
	{ params }: { params: ParamProps }
) {
	let { _id } = params;
	try {
		await connection();
		const setting = await Setting.findOne({ _id });

		revalidatePaths([
			`/dashboard/settings/edit/${_id}`,
			`/dashboard/settings/draft/${_id}`,
			'/dashboard/settings/create',
		]);

		return NextResponse.json({ setting }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
