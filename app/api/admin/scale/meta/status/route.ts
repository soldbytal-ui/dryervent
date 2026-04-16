import { NextResponse } from 'next/server';
import { getMetaAccount, metaAdsConfigured } from '@/lib/scale-meta-ads';

export const dynamic = 'force-dynamic';

export async function GET() {
  const acct = await getMetaAccount().catch(() => null);
  return NextResponse.json({
    configured: metaAdsConfigured(),
    connected: !!acct,
    email: acct?.email || null,
    adAccountId: acct?.customerId || null,
  });
}
