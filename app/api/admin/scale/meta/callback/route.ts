import { NextRequest, NextResponse } from 'next/server';
import { exchangeMetaCode, saveMetaAccount } from '@/lib/scale-meta-ads';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const origin = req.nextUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/scale/settings?meta_error=missing_code`);
  }

  try {
    const redirectUri = `${origin}/api/admin/scale/meta/callback`;
    const token = await exchangeMetaCode(code, redirectUri);
    await saveMetaAccount({
      accessToken: token.access_token,
      expiresIn: token.expires_in,
      adAccountId: process.env.META_AD_ACCOUNT_ID,
    });
    return NextResponse.redirect(`${origin}/admin/scale/settings?meta=connected`);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'token_exchange_failed';
    return NextResponse.redirect(`${origin}/admin/scale/settings?meta_error=${encodeURIComponent(msg)}`);
  }
}
