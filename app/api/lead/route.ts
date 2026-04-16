import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const LeadSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional().or(z.literal('')),
  zip: z.string().regex(/^\d{5}$/),
  city: z.string().optional(),
  service: z.string().default('cleaning'),
  message: z.string().max(2000).optional(),
  source: z.string().optional(),
  medium: z.string().optional(),
  campaign: z.string().optional(),
  page: z.string().optional(),
  referrer: z.string().optional(),
  // honeypot
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot — silent success to bots
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const { website, ...data } = parsed.data;

    const userAgent = req.headers.get('user-agent') || undefined;
    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      undefined;

    // Save to database
    const lead = await prisma.lead.create({
      data: {
        ...data,
        email: data.email || null,
        userAgent,
        ipAddress,
      },
    });

    // Fire-and-forget: email notification
    if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resend.emails
        .send({
          from: 'Dry Vent Tampa <leads@dryventtampa.com>',
          to: process.env.LEAD_NOTIFICATION_EMAIL,
          subject: `🔥 New Lead: ${data.name} — ${data.city || data.zip}`,
          html: `
            <h2>New Lead from Dry Vent Tampa</h2>
            <table style="font-family: sans-serif; border-collapse: collapse;">
              <tr><td style="padding: 6px 12px;"><b>Name:</b></td><td style="padding: 6px 12px;">${data.name}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>Phone:</b></td><td style="padding: 6px 12px;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
              <tr><td style="padding: 6px 12px;"><b>Email:</b></td><td style="padding: 6px 12px;">${data.email || '—'}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>ZIP:</b></td><td style="padding: 6px 12px;">${data.zip}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>City:</b></td><td style="padding: 6px 12px;">${data.city || '—'}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>Service:</b></td><td style="padding: 6px 12px;">${data.service}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>Source:</b></td><td style="padding: 6px 12px;">${data.source || 'direct'} / ${data.medium || '—'} / ${data.campaign || '—'}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>Page:</b></td><td style="padding: 6px 12px;">${data.page || '—'}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>Referrer:</b></td><td style="padding: 6px 12px;">${data.referrer || 'direct'}</td></tr>
              <tr><td style="padding: 6px 12px;"><b>Lead ID:</b></td><td style="padding: 6px 12px;">${lead.id}</td></tr>
            </table>
          `,
        })
        .catch((err) => console.error('[resend] send failed:', err));
    }

    // Fire-and-forget: n8n webhook
    if (process.env.N8N_LEAD_WEBHOOK_URL) {
      fetch(process.env.N8N_LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: lead.id, createdAt: lead.createdAt }),
      }).catch((err) => console.error('[n8n] webhook failed:', err));
    }

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err: any) {
    console.error('[api/lead] error:', err);
    return NextResponse.json(
      { error: 'Internal error. Please call us directly.' },
      { status: 500 }
    );
  }
}
