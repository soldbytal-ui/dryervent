import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ lead });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    const allowed = ['status', 'notes', 'nextFollowUp', 'assignedTo', 'quotedAmount', 'name', 'phone', 'email', 'service', 'city'];
    for (const k of allowed) {
      if (k in body) data[k] = body[k] === '' ? null : body[k];
    }
    if (data.nextFollowUp && typeof data.nextFollowUp === 'string') {
      data.nextFollowUp = new Date(data.nextFollowUp as string);
    }
    if (data.quotedAmount !== undefined && data.quotedAmount !== null) {
      data.quotedAmount = parseFloat(data.quotedAmount as string);
      if (isNaN(data.quotedAmount as number)) data.quotedAmount = null;
    }
    const lead = await prisma.lead.update({ where: { id }, data });
    return NextResponse.json({ lead });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}
