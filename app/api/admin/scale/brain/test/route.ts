import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/scale-ai';
import { buildBrainPrompt } from '@/lib/scale-brain';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const brain = await buildBrainPrompt();
    const res = await callAI({
      model: body.model || 'claude-haiku-4-5-20251001',
      provider: body.provider || 'anthropic',
      system: brain,
      messages: body.messages || [{ role: 'user', content: body.prompt || 'Hello' }],
      maxTokens: 1500,
      temperature: 0.7,
    });
    return NextResponse.json(res);
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}
