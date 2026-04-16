import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { seedBrainRules, buildBrainPrompt } from '@/lib/scale-brain';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await seedBrainRules();
    const [rules, prompt] = await Promise.all([
      prisma.brainRule.findMany({ orderBy: [{ category: 'asc' }, { createdAt: 'asc' }] }),
      buildBrainPrompt(),
    ]);
    return NextResponse.json({ rules, prompt });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rule = await prisma.brainRule.create({
      data: {
        category: body.category,
        text: body.text,
        active: body.active !== false,
      },
    });
    return NextResponse.json({ rule }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}
