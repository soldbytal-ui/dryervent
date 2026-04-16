import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/scale-ai';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await callAI({
    model: body.model,
    provider: body.provider,
    messages: [{ role: 'user', content: 'Reply with exactly: CONNECTED' }],
    maxTokens: 30,
    temperature: 0,
  });
  return NextResponse.json(res);
}
