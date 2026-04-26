export type Service = {
  slug: string;
  name: string;
  shortName: string;
  priceFrom: number;
  priceUnit?: string; // e.g., "per opening" — when present, renders alongside price
  free?: boolean; // free service offering — drives "FREE" badge + price-0 Offer schema
  category?: 'primary' | 'secondary'; // brand-identity ranking; secondary = related but not core
  intro: string; // AI-extractable definition
  description: string;
  duration: string;
  includes: string[];
  benefits: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'residential-dryer-vent-cleaning',
    name: 'Residential Dryer Vent Cleaning',
    shortName: 'Residential Cleaning',
    priceFrom: 79,
    intro: 'Residential dryer vent cleaning is the professional removal of accumulated lint, debris, and obstructions from the entire dryer exhaust system — from the dryer connection through interior ducting to the exterior vent termination. Most Tampa Bay homes need this service annually to prevent fire hazards and restore dryer efficiency. Pricing starts at $79 for the first 10 feet of vent run, plus $10 per additional foot — most jobs land in the $79–$249 range depending on length.',
    description: 'Our residential service uses commercial-grade rotary brush systems and high-CFM vacuum equipment to clear every section of your vent line. Unlike DIY methods or basic shop vacuums, professional cleaning reaches the full length of the duct — including bends, vertical runs, and exterior hood — where lint accumulates most dangerously. Per-foot transparent pricing means you know what the job costs before we start.',
    duration: '45–75 minutes',
    includes: [
      'Pre-cleaning airflow measurement',
      'Full vent line cleaning (dryer to exterior)',
      'Exterior vent hood cleaning and inspection',
      'Lint trap area deep cleaning',
      'Post-cleaning airflow verification',
      'Before/after photos for your records',
      'Written safety report',
      '30-day satisfaction guarantee',
    ],
    benefits: [
      { title: 'Prevents Dryer Fires', desc: 'Removes the #1 cause of home dryer fires according to the U.S. Fire Administration.' },
      { title: 'Cuts Drying Time', desc: 'Restores full airflow so loads dry in one cycle instead of two or three.' },
      { title: 'Lower Energy Bills', desc: 'A clean vent reduces dryer energy use by up to 30% per cycle.' },
      { title: 'Extends Dryer Lifespan', desc: 'Reduces motor strain and heating element wear, adding years of service life.' },
    ],
    process: [
      { title: 'Inspection', desc: 'Technician inspects dryer, vent connection, and exterior termination to identify the full cleaning scope.' },
      { title: 'Setup & Containment', desc: 'We protect your floors and surrounding areas, then disconnect the dryer for full access to the vent.' },
      { title: 'Rotary Brush Cleaning', desc: 'Commercial rotary brush system breaks loose compacted lint while a HEPA vacuum captures all debris.' },
      { title: 'Exterior Verification', desc: 'We clean the exterior vent hood, verify the damper opens correctly, and confirm full airflow.' },
      { title: 'Reassembly & Testing', desc: 'Dryer is reconnected, tested under load, and you receive before/after photos and a written report.' },
    ],
    faqs: [
      { q: 'How often should I have my dryer vent cleaned?', a: 'The National Fire Protection Association recommends professional cleaning at least once per year for most households. Larger families, homes with pets, or properties with long vent runs should clean every 6 months.' },
      { q: 'How long does residential dryer vent cleaning take?', a: 'Most Tampa Bay residential cleanings take 45 to 75 minutes from arrival to completion. Longer or more complex vent runs may extend this to 90 minutes.' },
      { q: 'Do I need to be home for the service?', a: 'Yes, an adult should be present to allow access, sign the work order, and receive the post-service safety report. We can work around your schedule with morning, afternoon, and weekend appointments.' },
      { q: 'Will the cleaning make a mess in my home?', a: 'No. We use containment systems and HEPA vacuums to capture all lint and debris during the cleaning process. Your laundry area will be cleaner when we leave than when we arrived.' },
    ],
  },
  {
    slug: 'commercial-dryer-vent-cleaning',
    name: 'Commercial Dryer Vent Cleaning',
    shortName: 'Commercial Service',
    priceFrom: 0, // custom quote
    intro: 'Commercial dryer vent cleaning serves multi-family buildings, laundromats, hotels, hospitals, gyms, and any facility with high-volume dryer operations. These properties require specialized equipment, scheduled maintenance programs, and detailed compliance documentation that residential services do not provide.',
    description: 'We service apartment complexes, condo associations, laundromats, hotels, senior living facilities, and commercial laundries throughout Tampa Bay. Our commercial program includes scheduled maintenance, compliance reporting, multi-unit pricing, and emergency response for fire risk situations.',
    duration: 'Varies by facility size',
    includes: [
      'Property-wide vent assessment',
      'Multi-unit volume pricing',
      'Scheduled maintenance contracts',
      'NFPA 211 compliance documentation',
      'Insurance and liability reporting',
      'Emergency response availability',
      'After-hours scheduling for tenant comfort',
      'Detailed before/after documentation per unit',
    ],
    benefits: [
      { title: 'Reduce Liability', desc: 'Documented annual cleaning protects property managers from negligence claims after dryer fires.' },
      { title: 'Insurance Compliance', desc: 'Many commercial insurance policies require documented vent maintenance — we provide the records.' },
      { title: 'Tenant Satisfaction', desc: 'Faster drying times and fewer dryer breakdowns improve tenant retention.' },
      { title: 'Bulk Pricing', desc: 'Per-unit pricing drops significantly for properties with 10+ units.' },
    ],
    process: [
      { title: 'Property Walkthrough', desc: 'We assess your facility, document vent locations, and identify access requirements.' },
      { title: 'Custom Quote', desc: 'You receive a detailed quote with per-unit pricing and recommended cleaning frequency.' },
      { title: 'Scheduled Service', desc: 'We coordinate with your property manager to minimize tenant disruption, often working evenings or weekends.' },
      { title: 'Per-Unit Cleaning', desc: 'Each unit receives full vent cleaning with photo documentation and individual completion records.' },
      { title: 'Compliance Report', desc: 'You receive a comprehensive report meeting NFPA 211 documentation standards for insurance and code compliance.' },
    ],
    faqs: [
      { q: 'How often should commercial properties clean dryer vents?', a: 'Multi-family residential properties should be cleaned every 12 months minimum. High-volume facilities like laundromats, hotels, and senior living should clean every 3-6 months depending on usage.' },
      { q: 'Do you offer maintenance contracts?', a: 'Yes. Most of our commercial clients are on annual or semi-annual maintenance contracts that include automatic scheduling, priority response, and 15-25% volume discounts.' },
      { q: 'Can you provide insurance compliance documentation?', a: 'Yes. We provide NFPA 211 compliance reports, photo documentation, and certificates of service that satisfy commercial insurance and property management requirements.' },
      { q: 'Do you work after hours to avoid tenant disruption?', a: 'Yes. We regularly schedule evening and weekend service for occupied units to minimize disruption to residents.' },
    ],
  },
  {
    slug: 'dryer-vent-repair',
    name: 'Dryer Vent Repair',
    shortName: 'Vent Repair',
    priceFrom: 195,
    intro: 'Dryer vent repair addresses damaged, disconnected, kinked, crushed, or improperly installed vent ducting. Common repairs include replacing flexible foil ducting with rigid metal, fixing crushed sections behind the dryer, sealing disconnected joints, and replacing damaged exterior vent hoods.',
    description: 'A clean vent only works if the ducting itself is intact and properly installed. We repair common issues like crushed flex hose, disconnected joints inside walls, damaged exterior hoods, missing dampers, and code violations like screw-pierced ducts that catch lint.',
    duration: '1-3 hours depending on scope',
    includes: [
      'Full vent system inspection',
      'Damaged section replacement',
      'Joint sealing with UL-listed foil tape',
      'Code-compliant material upgrades',
      'Exterior hood replacement if needed',
      'Damper repair or replacement',
      'Post-repair airflow testing',
      'Repair warranty',
    ],
    benefits: [
      { title: 'Code Compliance', desc: 'Bring outdated installations up to current Florida Building Code and NFPA 211 standards.' },
      { title: 'Restored Performance', desc: 'Repairing crushed or kinked sections immediately restores proper airflow and drying performance.' },
      { title: 'Pest Prevention', desc: 'Replacing damaged exterior hoods stops birds, rodents, and insects from nesting in your vent.' },
      { title: 'Insurance Protection', desc: 'Documented repairs protect your homeowner\'s insurance claim eligibility after any dryer-related incident.' },
    ],
    process: [
      { title: 'Diagnostic Inspection', desc: 'We identify all damaged or non-compliant sections of your vent system and document each issue.' },
      { title: 'Repair Quote', desc: 'You receive a clear quote outlining each repair, the materials needed, and the work scope.' },
      { title: 'Repair Work', desc: 'Damaged ducting is replaced with code-compliant rigid metal, joints are sealed with UL-listed foil tape, and exterior components are replaced as needed.' },
      { title: 'Verification', desc: 'Post-repair airflow testing confirms the system meets manufacturer specifications and code requirements.' },
      { title: 'Documentation', desc: 'You receive photos of all repairs and a written warranty on workmanship.' },
    ],
    faqs: [
      { q: 'What are the most common dryer vent repairs?', a: 'The most frequent repairs we perform in Tampa Bay homes are: replacing flexible foil ducting with rigid metal, fixing crushed sections behind the dryer, sealing disconnected joints inside walls, replacing damaged exterior vent hoods, and removing screws that pierce the ducting.' },
      { q: 'Is flexible foil dryer ducting dangerous?', a: 'Yes. Flexible foil and plastic ducting is no longer code-compliant in most jurisdictions because it traps lint in its ridges, can collapse and restrict airflow, and is more flammable than rigid metal alternatives.' },
      { q: 'Can a damaged dryer vent cause a fire?', a: 'Yes. Damaged vents — especially crushed sections, disconnected joints, or pierced ducts — trap lint and restrict airflow. This causes heat to build up in the dryer, creating fire risk even if the lint trap is regularly cleaned.' },
      { q: 'How much does dryer vent repair cost?', a: 'Wall ductwork repair runs $195–$595 depending on scope — replacing a section of flex hose at the dryer connection sits at the low end, while full in-wall ducting replacement through multiple bays sits at the high end. We provide a clear quote with photos before starting any work.' },
    ],
  },
  {
    slug: 'dryer-vent-installation',
    name: 'Dryer Vent Installation',
    shortName: 'New Installation',
    priceFrom: 249,
    intro: 'Dryer vent installation is the design and construction of a new dryer exhaust system, typically required for new home construction, dryer relocations, laundry room additions, or full replacement of unsafe legacy ducting. Proper installation requires routing analysis, code-compliant materials, and precise exterior penetration work.',
    description: 'We install new dryer vent systems for renovations, additions, dryer relocations, and replacements of legacy systems. Every installation uses code-compliant rigid metal ducting, properly sealed joints, and weatherproof exterior terminations engineered for Florida\'s climate.',
    duration: '2-4 hours typical',
    includes: [
      'Vent routing design',
      'Permit assistance if required',
      'Rigid metal ducting throughout',
      'Code-compliant joint sealing',
      'Weatherproof exterior hood with damper',
      'Pest screening',
      'Wall penetration sealing',
      'Final airflow testing',
    ],
    benefits: [
      { title: 'Built to Code', desc: 'New installations meet current Florida Building Code, NFPA 211, and dryer manufacturer specifications.' },
      { title: 'Maximum Efficiency', desc: 'Properly designed routing minimizes bends and length for optimal airflow and shortest drying times.' },
      { title: 'Long-Term Reliability', desc: 'Quality materials and proper installation deliver decades of safe service before requiring replacement.' },
      { title: 'Florida Climate Engineered', desc: 'Exterior components are selected to withstand Florida\'s humidity, salt air, and tropical weather.' },
    ],
    process: [
      { title: 'Site Assessment', desc: 'We evaluate the laundry location, exterior wall options, and routing path to design the most efficient vent path.' },
      { title: 'Design & Quote', desc: 'You receive a routing diagram and detailed quote covering materials, labor, and any required permits.' },
      { title: 'Wall Penetration', desc: 'We cut and weatherproof the exterior penetration with proper flashing and sealants for Florida\'s climate.' },
      { title: 'Ducting Installation', desc: 'Rigid metal ducting is installed with sealed joints, supported every 4 feet per code, and routed to minimize bends.' },
      { title: 'Termination & Testing', desc: 'Code-compliant exterior hood with damper and pest screen is installed, and the system is tested under full dryer load.' },
    ],
    faqs: [
      { q: 'What materials should be used for dryer vent installation?', a: 'Current code requires rigid metal ducting (typically galvanized steel or aluminum) for the entire vent run. Flexible foil and plastic ducting is no longer permitted for permanent installations.' },
      { q: 'What is the maximum dryer vent length allowed?', a: 'Most dryer manufacturers and the International Residential Code limit total vent length to 35 feet, with deductions for each 90-degree bend (typically 5 feet per elbow). Longer runs may require a booster fan.' },
      { q: 'Do I need a permit for new dryer vent installation?', a: 'Permit requirements vary by jurisdiction. In most Tampa Bay areas, simple replacements don\'t require permits, but new installations or relocations involving exterior wall penetrations may. We handle permit research as part of our installation service.' },
      { q: 'Where should the dryer vent terminate outside?', a: 'The exterior termination must be at least 3 feet from any window, door, or air intake. It must include a backdraft damper and pest screen, and discharge directly outside — never into an attic, crawl space, or garage.' },
    ],
  },
  {
    slug: 'dryer-vent-inspection',
    name: 'Free Dryer Vent Inspection',
    shortName: 'Free Inspection',
    priceFrom: 0,
    free: true,
    intro: 'A free dryer vent inspection is a complimentary on-site evaluation of your dryer duct system — camera scope, airflow test, and a written assessment — at no cost and no obligation. The Airflow team offers this as our standard first step so Tampa Bay homeowners get an honest diagnosis before deciding on any cleaning or repair work.',
    description: 'Free, no-pressure diagnostic. Our technician visits your home, runs a camera scope through accessible ducting, measures airflow at the exterior termination, and provides a written assessment with photos. You walk away with an honest picture of your dryer vent — whether it needs cleaning, repair, or nothing at all. No upselling. No quotas. If we find your vent is in good shape, we tell you so.',
    duration: '20-30 minutes',
    includes: [
      'Free camera scope of accessible dryer duct path',
      'Free airflow measurement at exterior termination (calibrated anemometer)',
      'Free visual inspection of vent hood, damper, and termination cap',
      'Free lint accumulation assessment with photos',
      'Free code compliance review (NFPA 211 + Florida Building Code)',
      'Free written assessment delivered same day or next business day',
      'Honest recommendation — including "your vent looks fine" if true',
      'No upsell pressure, no quota-driven recommendations',
    ],
    benefits: [
      { title: 'Zero Cost, Zero Obligation', desc: 'Our complimentary diagnostic gives you real data — camera footage, airflow numbers, photos — without a single dollar at risk.' },
      { title: 'Honest Recommendations', desc: 'No commission quotas. If your vent does not need cleaning, we will tell you. Most franchise inspectors cannot say that.' },
      { title: 'Real Estate + Insurance Ready', desc: 'Free inspection reports satisfy buyer/seller documentation and insurance claim requirements at no cost to you.' },
      { title: 'Confident Decisions', desc: 'See the inside of your dryer duct on camera before you decide what to do next. Information first, sales never.' },
    ],
    process: [
      { title: 'Schedule Your Free Inspection', desc: 'Call (813) 744-1127 or book online — same-week appointments standard across Tampa Bay.' },
      { title: 'On-Site Visit (No Cost)', desc: 'Our technician arrives at the appointment time, introduces themselves, and walks you through the inspection plan.' },
      { title: 'Camera Scope + Airflow Test', desc: 'We scope accessible ducting with a vent camera and measure airflow with a calibrated anemometer — you watch the screen with us.' },
      { title: 'Honest Assessment On-Site', desc: 'We tell you what we found, what is normal, what is concerning, and what is optional. No pressure, no script.' },
      { title: 'Written Report — No Strings', desc: 'You receive a written assessment by email within 24 hours. Take it to another contractor if you want a second opinion. We are confident in our work.' },
    ],
    faqs: [
      { q: 'Is the dryer vent inspection really free?', a: 'Yes. Genuinely free with no obligation. We do not charge a trip fee, a diagnostic fee, or a deposit. The Airflow team offers free inspections because it builds trust — Tampa Bay homeowners can see the inside of their dryer duct on camera before deciding on any cleaning or repair work.' },
      { q: 'What does the free inspection include?', a: 'Camera scope of accessible dryer duct path, calibrated airflow measurement at the exterior termination, visual inspection of vent hood and damper, lint accumulation assessment with photos, NFPA 211 + Florida Building Code compliance check, and a written assessment delivered same day or next business day.' },
      { q: 'Do I have to book cleaning after the inspection?', a: 'No. Zero obligation. If your dryer vent looks fine, we tell you so and leave. If it needs cleaning, we quote the work using our transparent per-foot pricing ($79 for the first 10 feet, +$10/foot after that). The decision is yours.' },
      { q: 'How long does the free inspection take?', a: 'Typically 20-30 minutes on site. Same-week appointments are standard across Tampa Bay; same-day appointments are often available for Hillsborough and Pinellas County addresses.' },
      { q: 'Why do you offer this for free?', a: 'Because most dryer vent quotes happen blind — over the phone, without anyone actually looking at the vent. That is how households get oversold on services they do not need. A free, scope-first inspection means you get real data before you spend a dollar. It is also why we do not pay our technicians on commission.' },
      // PAA-targeted FAQs (Phase 8)
      { q: 'How much does a dryer vent inspection cost?', a: 'In Tampa Bay with Airflow, a dryer vent inspection costs nothing — no trip fee, no diagnostic fee, no deposit. Industry-wide, paid inspections typically run $50–$150. We offer it free because scope-first transparency builds trust faster than a phone quote ever can.' },
      { q: 'Do I need a dryer vent inspection?', a: 'You likely need one if any of these apply: clothes take more than one cycle to dry, the dryer cabinet runs unusually hot, a burning smell appears, it has been more than 12 months since the last professional cleaning, or you are buying or selling a home. Since the inspection is free and takes 20–30 minutes, it is the low-risk way to find out.' },
      // Subtle cross-link to air duct cleaning (per Apr-26 spec — single mention, not aggressive)
      { q: 'Can you also assess my home\'s HVAC air ducts during the inspection?', a: 'Yes. While we are on-site for your free dryer vent inspection, we can do a free assessment of your HVAC air ducts at the same time — same team, same equipment. We count openings, scope a sample run, and quote our $89-per-opening air duct cleaning service if you want it. No obligation either way. See /services/air-duct-cleaning for full details.' },
    ],
  },
  {
    slug: 'air-duct-cleaning',
    name: 'Air Duct Cleaning',
    shortName: 'Air Duct Cleaning',
    priceFrom: 89,
    priceUnit: 'per opening',
    category: 'secondary',
    intro: 'Air duct cleaning is the professional removal of accumulated dust, allergens, and debris from a home\'s HVAC supply ducts, return ducts, registers, and air handler. In Tampa Bay, where humidity, year-round AC operation, and pet density push dust accumulation faster than the national average, NADCA recommends professional cleaning every 3–5 years for typical households. Airflow charges $89 per opening (each supply vent + each return vent) so pricing scales fairly with the actual size of your HVAC system.',
    description: 'Whole-home HVAC duct cleaning following NADCA-aligned protocols: HEPA-filtered negative-air containment, mechanical agitation with rotary brush, supply + return + main trunk cleaning, air handler interior cleaning, register/grille removal and cleaning, before/after photos at every opening, and a written airflow assessment. Per-opening pricing means a small condo pays for 6 openings while a 4-bedroom home pays for 18 — the price reflects the work, not a one-size-fits-all flat fee.',
    duration: '3–5 hours for an average Tampa Bay home (10–12 openings)',
    includes: [
      'Free on-site assessment with opening count + photos',
      'HEPA-filtered negative-air containment setup',
      'Supply duct cleaning (every supply opening, mechanical agitation)',
      'Return duct cleaning (every return opening)',
      'Main trunk line cleaning',
      'Air handler interior cleaning (coils, blower)',
      'Register and grille removal + wash',
      'Before/after photos at every opening',
      'Final airflow measurement + written assessment',
    ],
    benefits: [
      { title: 'Per-Opening Transparency', desc: '$89 per opening — the price scales with your actual HVAC system instead of a flat fee that overcharges small homes.' },
      { title: 'NADCA-Aligned Process', desc: 'We follow the National Air Duct Cleaners Association\'s published cleaning protocols — not a 30-minute drive-by.' },
      { title: 'HVAC Efficiency', desc: 'Clean ducts reduce restriction on your air handler, which lowers electric bills and extends HVAC lifespan.' },
      { title: 'Indoor Air Quality', desc: 'Removes accumulated dust, pet dander, mold spores, and allergens that recirculate through every cycle.' },
    ],
    process: [
      { title: 'Free Assessment', desc: 'Technician arrives, counts supply + return openings, scopes a sample run, photographs current dust load, and provides a per-opening quote on the spot.' },
      { title: 'Containment Setup', desc: 'HEPA-filtered negative-air machine connects to the main trunk; we protect floors and surrounding areas before any work begins.' },
      { title: 'Mechanical Agitation', desc: 'Rotary brush system loosens compacted dust at every opening while the negative-air machine captures the debris.' },
      { title: 'Air Handler Cleaning', desc: 'Interior coils and blower assembly cleaned; visible mold or moisture issues photographed and flagged.' },
      { title: 'Reassembly + Verification', desc: 'Registers and grilles reinstalled, airflow measured at each opening, before/after photos delivered with written assessment.' },
    ],
    faqs: [
      { q: 'How much does air duct cleaning cost in Tampa Bay?', a: 'Airflow charges $89 per opening (each supply vent + each return vent). A small 1–2-bedroom condo with 6–8 openings runs $534–$712. An average 3-bedroom single-family home with 10–12 openings runs $890–$1,068. Larger 4+ bedroom homes with 15–20 openings run $1,335–$1,780. Free on-site assessment counts your home\'s actual openings before any quote.' },
      { q: 'Why is it $89 per opening instead of a flat fee?', a: 'Because every home has a different number of vents. A flat $499 fee either overcharges small condos or undercharges large homes. Per-opening pricing is honest math: you pay for the actual work in your home. Most NADCA-aligned operators price this way; flat fees are a marketing convenience that obscures real cost.' },
      { q: 'How do I know how many openings my home has?', a: 'The free assessment counts them precisely. As a rough guide: 1–2-bedroom condos typically have 6–8 openings, 3-bedroom homes have 10–12, and 4+ bedroom homes have 15–20. Two-story homes have more (separate supply/return per floor). The assessment also catches openings homeowners forget — closets, hallway returns, basement supplies.' },
      { q: 'How long does air duct cleaning take?', a: 'For an average Tampa Bay home (10–12 openings) plan on 3–5 hours from setup through final airflow test. Small condos with 6 openings can finish in 2–3 hours. Larger homes (15–20 openings) take 5–7 hours. This is why we do not recommend any operator who promises a complete air duct cleaning in under 90 minutes — that is a vacuum-only sweep, not a NADCA-aligned cleaning.' },
      { q: 'Is the free assessment really free?', a: 'Yes. Same model as our free dryer vent inspection — no trip fee, no diagnostic fee, no deposit. Our technician counts openings, photographs current dust load inside the trunk, and gives you a written per-opening quote. If you want to think about it, take the photos and quote with you.' },
      { q: 'What is the difference between dryer vent cleaning and air duct cleaning?', a: 'Dryer vent cleaning addresses the single exhaust line from your dryer to the outside termination. Air duct cleaning addresses your home\'s entire HVAC supply and return system — every room\'s vents, the return air ducts, the main trunk lines, and the air handler interior. Different equipment, different scope, different problem. Many homes need both eventually; they are independent decisions.' },
      { q: 'How often should air ducts be cleaned?', a: 'NADCA recommends every 3–5 years for typical households. Tampa Bay homes lean toward the 3-year end of that range because of humidity (mold/mildew growth potential) and 11-month AC season (continuous dust circulation). Households with pets, smokers, or recent renovation work should consider every 2–3 years. After mold or water damage, schedule cleaning before running the HVAC again.' },
      { q: 'Will my AC work better after air duct cleaning?', a: 'For most homes, yes. Restricted ducts force the blower to work harder, raise electric bills, and shorten compressor lifespan. Cleaner ducts let the system breathe at design specifications. The biggest gains show up in homes that have not been cleaned in 5+ years, after major renovation, or after pet hair has been accumulating for years.' },
      { q: 'Do you sanitize the ducts too?', a: 'Sanitization is an optional add-on, priced separately based on system size. We do not recommend it for every job — most homes do not need it. Sanitization makes sense after mold remediation, after pest infestation in the duct system, or in homes with severe allergy concerns. We will tell you honestly during the assessment whether your home is a candidate.' },
      { q: 'What about mold in my air ducts?', a: 'If we find visible mold during the assessment, we photograph it, show you, and discuss next steps. Light surface mold is often handled during cleaning + sanitization. Heavy mold growth typically requires a separate mold remediation specialist before duct cleaning is appropriate. We will refer you to qualified Tampa Bay mold remediators rather than overstep — that is not our specialty.' },
      { q: 'Will you make a mess in my home?', a: 'No. The HEPA-filtered negative-air containment is designed specifically to prevent dust from escaping the duct system into your living space during cleaning. Floors near each opening are protected with drop cloths. By the time we leave, your home should be cleaner than when we arrived — that is the entire point of professional duct cleaning.' },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
