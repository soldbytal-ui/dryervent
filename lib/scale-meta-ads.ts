import { prisma } from '@/lib/prisma';

const META_OAUTH_SCOPE = 'ads_management,ads_read,business_management,leads_retrieval,pages_show_list';

export function metaAdsConfigured(): boolean {
  return !!(process.env.META_APP_ID && process.env.META_APP_SECRET);
}

export function buildMetaAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: META_OAUTH_SCOPE,
    state,
  });
  return `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;
}

export async function exchangeMetaCode(code: string, redirectUri: string) {
  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID || '',
    client_secret: process.env.META_APP_SECRET || '',
    redirect_uri: redirectUri,
    code,
  });
  const res = await fetch(`https://graph.facebook.com/v21.0/oauth/access_token?${params.toString()}`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Meta token exchange failed: ${res.status} ${err}`);
  }
  return res.json() as Promise<{ access_token: string; token_type: string; expires_in?: number }>;
}

export async function saveMetaAccount(opts: { accessToken: string; expiresIn?: number; email?: string; adAccountId?: string }) {
  const expiresAt = opts.expiresIn ? new Date(Date.now() + opts.expiresIn * 1000) : null;
  await prisma.adAccount.upsert({
    where: { provider: 'meta' },
    update: {
      accessToken: opts.accessToken,
      expiresAt,
      email: opts.email || null,
      customerId: opts.adAccountId || null,
    },
    create: {
      provider: 'meta',
      accessToken: opts.accessToken,
      expiresAt,
      email: opts.email,
      customerId: opts.adAccountId,
    },
  });
}

export async function getMetaAccount() {
  return prisma.adAccount.findUnique({ where: { provider: 'meta' } });
}

export async function pushMetaLeadGenCampaign(campaignJson: unknown): Promise<{ ok: boolean; externalId?: string; error?: string }> {
  const acct = await getMetaAccount();
  if (!acct) return { ok: false, error: 'Meta Ads not connected. Connect in Settings.' };
  if (!acct.customerId) return { ok: false, error: 'No Meta ad account ID set on the connected account.' };

  return {
    ok: false,
    error:
      'Meta Ads push is configured but disabled in this build. OAuth token and ad account ID are saved — launching a Meta Lead Gen campaign requires creating campaign → ad set → ad → lead form in Marketing API v21.0, which is intentionally left as a manual review step. Campaign JSON has been saved for your team to review.',
  };
}
