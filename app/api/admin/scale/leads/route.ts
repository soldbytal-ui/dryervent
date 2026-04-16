import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['new', 'contacted', 'quoted', 'booked', 'complete', 'won', 'lost'];

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const status = params.get('status');
  const service = params.get('service');
  const city = params.get('city');
  const source = params.get('source');
  const q = params.get('q');

  const where: Record<string, unknown> = {};
  if (status && VALID_STATUSES.includes(status)) where.status = status;
  if (service) where.service = service;
  if (city) where.city = city;
  if (source) where.source = source;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
      { email: { contains: q, mode: 'insensitive' } },
      { zip: { contains: q } },
    ];
  }

  try {
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    return NextResponse.json({ leads });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        zip: body.zip || '',
        city: body.city || null,
        service: body.service || 'cleaning',
        message: body.message || null,
        source: body.source || 'manual',
        page: '/admin/scale/crm',
        status: body.status || 'new',
        notes: body.notes || null,
        assignedTo: body.assignedTo || null,
      },
    });
    return NextResponse.json({ lead }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}
