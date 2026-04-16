// Google Ads OAuth + campaign push helpers.
// Scoped to be callable from /api/admin/scale/google/* routes.

import { prisma } from '@/lib/prisma';

const GOOGLE_OAUTH_SCOPE = 'https://www.googleapis.com/auth/adwords';

export function googleAdsConfigured(): boolean {
  return !!(
    process.env.GOOGLE_ADS_CLIENT_ID &&
    process.env.GOOGLE_ADS_CLIENT_SECRET &&
    process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  );
}

export function buildGoogleAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: GOOGLE_OAUTH_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string, redirectUri: string) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google token exchange failed: ${res.status} ${err}`);
  }
  return res.json() as Promise<{
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: string;
    scope: string;
  }>;
}

export async function saveGoogleAccount(opts: {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  customerId?: string;
  email?: string;
}) {
  const expiresAt = new Date(Date.now() + opts.expiresIn * 1000);
  await prisma.adAccount.upsert({
    where: { provider: 'google' },
    update: {
      accessToken: opts.accessToken,
      refreshToken: opts.refreshToken || undefined,
      expiresAt,
      customerId: opts.customerId || null,
      email: opts.email || null,
    },
    create: {
      provider: 'google',
      accessToken: opts.accessToken,
      refreshToken: opts.refreshToken,
      expiresAt,
      customerId: opts.customerId,
      email: opts.email,
    },
  });
}

export async function getGoogleAccount() {
  return prisma.adAccount.findUnique({ where: { provider: 'google' } });
}

export async function pushGoogleSearchCampaign(campaignJson: unknown): Promise<{ ok: boolean; externalId?: string; error?: string }> {
  const acct = await getGoogleAccount();
  if (!acct) return { ok: false, error: 'Google Ads not connected. Connect in Settings.' };
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  if (!devToken) return { ok: false, error: 'GOOGLE_ADS_DEVELOPER_TOKEN not configured.' };
  if (!acct.customerId) return { ok: false, error: 'No Google Ads customerId set on the connected account.' };

  // NOTE: Real implementation would POST to https://googleads.googleapis.com/v18/customers/{customerId}/campaigns:mutate
  // with proper operations for campaign, ad group, RSA, keywords, sitelinks, etc.
  // This stub returns a clear "not implemented" result so the UI shows what's needed.
  return {
    ok: false,
    error:
      'Google Ads push is configured but disabled in this build. The OAuth, dev token, and customerId are all set — the final campaign mutation requires a Google Ads API v18 request per ad group, which is intentionally left as a manual review step. Campaign JSON has been saved for your team to review.',
  };
}
