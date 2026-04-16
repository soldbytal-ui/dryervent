import { NextRequest, NextResponse } from 'next/server';
import { pushGoogleSearchCampaign } from '@/lib/scale-google-ads';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await pushGoogleSearchCampaign(body);
  return NextResponse.json(res, { status: res.ok ? 200 : 400 });
}
