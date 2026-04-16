import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const agent = await prisma.agent.findUnique({
    where: { id },
    include: {
      tasks: { orderBy: { createdAt: 'desc' }, take: 50 },
      audits: { orderBy: { createdAt: 'desc' }, take: 20 },
      reportsTo: true,
      subordinates: true,
    },
  });
  if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ agent });
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  const allowed = ['name', 'role', 'systemPrompt', 'model', 'provider', 'budgetMonthly', 'heartbeatHours', 'tools', 'autoApprove', 'status'];
  for (const k of allowed) if (k in body) data[k] = body[k];
  const agent = await prisma.agent.update({ where: { id }, data });
  return NextResponse.json({ agent });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await prisma.agent.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
