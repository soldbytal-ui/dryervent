import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  const allowed = ['status', 'output', 'needsApproval', 'priority'];
  for (const k of allowed) if (k in body) data[k] = body[k];
  if (data.status === 'completed' && !('completedAt' in data)) data.completedAt = new Date();
  const task = await prisma.task.update({ where: { id }, data });
  return NextResponse.json({ task });
}
