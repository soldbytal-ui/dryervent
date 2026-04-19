// Scale AI: provider-agnostic model router.
// Routes calls to Anthropic or OpenRouter based on config stored in env or client-side localStorage.

export type ScaleModel = {
  id: string;
  provider: 'anthropic' | 'openrouter';
  label: string;
  tierCost: 'free' | 'low' | 'mid' | 'high';
};

export const SCALE_MODELS: ScaleModel[] = [
  { id: 'claude-opus-4-6', provider: 'anthropic', label: 'Claude Opus 4.6', tierCost: 'high' },
  { id: 'claude-sonnet-4-6', provider: 'anthropic', label: 'Claude Sonnet 4.6', tierCost: 'mid' },
  { id: 'claude-haiku-4-5-20251001', provider: 'anthropic', label: 'Claude Haiku 4.5', tierCost: 'low' },
  { id: 'anthropic/claude-sonnet-4.5', provider: 'openrouter', label: 'Sonnet 4.5 via OpenRouter', tierCost: 'mid' },
  { id: 'anthropic/claude-haiku-4.5', provider: 'openrouter', label: 'Haiku 4.5 via OpenRouter', tierCost: 'low' },
  { id: 'meta-llama/llama-3.1-70b-instruct:free', provider: 'openrouter', label: 'Llama 3.1 70B (free)', tierCost: 'free' },
];

export type ScaleAIRequest = {
  model?: string;
  provider?: 'anthropic' | 'openrouter';
  system?: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
  maxTokens?: number;
  temperature?: number;
  jsonResponse?: boolean;
};

export type ScaleAIResponse = {
  text: string;
  model: string;
  tokensUsed: number;
  costUsd: number;
  error?: string;
};

function estimateCost(model: string, inputTokens: number, outputTokens: number): number {
  const rates: Record<string, [number, number]> = {
    'claude-opus-4-6': [15, 75],
    'claude-sonnet-4-6': [3, 15],
    'claude-haiku-4-5-20251001': [0.8, 4],
    'anthropic/claude-sonnet-4.5': [3, 15],
    'anthropic/claude-haiku-4.5': [0.8, 4],
  };
  const [inR, outR] = rates[model] || [1, 3];
  return (inputTokens * inR + outputTokens * outR) / 1_000_000;
}

export async function callAI(req: ScaleAIRequest): Promise<ScaleAIResponse> {
  const provider = req.provider || 'anthropic';
  const model = req.model || (provider === 'anthropic' ? 'claude-haiku-4-5-20251001' : 'anthropic/claude-haiku-4.5');

  try {
    if (provider === 'anthropic') {
      return await callAnthropic({ ...req, model });
    } else {
      return await callOpenRouter({ ...req, model });
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return { text: '', model, tokensUsed: 0, costUsd: 0, error: msg };
  }
}

async function callAnthropic(req: ScaleAIRequest): Promise<ScaleAIResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      text: '',
      model: req.model!,
      tokensUsed: 0,
      costUsd: 0,
      error: 'ANTHROPIC_API_KEY not configured. Add it in Settings or as an environment variable.',
    };
  }

  const body: Record<string, unknown> = {
    model: req.model,
    max_tokens: req.maxTokens || 4096,
    temperature: req.temperature ?? 0.7,
    messages: req.messages,
  };
  if (req.system) body.system = req.system;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  const inputTokens = data.usage?.input_tokens || 0;
  const outputTokens = data.usage?.output_tokens || 0;

  return {
    text,
    model: req.model!,
    tokensUsed: inputTokens + outputTokens,
    costUsd: estimateCost(req.model!, inputTokens, outputTokens),
  };
}

async function callOpenRouter(req: ScaleAIRequest): Promise<ScaleAIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      text: '',
      model: req.model!,
      tokensUsed: 0,
      costUsd: 0,
      error: 'OPENROUTER_API_KEY not configured. Add it in Settings or as an environment variable.',
    };
  }

  const messages = [];
  if (req.system) messages.push({ role: 'system', content: req.system });
  for (const m of req.messages) messages.push(m);

  const body: Record<string, unknown> = {
    model: req.model,
    messages,
    max_tokens: req.maxTokens || 4096,
    temperature: req.temperature ?? 0.7,
  };
  if (req.jsonResponse) body.response_format = { type: 'json_object' };

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app',
      'X-Title': 'Airflow Dryer Vent Cleaning Scale',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  const inputTokens = data.usage?.prompt_tokens || 0;
  const outputTokens = data.usage?.completion_tokens || 0;

  return {
    text,
    model: req.model!,
    tokensUsed: inputTokens + outputTokens,
    costUsd: estimateCost(req.model!, inputTokens, outputTokens),
  };
}

export function tryParseJson<T = unknown>(text: string): { ok: true; data: T } | { ok: false; error: string } {
  try {
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
    const firstBrace = cleaned.indexOf('{');
    const firstBracket = cleaned.indexOf('[');
    const start =
      firstBrace === -1 ? firstBracket : firstBracket === -1 ? firstBrace : Math.min(firstBrace, firstBracket);
    const end = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'));
    if (start === -1 || end === -1) return { ok: false, error: 'No JSON found' };
    const sliced = cleaned.slice(start, end + 1);
    return { ok: true, data: JSON.parse(sliced) };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : 'Parse error' };
  }
}
