import { prisma } from '@/lib/prisma';
import { callAI, tryParseJson } from '@/lib/scale-ai';
import { buildBrainPrompt } from '@/lib/scale-brain';

export const SEED_AGENTS = [
  {
    name: 'Scale CEO',
    role: 'Top-level orchestrator for the Airflow Dryer Vent Cleaning Scale platform. Plans strategy, delegates to directors, reviews outputs.',
    model: 'claude-sonnet-4-6',
    provider: 'anthropic',
    budgetMonthly: 20,
    heartbeatHours: 8,
    tools: ['CRM', 'Campaigns', 'GoogleAds', 'MetaAds', 'AgentBrain', 'Content'],
    autoApprove: false,
    systemPrompt:
      'You are the Scale CEO for Airflow Dryer Vent Cleaning. Your job is to oversee the entire lead generation and growth operation. Monitor lead volume, campaign ROI, and agent task queues. Delegate ad operations to the Ad Ops Director, lead follow-up to the Lead Ops Director, and content to the Content Director. Make strategic decisions about budget allocation and campaign prioritization. Never launch ads without human approval.',
  },
  {
    name: 'Ad Ops Director',
    role: 'Reports to CEO. Runs all paid advertising — Google Ads, Meta Lead Gen, Nextdoor.',
    model: 'claude-haiku-4-5-20251001',
    provider: 'anthropic',
    budgetMonthly: 15,
    heartbeatHours: 4,
    tools: ['Campaigns', 'GoogleAds', 'MetaAds'],
    autoApprove: false,
    systemPrompt:
      'You are the Ad Ops Director. You run all paid advertising campaigns for Airflow Dryer Vent Cleaning. Monitor campaign performance, adjust budgets within approved limits, rotate creative when CTR drops, pause underperforming ad groups, and draft new campaigns for CEO review. All campaigns must launch PAUSED pending human approval.',
  },
  {
    name: 'Lead Ops Director',
    role: 'Reports to CEO. Manages lead pipeline, follow-up cadence, and conversion tracking.',
    model: 'claude-haiku-4-5-20251001',
    provider: 'anthropic',
    budgetMonthly: 10,
    heartbeatHours: 4,
    tools: ['CRM', 'AgentBrain'],
    autoApprove: false,
    systemPrompt:
      'You are the Lead Ops Director. You monitor the CRM for new and stalled leads, propose follow-up messages, flag leads that need urgent attention, update statuses based on agent activity logs, and report weekly conversion metrics to the CEO.',
  },
  {
    name: 'Content Director',
    role: 'Reports to CEO. Plans blog posts, landing page improvements, and AI-search content.',
    model: 'claude-haiku-4-5-20251001',
    provider: 'anthropic',
    budgetMonthly: 10,
    heartbeatHours: 12,
    tools: ['Content', 'AgentBrain'],
    autoApprove: false,
    systemPrompt:
      'You are the Content Director. You plan blog content targeting long-tail Tampa Bay dryer vent keywords, draft updates for service and area pages, and propose AI-search optimizations. Output ideas and briefs — do not publish directly. CEO reviews all content before the Content team ships.',
  },
  {
    name: 'Platform Lead',
    role: 'Reports to CEO. Owns technical platform — integrations, schema, agent infrastructure.',
    model: 'claude-sonnet-4-6',
    provider: 'anthropic',
    budgetMonthly: 15,
    heartbeatHours: 8,
    tools: ['CRM', 'Campaigns', 'GoogleAds', 'MetaAds', 'AgentBrain', 'Content'],
    autoApprove: false,
    systemPrompt:
      'You are the Platform Lead. You monitor integration health (Google Ads OAuth, Meta Ads OAuth, Supabase, AI provider), flag broken connections, propose schema migrations, and coordinate technical handoffs between directors. Report platform incidents to the CEO immediately.',
  },
];

export async function seedAgents() {
  const count = await prisma.agent.count();
  if (count > 0) return 0;

  // Create CEO first
  const ceoSeed = SEED_AGENTS[0];
  const ceo = await prisma.agent.create({
    data: {
      name: ceoSeed.name,
      role: ceoSeed.role,
      systemPrompt: ceoSeed.systemPrompt,
      model: ceoSeed.model,
      provider: ceoSeed.provider,
      budgetMonthly: ceoSeed.budgetMonthly,
      heartbeatHours: ceoSeed.heartbeatHours,
      tools: ceoSeed.tools,
      autoApprove: ceoSeed.autoApprove,
    },
  });

  // Rest report to CEO
  for (let i = 1; i < SEED_AGENTS.length; i++) {
    const a = SEED_AGENTS[i];
    await prisma.agent.create({
      data: {
        name: a.name,
        role: a.role,
        systemPrompt: a.systemPrompt,
        model: a.model,
        provider: a.provider,
        budgetMonthly: a.budgetMonthly,
        heartbeatHours: a.heartbeatHours,
        tools: a.tools,
        autoApprove: a.autoApprove,
        reportsToId: ceo.id,
      },
    });
  }
  return SEED_AGENTS.length;
}

export type HeartbeatResult = {
  agentId: string;
  agentName: string;
  ran: boolean;
  reason?: string;
  actions?: number;
  taskUpdates?: number;
  newTasks?: number;
  tokensUsed?: number;
  error?: string;
};

export async function runAgentHeartbeat(agentId: string): Promise<HeartbeatResult> {
  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
    include: { tasks: { where: { status: { in: ['queued', 'in_progress'] } }, take: 20 } },
  });

  if (!agent) return { agentId, agentName: 'unknown', ran: false, reason: 'agent not found' };
  if (agent.status !== 'active') return { agentId, agentName: agent.name, ran: false, reason: 'inactive' };

  const brain = await buildBrainPrompt();

  const taskList =
    agent.tasks.length === 0
      ? '(no tasks assigned)'
      : agent.tasks
          .map(
            (t, i) =>
              `${i + 1}. [${t.status}] ${t.title}\n   ${t.description.slice(0, 200)}`,
          )
          .join('\n');

  const system = [
    brain,
    '',
    '## Your role',
    agent.systemPrompt,
    '',
    '## Available tools',
    agent.tools.join(', ') || '(none)',
    '',
    '## Response format',
    'Respond with STRICT JSON matching this schema:',
    '{',
    '  "report": "1-3 sentence summary of what you did this heartbeat",',
    '  "task_updates": [{ "id": "taskId", "status": "in_progress|completed|blocked", "note": "..." }],',
    '  "new_subtasks": [{ "title": "...", "description": "...", "priority": "low|medium|high" }],',
    '  "actions": [{ "type": "tool-name", "payload": {...}, "needs_approval": true|false }]',
    '}',
  ].join('\n');

  const userMsg = [
    `Heartbeat fired at ${new Date().toISOString()}.`,
    `Last heartbeat: ${agent.lastHeartbeat ? agent.lastHeartbeat.toISOString() : 'never'}.`,
    '',
    'Current tasks:',
    taskList,
  ].join('\n');

  const aiRes = await callAI({
    model: agent.model,
    provider: agent.provider as 'anthropic' | 'openrouter',
    system,
    messages: [{ role: 'user', content: userMsg }],
    maxTokens: 2000,
    temperature: 0.3,
    jsonResponse: true,
  });

  if (aiRes.error) {
    await prisma.agent.update({
      where: { id: agent.id },
      data: { lastHeartbeat: new Date() },
    });
    await prisma.agentAudit.create({
      data: {
        agentId: agent.id,
        actionType: 'heartbeat_error',
        output: aiRes.error,
        tokensUsed: 0,
      },
    });
    return { agentId, agentName: agent.name, ran: false, error: aiRes.error };
  }

  const parsed = tryParseJson<{
    report?: string;
    task_updates?: { id: string; status: string; note?: string }[];
    new_subtasks?: { title: string; description: string; priority?: string }[];
    actions?: { type: string; payload: unknown; needs_approval?: boolean }[];
  }>(aiRes.text);

  let taskUpdates = 0;
  let newTasks = 0;
  let actions = 0;

  if (parsed.ok) {
    const d = parsed.data;
    if (Array.isArray(d.task_updates)) {
      for (const u of d.task_updates) {
        try {
          await prisma.task.update({
            where: { id: u.id },
            data: {
              status: u.status,
              output: u.note || undefined,
              completedAt: u.status === 'completed' ? new Date() : undefined,
            },
          });
          taskUpdates++;
        } catch {
          /* ignore missing ids */
        }
      }
    }
    if (Array.isArray(d.new_subtasks)) {
      for (const st of d.new_subtasks) {
        await prisma.task.create({
          data: {
            title: st.title,
            description: st.description,
            priority: st.priority || 'medium',
            agentId: agent.id,
            status: 'queued',
          },
        });
        newTasks++;
      }
    }
    if (Array.isArray(d.actions)) {
      for (const a of d.actions) {
        const needs = a.needs_approval !== false && !agent.autoApprove;
        await prisma.task.create({
          data: {
            title: `Action: ${a.type}`,
            description: JSON.stringify(a.payload).slice(0, 2000),
            priority: 'high',
            agentId: agent.id,
            status: needs ? 'needs_approval' : 'queued',
            needsApproval: needs,
          },
        });
        actions++;
      }
    }
  }

  await prisma.agent.update({
    where: { id: agent.id },
    data: {
      lastHeartbeat: new Date(),
      budgetSpent: { increment: aiRes.costUsd },
    },
  });

  await prisma.agentAudit.create({
    data: {
      agentId: agent.id,
      actionType: 'heartbeat',
      input: userMsg.slice(0, 1000),
      output: aiRes.text.slice(0, 4000),
      tokensUsed: aiRes.tokensUsed,
      costUsd: aiRes.costUsd,
    },
  });

  return {
    agentId,
    agentName: agent.name,
    ran: true,
    actions,
    taskUpdates,
    newTasks,
    tokensUsed: aiRes.tokensUsed,
  };
}

export async function getDueAgents() {
  const agents = await prisma.agent.findMany({ where: { status: 'active' } });
  const now = Date.now();
  return agents.filter((a) => {
    if (!a.lastHeartbeat) return true;
    return now - a.lastHeartbeat.getTime() >= a.heartbeatHours * 60 * 60 * 1000;
  });
}
