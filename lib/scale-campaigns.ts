import { callAI, tryParseJson } from '@/lib/scale-ai';
import { buildBrainPrompt } from '@/lib/scale-brain';
import { services } from '@/lib/services';
import { areas } from '@/lib/areas';

export type CampaignChannel =
  | 'google-search'
  | 'google-lsa'
  | 'google-display'
  | 'meta-lead-gen'
  | 'nextdoor'
  | 'custom';

export type CampaignConfig = {
  channel: CampaignChannel;
  services?: string[]; // service slugs
  areas?: string[]; // area slugs
  demographics?: {
    ageMin?: number;
    ageMax?: number;
    homeownerStatus?: boolean;
    incomeBracket?: string;
  };
  neighborhoods?: string[];
  brief?: string;
  budget: number;
  schedule?: { days?: string[]; timeStart?: string; timeEnd?: string };
  landingUrl?: string;
  creative?: {
    template?: string;
    imageBase64?: string;
  };
  variant?: 'A' | 'B';
};

const BUSINESS_FACTS = `
Business: Dry Vent Tampa
Tagline: Tampa Bay's most trusted dryer vent cleaning
Phone: {{PHONE}}
Licensed & Insured in Florida. NFPA 211 compliant.
11 years serving Tampa Bay. 15,000+ vents cleaned. 4.9/5 across 847+ reviews.
Same-day service available. Free estimates. No obligation.
`.trim();

function businessFacts() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 555-1234';
  return BUSINESS_FACTS.replace('{{PHONE}}', phone);
}

const VARIANT_ANGLES = {
  A: 'Benefit & trust focused. Emphasize professional expertise, licensed/insured, 4.9-star reviews, satisfaction guarantee, long Tampa Bay tenure. Tone: reassuring authority.',
  B: 'Urgency & fire-safety focused. Emphasize NFPA fire statistics, warning signs (burning smells, long dry times), immediate risk of dryer fires in Florida humidity. Tone: urgent safety alert.',
};

export function channelSystemPrompt(channel: CampaignChannel, variant: 'A' | 'B'): string {
  const common = `
${businessFacts()}

## Variant angle for this ad
${VARIANT_ANGLES[variant]}
`.trim();

  if (channel === 'google-search') {
    return `${common}

## Google Ads — Responsive Search Ads spec
Generate ONE ad group configuration. Output STRICT JSON with this exact shape:
{
  "adGroupName": "string (service_area_yyyymm format)",
  "headlines": [
    { "text": "max 30 chars", "pinnedPosition": 1|2|3|null }
  ],
  "descriptions": [{ "text": "max 90 chars" }],
  "keywords": {
    "exactMatch": ["[keyword]"],
    "phraseMatch": ["\\"keyword\\""],
    "broadModified": ["+word +word"]
  },
  "negativeKeywords": ["rental", "diy", "how to", "youtube", "free"],
  "sitelinks": [{ "text": "max 25 chars", "description1": "max 35 chars", "description2": "max 35 chars", "url": "string" }],
  "callouts": ["max 25 chars each"],
  "structuredSnippets": { "header": "Services", "values": ["Cleaning", "Repair", "Installation", "Inspection"] },
  "bidStrategy": "Maximize Conversions | Target CPA | Manual CPC",
  "locationTargeting": "city + 25mi radius",
  "deviceBids": { "mobile": "+25%", "desktop": "0%", "tablet": "0%" },
  "adSchedule": "Mon-Fri 7am-7pm, Sat 8am-5pm"
}

REQUIREMENTS:
- 15 headlines total, max 30 chars each
- 3 headlines should be pinned to position 1 (service name + city)
- 3 headlines should use {KeyWord:Dryer Vent Cleaning} dynamic insertion
- 4 descriptions, max 90 chars each
- 15-25 exact-match keywords, 10+ phrase-match keywords
- Negative keywords MUST include: rental, diy, how to, youtube, free
- 4 sitelinks with both descriptions
- 4 callouts
- structuredSnippets with service list
- Respect banned words from Brain rules
`;
  }

  if (channel === 'meta-lead-gen') {
    return `${common}

## Meta Lead Gen Ad — spec
Output STRICT JSON:
{
  "campaignName": "string",
  "primaryText": "string (40-80 chars sweet spot, max 125 words)",
  "headline": "max 40 chars",
  "description": "max 30 chars",
  "ctaButton": "Get Quote | Sign Up | Learn More | Book Now",
  "leadForm": {
    "fields": ["Full Name", "Phone Number", "Email (optional)", "ZIP Code", "Service Type"],
    "contextCard": {
      "title": "string",
      "body": "string explaining what happens next"
    },
    "privacyPolicyUrl": "string",
    "thankYouHeadline": "string",
    "thankYouBody": "string"
  },
  "audience": {
    "locations": ["Tampa, FL", "St. Petersburg, FL", "Clearwater, FL"],
    "ageRange": [28, 65],
    "interests": ["Home improvement", "Homeownership", "Family safety"],
    "lookalikes": ["1% homeowner lookalike from existing customer list"],
    "exclusions": ["Current customers", "Under 28", "Renters"],
    "customAudiences": ["Website visitors past 90 days"]
  },
  "estimatedCpl": "$20-$45 for Florida dryer vent cleaning lead"
}
`;
  }

  if (channel === 'google-lsa') {
    return `${common}

## Google Local Services Ads — spec
Output STRICT JSON:
{
  "businessBio": "max 300 chars, includes licensing + years in business",
  "serviceAreas": ["city names"],
  "jobTypes": ["Dryer Vent Cleaning", "Dryer Vent Repair", "Dryer Vent Installation"],
  "hoursOfOperation": "string",
  "leadQualifiers": ["question to ask incoming calls"],
  "dispatchPolicy": "same-day vs 24-48 hour",
  "reviewsStrategy": "how to solicit reviews after job completion"
}
`;
  }

  if (channel === 'google-display') {
    return `${common}

## Google Display Network — retargeting spec
Output STRICT JSON:
{
  "campaignName": "string",
  "audience": "Website visitors past 30 days who didn't convert",
  "displayHeadlines": ["max 30 chars"],
  "longHeadlines": ["max 90 chars"],
  "descriptions": ["max 90 chars"],
  "callToAction": "Get Free Estimate",
  "bannerSizes": ["300x250", "728x90", "160x600", "300x600", "320x50"],
  "frequencyCap": "2/day per user",
  "budget": "10-20% of search budget"
}
`;
  }

  if (channel === 'nextdoor') {
    return `${common}

## Nextdoor Neighborhood Ad — spec
Output STRICT JSON:
{
  "campaignName": "string",
  "headline": "max 40 chars, neighborhood-specific",
  "body": "max 200 words, conversational, mentions neighborhood by name",
  "cta": "Get Free Estimate",
  "targetNeighborhoods": ["neighborhood names"],
  "postType": "Local deal | Neighborhood expert | Service announcement",
  "imageRecommendation": "real team photo, not stock"
}
`;
  }

  return `${common}

## Custom campaign
User provided a free-form brief. Return a JSON object that summarizes the plan:
{
  "campaignName": "string",
  "objective": "string",
  "keyMessages": ["string"],
  "creativeDirection": "string",
  "channels": ["string"],
  "successMetrics": ["string"]
}
`;
}

export async function generateCampaign(config: CampaignConfig, variant: 'A' | 'B' = 'A') {
  const brain = await buildBrainPrompt();
  const channelPrompt = channelSystemPrompt(config.channel, variant);

  const system = `${brain}\n\n${channelPrompt}`;

  const svcDetail = config.services
    ? services.filter((s) => config.services!.includes(s.slug)).map((s) => `- ${s.name}: ${s.intro}`).join('\n')
    : '';
  const areaDetail = config.areas
    ? areas
        .filter((a) => config.areas!.includes(a.slug))
        .map((a) => `- ${a.name} (${a.county} County): ${a.intro}`)
        .join('\n')
    : '';

  const userMsg = [
    `Generate the ${config.channel} campaign with these parameters:`,
    config.services ? `Services:\n${svcDetail}` : '',
    config.areas ? `Areas:\n${areaDetail}` : '',
    config.budget ? `Daily budget: $${config.budget}` : '',
    config.landingUrl ? `Landing URL: ${config.landingUrl}` : '',
    config.brief ? `Brief: ${config.brief}` : '',
    config.demographics
      ? `Demographics: ${JSON.stringify(config.demographics)}`
      : '',
    '',
    `This is Variant ${variant}. Return ONLY the JSON object, no prose.`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const res = await callAI({
    model: 'claude-haiku-4-5-20251001',
    provider: 'anthropic',
    system,
    messages: [{ role: 'user', content: userMsg }],
    maxTokens: 4000,
    temperature: 0.6,
    jsonResponse: true,
  });

  if (res.error) {
    return { ok: false as const, error: res.error, variant, tokensUsed: 0, costUsd: 0 };
  }

  const parsed = tryParseJson(res.text);
  return {
    ok: parsed.ok,
    variant,
    data: parsed.ok ? parsed.data : null,
    raw: res.text,
    error: parsed.ok ? undefined : parsed.error,
    tokensUsed: res.tokensUsed,
    costUsd: res.costUsd,
  };
}
