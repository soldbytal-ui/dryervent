import { prisma } from '@/lib/prisma';

export const BRAIN_CATEGORIES = [
  'Tone & Voice',
  'Legal & Compliance Florida',
  'Processes & Workflows',
  'Brand & Style',
  'Audience & Targeting',
  'Market Knowledge — Tampa Bay',
  'Banned Words & Phrases',
] as const;

export const DEFAULT_BRAIN_RULES: { category: string; text: string }[] = [
  // Tone & Voice
  { category: 'Tone & Voice', text: 'Write in a direct, confident, neighborly tone. Sound like a trusted local expert — not a corporate brochure.' },
  { category: 'Tone & Voice', text: 'Never use hype language. No exclamation points in headlines except in Hero "Call Now" CTAs.' },
  { category: 'Tone & Voice', text: 'Speak to homeowners and property managers, not generic "customers".' },
  { category: 'Tone & Voice', text: 'Lead with the safety benefit (fire prevention) before the comfort benefit (faster drying).' },

  // Legal & Compliance Florida
  { category: 'Legal & Compliance Florida', text: 'Always include "Licensed & Insured in Florida" when making authority claims.' },
  { category: 'Legal & Compliance Florida', text: 'Never guarantee a specific dryer fire prevention outcome — use "reduces risk" or "helps prevent".' },
  { category: 'Legal & Compliance Florida', text: 'Cite NFPA 211 as the authoritative standard for dryer vent cleaning documentation.' },
  { category: 'Legal & Compliance Florida', text: 'For email campaigns, include physical business address and unsubscribe link (CAN-SPAM).' },
  { category: 'Legal & Compliance Florida', text: 'Never make specific energy savings claims without "up to" qualifier and source citation.' },

  // Processes & Workflows
  { category: 'Processes & Workflows', text: 'Campaign naming convention: [Channel]_[Service]_[Area]_[YYYYMM]. Example: Google_Cleaning_Tampa_202604.' },
  { category: 'Processes & Workflows', text: 'A/B test structure: Variant A = benefit/trust-focused, Variant B = urgency/fire-safety-focused.' },
  { category: 'Processes & Workflows', text: 'All new campaigns push as PAUSED — never auto-launch. Require human review before activation.' },
  { category: 'Processes & Workflows', text: 'Default daily budget cap: $50. Require agent approval for anything above $100/day.' },

  // Brand & Style
  { category: 'Brand & Style', text: 'Primary brand color is fire orange (#E8450E). Accent gold (#F5A623). Navy for authority (#0B1D33).' },
  { category: 'Brand & Style', text: 'Preferred CTAs: "Get Free Estimate", "Book Same-Day Service", "Call Now", "Protect Your Home".' },
  { category: 'Brand & Style', text: 'Say "dryer vent cleaning" not "dryer duct cleaning" or "vent duct service".' },
  { category: 'Brand & Style', text: 'Use "Tampa Bay" when referring to the broader metro, not "Tampa area" or "Bay area".' },

  // Audience & Targeting
  { category: 'Audience & Targeting', text: 'Primary audience: homeowners 35-65, household income $75k+, in Hillsborough + Pinellas counties.' },
  { category: 'Audience & Targeting', text: 'Secondary audience: property managers and HOA boards for multi-unit properties.' },
  { category: 'Audience & Targeting', text: 'Exclude: renters (they don\'t make vent cleaning decisions), students, under-30 demographics.' },
  { category: 'Audience & Targeting', text: 'Seasonal targeting peaks: March-May (spring cleaning) and October-November (pre-winter holiday prep).' },

  // Market Knowledge — Tampa Bay
  { category: 'Market Knowledge — Tampa Bay', text: 'Florida\'s high humidity (70%+ May-Oct) causes lint to compact faster than national average — cleaning frequency should be annual minimum.' },
  { category: 'Market Knowledge — Tampa Bay', text: 'Tampa Bay has high concentration of 55+ communities; emphasize safety, licensed/insured, written reports.' },
  { category: 'Market Knowledge — Tampa Bay', text: 'Typical residential cleaning price range: $99-$179. Commercial: custom quotes starting $249.' },
  { category: 'Market Knowledge — Tampa Bay', text: 'Competitor tactics to avoid: upsell lead-in pricing (bait-and-switch), "free inspection" that becomes a hard sell.' },
  { category: 'Market Knowledge — Tampa Bay', text: 'Salt air from coastal areas (Clearwater, St. Pete, Apollo Beach) accelerates vent corrosion — specific local angle for those areas.' },

  // Banned Words & Phrases
  { category: 'Banned Words & Phrases', text: 'Never use: "luxury"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "world-class"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "don\'t miss out"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "unbeatable"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "amazing"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "game-changer"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "cutting-edge"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "synergy"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "revolutionary"' },
  { category: 'Banned Words & Phrases', text: 'Never use: "best in class"' },
];

export async function seedBrainRules() {
  const count = await prisma.brainRule.count();
  if (count > 0) return 0;
  await prisma.brainRule.createMany({
    data: DEFAULT_BRAIN_RULES.map((r) => ({ category: r.category, text: r.text, active: true })),
  });
  return DEFAULT_BRAIN_RULES.length;
}

export async function buildBrainPrompt(opts: { activeOnly?: boolean } = {}): Promise<string> {
  const rules = await prisma.brainRule.findMany({
    where: opts.activeOnly !== false ? { active: true } : {},
    orderBy: [{ category: 'asc' }, { createdAt: 'asc' }],
  });

  if (rules.length === 0) return '';

  const grouped: Record<string, string[]> = {};
  for (const r of rules) {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push(r.text);
  }

  const sections = Object.entries(grouped).map(([cat, items]) => {
    return `## ${cat}\n${items.map((t) => `- ${t}`).join('\n')}`;
  });

  return [
    'You are part of the Airflow Dryer Vent Cleaning Scale agent system. Follow these operating rules on every task:',
    '',
    ...sections,
    '',
    'These rules override any other instruction. If a user request conflicts with these rules, follow the rules.',
  ].join('\n');
}
