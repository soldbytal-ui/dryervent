import { NextResponse } from 'next/server';
import { getGoogleAccount, googleAdsConfigured } from '@/lib/scale-google-ads';

export const dynamic = 'force-dynamic';

export async function GET() {
  const acct = await getGoogleAccount().catch(() => null);
  return NextResponse.json({
    configured: googleAdsConfigured(),
    connected: !!acct,
    email: acct?.email || null,
    customerId: acct?.customerId || null,
    devTokenSet: !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  });
}
