import { NextRequest, NextResponse } from 'next/server';
import { exchangeGoogleCode, saveGoogleAccount } from '@/lib/scale-google-ads';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const errorParam = req.nextUrl.searchParams.get('error');
  const origin = req.nextUrl.origin;

  if (errorParam) {
    return NextResponse.redirect(`${origin}/admin/scale/settings?google_error=${encodeURIComponent(errorParam)}`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/admin/scale/settings?google_error=missing_code`);
  }

  try {
    const redirectUri = `${origin}/api/admin/scale/google/callback`;
    const token = await exchangeGoogleCode(code, redirectUri);
    await saveGoogleAccount({
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      expiresIn: token.expires_in,
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID,
    });
    return NextResponse.redirect(`${origin}/admin/scale/settings?google=connected`);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'token_exchange_failed';
    return NextResponse.redirect(`${origin}/admin/scale/settings?google_error=${encodeURIComponent(msg)}`);
  }
}
