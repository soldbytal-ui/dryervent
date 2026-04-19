export type Review = {
  name: string;
  initials: string;
  city: string;
  rating: number;
  text: string;
  source: 'Google' | 'Yelp' | 'Facebook' | 'Nextdoor';
  date: string;
  service: string;
};

export const reviews: Review[] = [
  {
    name: 'Maria R.',
    initials: 'MR',
    city: 'Tampa',
    rating: 5,
    text: 'Our dryer was taking three cycles to dry one load. After Airflow Dryer Vent Cleaning cleaned the vent, everything dried in one cycle. The technician was on time, professional, and showed me before and after photos. Massive difference.',
    source: 'Google',
    date: '2026-03-15',
    service: 'Residential Cleaning',
  },
  {
    name: 'David K.',
    initials: 'DK',
    city: 'St. Petersburg',
    rating: 5,
    text: 'I had no idea how much lint was packed in our vent. It was honestly scary. They cleared everything out, showed me photos, and now I feel safe running the dryer again. Booking annual service from now on.',
    source: 'Google',
    date: '2026-02-28',
    service: 'Residential Cleaning',
  },
  {
    name: 'Susan C.',
    initials: 'SC',
    city: 'Clearwater',
    rating: 5,
    text: 'We manage 120 units and use Airflow Dryer Vent Cleaning for all of them. They are reliable, fairly priced, and their team is always professional. Best vendor we work with by a wide margin.',
    source: 'Google',
    date: '2026-03-02',
    service: 'Commercial Service',
  },
  {
    name: 'James T.',
    initials: 'JT',
    city: 'Brandon',
    rating: 5,
    text: 'Same-day service when our dryer started smelling like burning. Showed up in two hours, cleaned everything, found a kinked section, and fixed it. Fast, fair, and probably saved us from a fire.',
    source: 'Yelp',
    date: '2026-01-20',
    service: 'Residential + Repair',
  },
  {
    name: 'Linda H.',
    initials: 'LH',
    city: 'Wesley Chapel',
    rating: 5,
    text: 'Tech explained everything, walked me through what he was doing, and gave me a written report at the end. No upselling, no pressure. Just honest work at a fair price.',
    source: 'Google',
    date: '2026-02-08',
    service: 'Residential Cleaning',
  },
  {
    name: 'Robert M.',
    initials: 'RM',
    city: 'New Tampa',
    rating: 5,
    text: 'Three other companies told me my vent run was too long for them to handle. Airflow Dryer Vent Cleaning came out, did the full 32 feet through two stories, and now my dryer works better than when it was new.',
    source: 'Google',
    date: '2026-03-22',
    service: 'Residential Cleaning',
  },
];
