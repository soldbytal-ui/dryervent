// DISABLED — placeholder customer reviews (Maria R., David K., etc.) removed
// pending real Google Business Profile / BBB review collection.
//
// The Reviews component (components/Reviews.tsx) no longer reads this file.
// It now renders verifiable trust signals (licensed, insured, free inspection,
// transparent pricing) instead of fictional testimonials.
//
// When real reviews exist:
//   1. Populate this file with real customer reviews (with explicit opt-in
//      permission to use their names on the site), OR
//   2. Fetch live from Google Business Profile API.
//   3. Re-wire components/Reviews.tsx to render them.
//   4. Re-add aggregateRating to lib/schema.ts localBusinessSchema()
//      with reviewCount matching the real count.
//
// Empty export preserved so existing imports don't break.

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

export const reviews: Review[] = [];
