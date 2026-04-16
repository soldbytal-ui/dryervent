import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const SAMPLE_LEADS = [
  { name: 'Sarah Johnson', phone: '(813) 555-1011', email: 'sarah.j@example.com', zip: '33606', city: 'Tampa', service: 'cleaning', status: 'new', source: 'organic', page: '/' },
  { name: 'Mike Rodriguez', phone: '(813) 555-1022', email: 'mike.r@example.com', zip: '33701', city: 'St. Petersburg', service: 'cleaning', status: 'contacted', notes: 'Left voicemail Monday. Callback requested Tuesday after 4pm.', source: 'google_ads' },
  { name: 'Linda Chen', phone: '(813) 555-1033', email: 'linda.c@example.com', zip: '33759', city: 'Clearwater', service: 'repair', status: 'quoted', quotedAmount: 289, notes: 'Quoted $289 for foil ducting replacement. Waiting on approval.', source: 'meta_ads' },
  { name: 'David Patel', phone: '(813) 555-1044', email: 'david.p@example.com', zip: '33647', city: 'New Tampa', service: 'cleaning', status: 'booked', notes: 'Scheduled Thursday 10am. 2-story home, second-floor laundry.', source: 'referral' },
  { name: 'Emily Carter', phone: '(813) 555-1055', email: 'emily.c@example.com', zip: '33626', city: 'Westchase', service: 'commercial', status: 'won', quotedAmount: 1850, notes: 'HOA signed 24-unit annual contract. Quarterly cleaning.', source: 'nextdoor' },
  { name: 'Robert Kim', phone: '(813) 555-1066', email: 'robert.k@example.com', zip: '33511', city: 'Brandon', service: 'inspection', status: 'lost', notes: 'Chose competitor on price. Follow up in 6 months.', source: 'google_search' },
  { name: 'Jennifer Alvarez', phone: '(813) 555-1077', email: 'jen.a@example.com', zip: '33572', city: 'Apollo Beach', service: 'cleaning', status: 'new', source: 'organic', notes: 'Waterfront property, salt exposure concerns.' },
];

export async function POST() {
  try {
    const count = await prisma.lead.count();
    if (count > 0) return NextResponse.json({ seeded: 0, existing: count });

    await prisma.lead.createMany({
      data: SAMPLE_LEADS.map((l) => ({
        ...l,
        nextFollowUp: null,
        page: l.page || '/admin/scale/crm',
      })),
    });

    return NextResponse.json({ seeded: SAMPLE_LEADS.length });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}
