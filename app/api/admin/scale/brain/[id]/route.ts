import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  if ('category' in body) data.category = body.category;
  if ('text' in body) data.text = body.text;
  if ('active' in body) data.active = !!body.active;
  const rule = await prisma.brainRule.update({ where: { id }, data });
  return NextResponse.json({ rule });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await prisma.brainRule.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
