import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { seedAgents } from '@/lib/scale-agents';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await seedAgents();
    const agents = await prisma.agent.findMany({
      include: {
        _count: { select: { tasks: true } },
        tasks: { where: { status: { in: ['queued', 'in_progress', 'needs_approval'] } }, take: 5 },
      },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json({ agents });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const agent = await prisma.agent.create({
      data: {
        name: body.name,
        role: body.role,
        systemPrompt: body.systemPrompt || body.role,
        reportsToId: body.reportsToId || null,
        model: body.model || 'claude-haiku-4-5-20251001',
        provider: body.provider || 'anthropic',
        budgetMonthly: body.budgetMonthly || 10,
        heartbeatHours: body.heartbeatHours || 8,
        tools: body.tools || [],
        autoApprove: !!body.autoApprove,
      },
    });
    return NextResponse.json({ agent }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}
