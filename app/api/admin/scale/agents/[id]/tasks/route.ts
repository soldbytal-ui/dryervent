import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json();
  const task = await prisma.task.create({
    data: {
      agentId: id,
      title: body.title,
      description: body.description || '',
      priority: body.priority || 'medium',
      status: 'queued',
    },
  });
  return NextResponse.json({ task }, { status: 201 });
}
