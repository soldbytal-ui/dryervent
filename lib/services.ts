export type Service = {
  slug: string;
  name: string;
  shortName: string;
  priceFrom: number;
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
    priceFrom: 99,
    intro: 'Residential dryer vent cleaning is the professional removal of accumulated lint, debris, and obstructions from the entire dryer exhaust system — from the dryer connection through interior ducting to the exterior vent termination. Most Tampa Bay homes need this service annually to prevent fire hazards and restore dryer efficiency.',
    description: 'Our residential service uses commercial-grade rotary brush systems and high-CFM vacuum equipment to clear every section of your vent line. Unlike DIY methods or basic shop vacuums, professional cleaning reaches the full length of the duct — including bends, vertical runs, and exterior hood — where lint accumulates most dangerously.',
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
    priceFrom: 149,
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
      { q: 'How much does dryer vent repair cost?', a: 'Repairs typically range from $149 for simple fixes like replacing a section of flex hose to $400+ for full ducting replacement through walls or ceilings. We provide a clear quote before starting any work.' },
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
    name: 'Dryer Vent Inspection',
    shortName: 'Vent Inspection',
    priceFrom: 149,
    intro: 'A dryer vent inspection is a professional evaluation of your dryer exhaust system to identify safety hazards, code violations, blockages, damage, and efficiency problems. Inspections are commonly requested for home purchases, insurance claims, post-fire safety verification, and as preventive maintenance.',
    description: 'Our inspection service identifies every issue in your vent system without performing cleaning or repairs. This service is ideal for home buyers, sellers, insurance documentation, post-incident investigation, or homeowners wanting to know exactly what shape their vent is in before deciding on cleaning or repair.',
    duration: '30-45 minutes',
    includes: [
      'Visual inspection of full vent path',
      'Camera inspection of accessible ducting',
      'Airflow measurement at exterior termination',
      'Lint accumulation assessment',
      'Code compliance review',
      'Material and connection evaluation',
      'Detailed written report with photos',
      'Repair and cleaning recommendations',
    ],
    benefits: [
      { title: 'Real Estate Documentation', desc: 'Buyer or seller inspection reports provide objective documentation for transactions.' },
      { title: 'Insurance Claims', desc: 'Post-incident inspections support insurance claim documentation and root cause analysis.' },
      { title: 'Informed Decisions', desc: 'Know exactly what your vent system needs before committing to cleaning or repair work.' },
      { title: 'Code Verification', desc: 'Confirm whether your installation meets current Florida Building Code and NFPA standards.' },
    ],
    process: [
      { title: 'External Assessment', desc: 'Inspector examines exterior termination, hood, damper, and surrounding wall condition.' },
      { title: 'Internal Inspection', desc: 'Dryer is moved out and the vent connection, transition hose, and accessible ducting are evaluated.' },
      { title: 'Camera Inspection', desc: 'Where accessible, a vent inspection camera is used to view the interior of ducting and identify hidden issues.' },
      { title: 'Airflow Testing', desc: 'Anemometer measurement at the exterior termination quantifies actual airflow versus manufacturer specification.' },
      { title: 'Written Report', desc: 'You receive a detailed report with photos, measurements, code compliance status, and prioritized recommendations.' },
    ],
    faqs: [
      { q: 'When should I get a dryer vent inspection?', a: 'Common reasons include: before buying or selling a home, after a dryer fire or near-miss, when symptoms like long dry times or burning smells appear, when changing insurance policies, or annually as preventive maintenance.' },
      { q: 'What does a dryer vent inspection report include?', a: 'Our reports include the inspection date, vent system layout diagram, airflow measurements, identified issues with photos, code compliance assessment, and prioritized recommendations for cleaning or repair.' },
      { q: 'Can an inspection find hidden problems?', a: 'Yes. Camera inspection of accessible ducting and airflow measurement at the exterior termination can identify blockages, damage, and improper installations that aren\'t visible from a basic visual check.' },
      { q: 'Is the inspection fee credited toward cleaning if I book it?', a: 'Yes. If you choose to schedule cleaning or repair work after your inspection, we credit the full inspection fee toward that service.' },
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
