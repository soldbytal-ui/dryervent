import { NextRequest, NextResponse } from 'next/server';
import { buildMetaAuthUrl, metaAdsConfigured } from '@/lib/scale-meta-ads';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!metaAdsConfigured()) {
    return NextResponse.json(
      { error: 'Meta Ads credentials not configured. Set META_APP_ID and META_APP_SECRET.' },
      { status: 400 },
    );
  }
  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/admin/scale/meta/callback`;
  const state = crypto.randomUUID();
  return NextResponse.redirect(buildMetaAuthUrl(redirectUri, state));
}
