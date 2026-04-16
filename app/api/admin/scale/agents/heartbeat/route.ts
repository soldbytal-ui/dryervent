import { NextRequest, NextResponse } from 'next/server';
import { getDueAgents, runAgentHeartbeat } from '@/lib/scale-agents';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const force = req.nextUrl.searchParams.get('force') === '1';
  const agentId = req.nextUrl.searchParams.get('agentId');

  if (agentId) {
    const result = await runAgentHeartbeat(agentId);
    return NextResponse.json({ results: [result] });
  }

  const due = force
    ? await import('@/lib/prisma').then((m) => m.prisma.agent.findMany({ where: { status: 'active' } }))
    : await getDueAgents();

  const results = [];
  for (const a of due) {
    results.push(await runAgentHeartbeat(a.id));
  }
  return NextResponse.json({ checked: due.length, results });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
