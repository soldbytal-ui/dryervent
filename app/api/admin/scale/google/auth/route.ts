import { NextRequest, NextResponse } from 'next/server';
import { buildGoogleAuthUrl, googleAdsConfigured } from '@/lib/scale-google-ads';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!googleAdsConfigured()) {
    return NextResponse.json(
      { error: 'Google Ads credentials not configured. Set GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, and GOOGLE_ADS_DEVELOPER_TOKEN.' },
      { status: 400 },
    );
  }
  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/admin/scale/google/callback`;
  const state = crypto.randomUUID();
  return NextResponse.redirect(buildGoogleAuthUrl(redirectUri, state));
}
