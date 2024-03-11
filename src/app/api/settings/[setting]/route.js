'use server';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

// connection/moddels
import { connect } from '@/../conn';
import Settings from '@/app/_models/(settings)/Settings';

// agregations
import { editGroupedSettings } from '../aggregation';

export async function GET(request, { params }) {
  // noStore();
  cookies();

  const { nextUrl } = request;
  const lang = nextUrl.searchParams.get('lang');
  const { setting } = params;

  try {
    await connect();

    // console.log(lang, setting, 'THESE ARE THE TWO [setting] route');

    const settingForEddit = await Settings.aggregate(
      editGroupedSettings(lang, setting)
    );
    // console.log(settingForEddit, 'SETTING FOR EDIT');
    return Response.json(...settingForEddit);
  } catch (error) {
    throw Error('Error: ' + error, 'THE SECOND ERROR');
  }
}
