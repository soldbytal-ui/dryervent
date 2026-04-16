import { NextRequest, NextResponse } from 'next/server';
import { pushMetaLeadGenCampaign } from '@/lib/scale-meta-ads';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await pushMetaLeadGenCampaign(body);
  return NextResponse.json(res, { status: res.ok ? 200 : 400 });
}
