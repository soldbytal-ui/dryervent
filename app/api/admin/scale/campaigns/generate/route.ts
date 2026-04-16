import { NextRequest, NextResponse } from 'next/server';
import { generateCampaign, type CampaignConfig } from '@/lib/scale-campaigns';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const config = (await req.json()) as CampaignConfig;

    const [varA, varB] = await Promise.all([
      generateCampaign(config, 'A'),
      generateCampaign(config, 'B'),
    ]);

    // Persist the generated campaign plan
    try {
      await prisma.campaign.create({
        data: {
          name: `${config.channel}-${Date.now()}`,
          channel: config.channel,
          status: 'generated',
          config: JSON.stringify({ config, variantA: varA, variantB: varB }),
          generatedAt: new Date(),
        },
      });
    } catch {
      /* non-fatal */
    }

    return NextResponse.json({ variantA: varA, variantB: varB });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error' },
      { status: 500 },
    );
  }
}
