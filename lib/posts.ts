export type BodySection =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'faq'; items: { q: string; a: string }[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  body?: BodySection[];
  metaTitle?: string;
  metaDescription?: string;
  internalLinks?: { href: string; label: string }[];
};

export const posts: Post[] = [
  {
    slug: 'dryer-takes-too-long-to-dry',
    title: 'Why Is Your Dryer Taking Too Long to Dry? 7 Causes (And How to Fix Them)',
    excerpt:
      'Dryer taking forever to dry clothes? Here are the 7 most common causes — from clogged vents to failing heating elements — and how the Airflow team in Tampa Bay diagnoses each one.',
    date: '2026-04-18',
    readTime: '8 min',
    category: 'Troubleshooting',
    metaTitle: 'Dryer Takes Too Long to Dry? 7 Causes & Fixes (Tampa Bay)',
    metaDescription:
      '7 reasons your dryer takes too long to dry clothes — clogged vents, failing elements, bad fuses, humidity. Tampa Bay diagnostics from Airflow Dryer Vent Cleaning. Free inspection.',
    internalLinks: [
      { href: '/services/dryer-vent-cleaning', label: 'Dryer Vent Cleaning' },
      { href: '/services/free-inspection', label: 'Free Vent Inspection' },
      { href: '/areas/tampa', label: 'Tampa Service Area' },
      { href: '/areas/st-petersburg', label: 'St. Petersburg Service Area' },
    ],
    body: [
      {
        type: 'p',
        text: 'A dryer that takes too long to dry is the most common laundry-room complaint we hear in Tampa Bay — and in nearly every case, the dryer itself is not the real problem. When a normal 45-minute cycle stretches into 90 minutes (or two full cycles for a single load), the appliance is fighting an airflow restriction it was never engineered to overcome. The drum still tumbles. The heating element still glows. But the moist air has nowhere to go, so clothes come out warm, damp, and wrinkled.',
      },
      {
        type: 'p',
        text: 'In Tampa Bay specifically, this problem shows up faster and more aggressively than in drier climates. Florida humidity sits at 70–90% for most of the year, your AC runs nearly year-round, and laundry rooms tend to be tucked into garages or interior closets where the air is already moisture-saturated. That combination compacts lint inside the dryer duct three to four times faster than the national average — which is why the Airflow team books more "long-dry-time" diagnostic visits in Tampa, St. Petersburg, and Clearwater between June and October than at any other time of year.',
      },
      { type: 'h2', text: 'The 7 Most Common Causes of a Slow-Drying Dryer' },

      { type: 'h3', text: '1. Clogged Dryer Vent (the #1 Cause — Roughly 8 in 10 Cases)' },
      {
        type: 'p',
        text: 'Roughly 80% of the slow-dry calls our certified technicians take in Tampa Bay trace back to a clogged dryer vent. Lint is the byproduct of every cycle, and even with a perfectly clean lint trap, fine fibers escape past the screen, ride the moist exhaust through the dryer duct, and slowly plate the inside walls. As the layer thickens, the cross-section of the duct narrows, and the dryer\'s blower has to push hot, wet air through a smaller and smaller tunnel. The physics is simple: less airflow means less moisture removed per minute, which means longer cycles, hotter dryer cabinets, and eventually a fire risk.',
      },
      {
        type: 'p',
        text: 'Lint compaction is not linear — it is exponential. The first 1/8" of buildup barely affects performance, but once the duct is 50% restricted, cycle times can double overnight. Every elbow, transition, and roof vent termination is a compaction point, and many Tampa Bay homes have 25–40 feet of duct with three or more bends. That is a lot of opportunity for lint to settle.',
      },
      {
        type: 'ul',
        items: [
          'Symptom signature: clothes still damp after one cycle, exterior vent flap barely moves, dryer cabinet is hot to the touch.',
          'Fix: professional dryer vent cleaning — $79 for the first 10 feet plus $10 per additional foot, most Tampa Bay homes fall in the $79–$249 range.',
          'Free first step: Airflow offers a free, no-obligation camera-scope inspection so you know whether you actually need cleaning before you spend a dollar.',
          'Call (813) 744-1127 — most jobs are completed in a single visit, often same-day.',
        ],
      },

      { type: 'h3', text: '2. Failing Heating Element' },
      {
        type: 'p',
        text: 'If your dryer drum still tumbles but the air feels cool or only lukewarm, the heating element (electric dryers) or igniter/gas valve assembly (gas dryers) may be partially failed. A heating element does not always die all at once — coils can short or burn through in a single spot, dropping the dryer\'s output from 5,400 watts to 2,700 watts. Cycles still complete, but they take twice as long because half the heat is missing.',
      },
      {
        type: 'ul',
        items: [
          'Symptom signature: long cycles plus cool or lukewarm exhaust at the exterior vent.',
          'How to test: a multimeter continuity check on the element terminals. DIY-capable for handy homeowners; otherwise call an appliance repair tech.',
          'Important: a clogged dryer vent will eventually burn out a healthy heating element by trapping heat inside the cabinet — so always rule out the vent first.',
        ],
      },

      { type: 'h3', text: '3. Bad Thermal Fuse or Cycling Thermostat' },
      {
        type: 'p',
        text: 'The thermal fuse is a one-time safety device that blows when cabinet temperature exceeds spec. A blown thermal fuse usually means no heat at all — but a partially failed cycling thermostat (which switches the heating element on and off to maintain temperature) can cause irregular heating that stretches dry times. Like the heating element, these parts often fail because a restricted dryer duct caused chronic overheating in the first place.',
      },
      {
        type: 'ul',
        items: [
          'Symptom signature: intermittent heat, dryer shuts off mid-cycle and resumes when cool.',
          'Fix: appliance repair technician — typical $150–$350 part + labor.',
          'Prevention: keep the vent clean. A clogged dryer duct is the leading cause of premature thermostat failure.',
        ],
      },

      { type: 'h3', text: '4. Overloaded Dryer' },
      {
        type: 'p',
        text: 'Modern high-capacity dryers tempt homeowners to wash and dry king-sized comforters, two beach towels, and a load of jeans all at once. The drum may technically hold the load, but a packed drum prevents the heated air from circulating around each garment. The dryer then runs cycle after cycle while the inner layers stay damp.',
      },
      {
        type: 'ul',
        items: [
          'Rule of thumb: drum should be no more than 3/4 full, with room for clothes to tumble freely.',
          'Bulky items (comforters, mattress pads, large beach towels): dry alone, not mixed with regular laundry.',
          'Free DIY fix — no service call needed.',
        ],
      },

      { type: 'h3', text: '5. Damp Climate and AC Interference (Tampa-Specific!)' },
      {
        type: 'p',
        text: 'This one is unique to Florida. When your laundry room sits inside the conditioned envelope of the house — a closet off the hallway, a garage with a wall AC unit, an interior utility room — the dryer pulls in air that is already 72°F and 55% relative humidity. That cool, moist intake air has less drying capacity than the 90°F outside air a Midwestern dryer breathes. Combine that with a partially restricted dryer duct, and you can see how Tampa Bay cycle times balloon.',
      },
      {
        type: 'ul',
        items: [
          'Make-up air matters: dryers need to pull replacement air from somewhere. A tightly sealed laundry closet can starve the dryer of intake air.',
          'During hurricane season prep, never seal the dryer vent or block the laundry room return.',
          'If your laundry is in the garage, leave the door cracked or install a louvered door to allow air exchange.',
        ],
      },

      { type: 'h3', text: '6. Clogged Lint Trap or Trap Housing' },
      {
        type: 'p',
        text: 'Most homeowners clean the lint screen between loads. Far fewer ever clean the cavity behind the screen — the trap housing. Fabric softener residue, dryer-sheet film, and fine fibers slowly coat the screen mesh and pack the housing walls, choking off airflow before air ever reaches the dryer duct.',
      },
      {
        type: 'ul',
        items: [
          'Once a month: rinse the lint screen with warm water and a soft brush to remove fabric-softener film.',
          'Once a year: vacuum the lint trap housing with a long crevice tool or a dryer-vent vacuum kit.',
          'A choked trap housing can mimic every symptom of a clogged dryer vent — our free inspection identifies which one is actually the problem.',
        ],
      },

      { type: 'h3', text: '7. Damaged or Kinked Vent Duct' },
      {
        type: 'p',
        text: 'Behind every dryer is a transition duct that connects the appliance to the wall. If that duct is the old plastic-foil accordion style — or even a semi-rigid foil duct that has been crushed when the dryer was pushed back against the wall — airflow drops dramatically. Pinched or collapsed transition ducts are the second-most-common cause of slow drying after compaction inside the in-wall dryer duct.',
      },
      {
        type: 'ul',
        items: [
          'Pull the dryer out 6 inches and inspect the transition hose for crushing, kinks, or holes.',
          'Replace plastic-foil ducting with semi-rigid aluminum (code-compliant per IRC M1502.4.2).',
          'If the in-wall duct is damaged, our team handles wall-cavity dryer duct repair from $195–$595 depending on access.',
        ],
      },

      { type: 'h2', text: 'When to DIY vs Call a Pro' },
      {
        type: 'p',
        text: 'Some causes on this list are genuinely DIY-friendly. Others are not — and trying to clean a long, multi-elbow dryer duct with a hardware-store brush kit usually pushes lint deeper into the system rather than removing it. Here is the honest breakdown the Airflow team gives every Tampa Bay homeowner who calls.',
      },
      {
        type: 'ul',
        items: [
          'DIY-safe: cleaning the lint screen and trap housing, shrinking your load size, swapping a kinked transition hose.',
          'DIY with caution: testing a thermal fuse or heating element with a multimeter (only if you are comfortable with appliance repair).',
          'Call a pro: any cleaning of the in-wall dryer duct, roof vent terminations, second-story vent runs, or anything involving the wall cavity. Hardware-store brush kits typically remove only 30–40% of compacted lint and can break off inside long runs.',
          'Always call a pro if you smell burning. That is a same-day call to (813) 744-1127.',
        ],
      },

      { type: 'h2', text: 'Why Tampa Bay Homes See This Problem More Than the National Average' },
      {
        type: 'p',
        text: 'The combination of year-round humidity, daily AC operation, and frequent dryer cycles means lint inside Tampa Bay dryer ducts compacts roughly three to four times faster than in low-humidity regions. National guidance from NFPA 211 recommends cleaning at least once per year — but our service data across Tampa, St. Petersburg, Clearwater, Brandon, and the surrounding communities consistently shows that homes going 18+ months without cleaning are the ones experiencing the longest dry times and the highest fire risk. If you live in a two-story home with a vent run that goes up through interior walls and out the roof, plan on every 9 months. Vacation rentals and Airbnbs near the beaches: every 3–6 months due to back-to-back guest laundry.',
      },

      { type: 'h2', text: 'What to Do Right Now' },
      {
        type: 'p',
        text: 'If your dryer has been taking too long to dry for more than a couple of weeks, the safest and cheapest first step is to find out exactly why. Airflow Dryer Vent Cleaning offers a free, no-obligation inspection in Tampa Bay — our certified technicians camera-scope your dryer duct, measure airflow at the exterior vent, and give you a written assessment of whether you need cleaning, repair, or nothing at all. Call (813) 744-1127 or book online. Most diagnostic visits are completed within 30 minutes and same-day appointments are usually available.',
      },

      {
        type: 'faq',
        items: [
          {
            q: 'How long should one dryer cycle take?',
            a: 'A typical normal-load cycle should complete in 30–45 minutes. Heavy items like towels or jeans can run 45–60 minutes. Anything longer than that — or needing a second cycle to fully dry — almost always points to a clogged dryer vent, a kinked transition duct, or a partially failed heating element. The Airflow team in Tampa Bay sees roughly 80% of "too long to dry" calls trace back to a restricted dryer duct.',
          },
          {
            q: 'Can a long-dry-time dryer cause a fire?',
            a: 'Yes. According to NFPA, failure to clean the dryer vent is the #1 cause of the roughly 2,900 home clothes-dryer fires reported each year in the U.S. When airflow is restricted, the cabinet overheats, lint inside the duct dries to tinder, and the heating element runs hotter than designed. If your dryer is taking too long to dry — and especially if you smell anything burning — stop using it and call a professional. (813) 744-1127 for same-day Tampa Bay service.',
          },
          {
            q: 'Will cleaning my vent really fix this?',
            a: 'In about 8 out of 10 Tampa Bay homes, yes. A professional cleaning of the dryer duct restores full airflow, drops cycle times back to 30–45 minutes, and lowers the cabinet temperature so the heating element and thermal fuse stop being stressed. In the other 20% of cases, the long dry time is caused by an appliance issue (heating element, thermostat) or a damaged duct — and our free inspection identifies which one before you commit to anything.',
          },
          {
            q: 'How much does dryer vent cleaning cost in Tampa?',
            a: 'Airflow charges $79 for the first 10 feet of dryer duct plus $10 per additional foot. Most Tampa Bay single-family homes fall in the $79–$249 range. Wall-cavity duct repair, if needed, runs $195–$595 depending on access. The initial inspection is always free with no obligation — call (813) 744-1127.',
          },
        ],
      },
    ],
  },

  {
    slug: 'signs-dryer-vent-is-clogged',
    title: '10 Warning Signs Your Dryer Vent Is Clogged (Don\'t Ignore #3)',
    excerpt:
      'Is your dryer showing warning signs? Here are the 10 most common symptoms of a clogged dryer vent — from longer drying times to burning smells — explained by Tampa\'s Airflow team.',
    date: '2026-04-15',
    readTime: '9 min',
    category: 'Safety',
    metaTitle: '10 Signs Your Dryer Vent Is Clogged (Tampa Safety Guide)',
    metaDescription:
      '10 warning signs your dryer vent is clogged — burning smells, long dry times, hot dryer surfaces. NFPA-cited safety guide from Airflow Dryer Vent Cleaning, Tampa Bay. Free inspection.',
    internalLinks: [
      { href: '/services/dryer-vent-cleaning', label: 'Dryer Vent Cleaning' },
      { href: '/services/free-inspection', label: 'Free Vent Inspection' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/areas/tampa', label: 'Tampa Service Area' },
      { href: '/areas/brandon', label: 'Brandon Service Area' },
    ],
    body: [
      {
        type: 'p',
        text: 'According to the National Fire Protection Association (NFPA), U.S. fire departments respond to roughly 2,900 home clothes-dryer fires every year — and failure to clean the dryer vent is the #1 contributing factor. NFPA 211, the consensus standard for chimneys, fireplaces, and venting systems, has long identified lint accumulation in the dryer duct as a leading ignition hazard. The painful part is that a clogged dryer vent gives plenty of warning before it ever ignites. Most homeowners just do not know what to look for.',
      },
      {
        type: 'p',
        text: 'In Tampa Bay, the warning signs show up faster than the national average. Florida humidity (70–90% for most of the year), year-round AC operation, and laundry rooms tucked inside the conditioned envelope of the house all accelerate lint compaction inside the dryer duct. The Airflow team has cleaned more than 15,000 vents across Tampa, St. Petersburg, Clearwater, Brandon, and surrounding communities — and these are the 10 warning signs we see again and again, in the order they typically appear.',
      },

      { type: 'h2', text: 'The 10 Warning Signs of a Clogged Dryer Vent' },

      { type: 'h3', text: '1. Clothes Take More Than One Cycle to Dry' },
      {
        type: 'p',
        text: 'This is almost always the first symptom. A normal load that used to come out dry in 40 minutes now needs 70 — or a full second cycle. The dryer is not broken; it is choking. Restricted airflow inside the dryer duct means moist exhaust cannot escape, so each cycle removes a fraction of the water it used to. If you have started routinely "topping off" loads with a second 20-minute spin, your vent is the culprit in roughly 80% of cases.',
      },

      { type: 'h3', text: '2. Dryer or Laundry Room Feels Unusually Hot' },
      {
        type: 'p',
        text: 'A properly venting dryer pushes 95% of its heat outside through the duct. A clogged duct traps that heat inside the cabinet and the surrounding room. If your laundry room is suddenly 8–12°F warmer than the rest of the house during a dryer cycle, the heat that should be exiting through the dryer duct is staying behind — and so is the moisture.',
      },

      { type: 'h3', text: '3. Burning Smell (Don\'t Ignore — Call Same-Day)' },
      {
        type: 'p',
        text: 'This is the warning sign you cannot ignore. A burning smell during a dryer cycle means lint inside the dryer duct is hot enough to scorch. The next stop on that thermal curve is ignition. If you smell anything that resembles burning fabric, hot electronics, or sweet/acrid plastic during or right after a cycle: stop using the dryer immediately, unplug it (or shut off the gas), and call (813) 744-1127. Airflow keeps same-day diagnostic slots open in Tampa Bay specifically for this call.',
      },

      { type: 'h3', text: '4. Lint Visible Around Dryer Hose or Exterior Vent' },
      {
        type: 'p',
        text: 'Walk outside and look at your exterior dryer vent termination. If you see lint clinging to the vent hood, the siding around it, or piling up on the ground beneath it, your duct is leaking lint at the seams or at the termination flap. Often this means the in-wall dryer duct has a separated joint or a damaged section that needs sealing or replacement.',
      },

      { type: 'h3', text: '5. Exterior Vent Flap Doesn\'t Open When Running' },
      {
        type: 'p',
        text: 'Have someone start a dryer cycle while you stand at the exterior vent. The louvered flap (or shutter on a hooded vent) should swing open under the force of the exhaust airflow. If it barely flutters — or stays completely closed — there is not enough airflow making it out of the duct. This is a free, 30-second test every Tampa Bay homeowner should do at least once a year.',
      },

      { type: 'h3', text: '6. Drying Time Has Increased Gradually Over Months' },
      {
        type: 'p',
        text: 'Lint compaction is gradual. You may not notice that an average load now takes 55 minutes instead of the 40 it took a year ago — until you stop and add it up. If you are running 30% more dryer time than you used to, your dryer duct is roughly 30% restricted. The good news: a single professional cleaning typically restores full airflow in one visit.',
      },

      { type: 'h3', text: '7. Top of Dryer Is Hot to the Touch' },
      {
        type: 'p',
        text: 'Place your hand on top of the dryer cabinet during a cycle. It should feel warm, not hot. If you cannot comfortably leave your hand on the surface, internal cabinet temperatures are likely well above the 135°F target. That stresses the heating element, the cycling thermostat, and the thermal fuse — all because the dryer duct is not letting heat escape.',
      },

      { type: 'h3', text: '8. Dryer Shuts Off Mid-Cycle (Auto-Shutoff)' },
      {
        type: 'p',
        text: 'Modern dryers have a safety thermostat that kills power when cabinet temperature exceeds spec. If your dryer is shutting itself off and resuming when it cools down, the auto-shutoff is doing its job — protecting you from the underlying problem. That problem is almost always a clogged dryer duct. Continued operation in this state is what eventually blows the thermal fuse outright.',
      },

      { type: 'h3', text: '9. Excessive Humidity in the Laundry Room' },
      {
        type: 'p',
        text: 'A pound of dry clothes goes into the dryer holding roughly half a pound of water. All of that moisture is supposed to leave through the dryer duct. When the duct is restricted, that moisture leaks out into the laundry room — fogging windows, dampening drywall, and over months, creating mildew on baseboards and behind cabinets. Florida laundry rooms are already moisture-prone; a clogged vent makes it dramatically worse.',
      },

      { type: 'h3', text: '10. Visible Lint on Outside of Clothes After Drying' },
      {
        type: 'p',
        text: 'When airflow drops, lint that should ride out through the dryer duct instead settles back onto the load. If your dark clothes are coming out fuzzier than they used to — or you are finding lint stuck to socks and pants that did not have it before — your vent is restricted enough that the dryer cannot fully evacuate the lint it is producing.',
      },

      { type: 'h2', text: 'Why You Shouldn\'t Wait' },
      {
        type: 'p',
        text: 'Every one of these warning signs points back to the same root cause — and the longer you let a clogged dryer duct go uncleaned, the bigger the consequences get. A clog that started as a 10-minute longer cycle becomes a fire risk, a $400 heating element failure, or a $250 utility bill spike. Here is what is actually at stake:',
      },
      {
        type: 'ul',
        items: [
          'Fire risk: NFPA reports roughly 2,900 home clothes-dryer fires per year, with failure to clean the vent as the #1 cause. NFPA 211 specifies regular inspection and cleaning of dryer ducts as the primary mitigation.',
          'Energy cost: a restricted dryer duct can increase electricity use by 25–40% per cycle. That is $15–$30 per month of avoidable cost in a typical Tampa Bay household.',
          'Appliance lifespan: heating elements, cycling thermostats, and thermal fuses all fail prematurely when forced to run hotter than spec. A neglected vent commonly cuts dryer lifespan from 13 years to 7–8.',
          'Insurance: many Florida homeowners policies require documentation of regular dryer-vent maintenance for fire-claim coverage.',
        ],
      },

      { type: 'h2', text: 'What a Free Inspection Reveals' },
      {
        type: 'p',
        text: 'Airflow offers a no-obligation, free dryer vent inspection across Tampa Bay. Our certified technicians camera-scope the dryer duct from the appliance to the exterior termination, measure airflow at the vent hood, and give you a written assessment of what they found. If your vent is clean and your airflow is healthy, we tell you so — and we leave. No upsell, no pressure. If your vent does need cleaning or repair, you get an exact quote on the spot. Most inspections take 20–30 minutes.',
      },

      { type: 'h2', text: 'Tampa Bay Pricing for the Fix' },
      {
        type: 'p',
        text: 'Standard residential dryer vent cleaning is $79 for the first 10 feet plus $10 per additional foot. Most single-family Tampa Bay homes fall in the $79–$249 range depending on duct length and access. If the inspection turns up a damaged in-wall section or a collapsed roof termination, wall-cavity dryer duct repair runs $195–$595 depending on the work required. The inspection itself is always free, and quotes are firm — no surprise charges. Call (813) 744-1127 to schedule.',
      },

      {
        type: 'faq',
        items: [
          {
            q: 'How quickly do I need to act on a burning smell?',
            a: 'Same day. A burning smell during a dryer cycle means lint inside the dryer duct is hot enough to scorch — the next step on that thermal curve is ignition. Stop using the dryer immediately, unplug it (or shut off the gas supply), and call (813) 744-1127. The Airflow team holds same-day slots in Tampa Bay specifically for burning-smell calls.',
          },
          {
            q: 'Can I keep using my dryer if I see warning signs?',
            a: 'For most warning signs (longer dry times, hot cabinet, lint at the exterior vent), short-term use is reasonable while you book a cleaning — but every additional cycle adds compacted lint and stress on the heating element. For a burning smell, an auto-shutoff event, or visible scorching, stop using the dryer immediately. Per NFPA 211 guidance, a known restricted dryer duct should be remediated before continued operation.',
          },
          {
            q: 'Will the free inspection tell me if I need cleaning or repair?',
            a: 'Yes. Our certified technicians camera-scope the entire dryer duct, measure airflow at the exterior termination, and give you a written assessment that distinguishes between standard cleaning ($79–$249) and wall-cavity repair ($195–$595). If your vent is clean and airflow is healthy, we tell you that too and leave. No obligation, no upsell.',
          },
          {
            q: 'How often should I clean my dryer vent in Florida?',
            a: 'NFPA 211 recommends at least once per year. In Tampa Bay specifically — because of humidity, year-round AC operation, and faster lint compaction — the Airflow team typically recommends every 9–12 months for single-family homes, every 6 months for households with pets or large families, and every 3–6 months for vacation rentals and Airbnbs.',
          },
        ],
      },
    ],
  },

  {
    slug: 'how-often-clean-dryer-vent-florida',
    title: 'How Often Should You Clean Your Dryer Vent? The Florida Homeowner\'s Guide',
    excerpt:
      'Most experts say annually, but Florida homes need cleaning more often. Tampa Bay humidity, AC runtime, and lint accumulation patterns explained by the Airflow team.',
    date: '2026-04-12',
    readTime: '10 min',
    category: 'Maintenance',
    metaTitle: 'How Often to Clean Your Dryer Vent in Florida (Tampa Bay Guide)',
    metaDescription:
      'NFPA 211 says annually — but Florida humidity, AC runtime, and lint compaction mean Tampa Bay homes often need cleaning every 6–9 months. Frequency by home type, with free inspection.',
    internalLinks: [
      { href: '/services/free-inspection', label: 'Free Vent Inspection' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/areas/tampa', label: 'Tampa Service Area' },
      { href: '/areas/st-petersburg', label: 'St. Petersburg Service Area' },
      { href: '/areas/clearwater', label: 'Clearwater Service Area' },
    ],
    body: [
      {
        type: 'p',
        text: 'How often should you clean your dryer vent? The standard U.S. recommendation, set by NFPA 211 (the National Fire Protection Association consensus standard for chimneys, fireplaces, and venting systems), is at least once per year for a typical single-family home. That guidance is the floor, not the ceiling — and for Florida homeowners, especially in the Tampa Bay region, once a year is often not enough.',
      },
      {
        type: 'p',
        text: 'Florida homes accumulate lint faster than the national average for three measurable reasons: ambient humidity sits at 70–90% for most of the year, AC runs nearly year-round which keeps laundry-room intake air cool and moist, and many homes here run more dryer cycles per week (beach towels, pool towels, gym clothes, kids\' sports gear). The Airflow team has cleaned more than 15,000 dryer vents across Tampa, St. Petersburg, Clearwater, Brandon, and surrounding communities — and our service data consistently shows that Florida lint compacts inside the dryer duct three to four times faster than in low-humidity regions like Arizona or Colorado.',
      },

      { type: 'h2', text: 'Why Florida Homes Need More Frequent Cleaning Than the National Average' },
      {
        type: 'p',
        text: 'The NFPA 211 "annual minimum" recommendation was developed for an average U.S. household — moderate humidity, seasonal AC, two to four loads of laundry per week. Florida households deviate from that baseline in nearly every variable. Here is what makes Tampa Bay different:',
      },
      {
        type: 'ul',
        items: [
          'Humidity: 70–90% relative humidity year-round means the moist exhaust traveling through your dryer duct condenses on cooler walls more readily, giving lint a sticky surface to adhere to.',
          'Year-round AC: laundry rooms inside the conditioned envelope of the home pull intake air at 72°F and 55% RH — air that has less drying capacity than the warmer, drier intake air a Midwestern dryer would breathe.',
          'Higher cycle frequency: beach towels, pool towels, gym clothes, and kids\' sports gear push the average Tampa Bay home to 6–10 loads per week vs. the U.S. average of 4–5.',
          'Coastal sand: homes within a few miles of the Gulf accumulate fine sand that mixes with lint and accelerates compaction inside the dryer duct.',
          'Pet density: Florida has one of the highest pet-ownership rates in the country, and pet hair binds with lint into denser mats that brush kits cannot remove.',
          'Snowbird seasonal patterns: northern owners who run their dryer hard for 4–5 months and leave the home empty for the rest of the year create a stop-start usage profile that traps moisture inside the duct during off-months.',
          'Agricultural particulate: communities like Plant City, Dover, and parts of east Hillsborough see seasonal field dust that gets pulled into laundry-room intake air and adds to the lint mix.',
        ],
      },

      { type: 'h2', text: 'Recommended Cleaning Frequency by Home Type' },

      { type: 'h3', text: 'Standard Single-Family Home' },
      {
        type: 'p',
        text: 'Annual minimum, per NFPA 211. In Tampa Bay specifically, the Airflow team recommends every 9–12 months as the baseline. If you have pets that shed, a household of four or more, or a teenager who washes a load every other day, move that to every 6–9 months. The vast majority of single-family Tampa Bay homes fall into this category, and a single professional cleaning of the dryer duct typically restores full airflow in one visit.',
      },

      { type: 'h3', text: '2-Story Home with Long Vent Runs' },
      {
        type: 'p',
        text: 'Every 9 months. Two-story floor plans where the laundry is upstairs typically have 25–40 feet of dryer duct with three or more bends — every elbow is a high-velocity compaction point where lint piles up first. The longer the run, the faster the restriction develops. New Tampa, Westchase, and FishHawk-area homes commonly fall into this category.',
      },

      { type: 'h3', text: 'Condo or Townhouse' },
      {
        type: 'p',
        text: 'Annual for owner-occupied units; semiannual (every 6 months) for vacation rental conversions. Many Tampa, St. Petersburg, and Clearwater Beach condos share roof-line vent terminations, which means restrictions in your unit can also affect neighbors. Check with your HOA — some buildings now require documented annual cleaning for insurance purposes.',
      },

      { type: 'h3', text: 'Mobile Home' },
      {
        type: 'p',
        text: 'Every 12 months. Mobile-home dryer ducts tend to be shorter (often a straight 4–8 ft run through a side wall) but use less rigid materials and offer less access for inspection. The shorter run helps; the access issues mean a professional cleaning is usually faster but slightly more involved. Plan on annual at minimum.',
      },

      { type: 'h3', text: 'Vacation Rental or Airbnb' },
      {
        type: 'p',
        text: 'Every 3–6 months. Back-to-back guest laundry — sheets, towels, and the inevitable beach gear — runs the dryer at 4–6x the rate of an owner-occupied home. Vacation-rental managers in St. Pete Beach, Clearwater Beach, Indian Rocks, and Madeira Beach who have switched to a quarterly cleaning schedule consistently report fewer maintenance complaints, longer dryer lifespan, and stronger insurance compliance documentation.',
      },

      { type: 'h3', text: '55+ Retirement Community' },
      {
        type: 'p',
        text: 'Annual is usually sufficient, but the small frequent loads typical in retirement households compound differently than large weekly loads. Many residents do a single load every day or two — which adds up to similar total usage as a four-person family but with longer warm-cool cycles between runs. Those warm-cool cycles deposit moisture inside the dryer duct each time, which accelerates compaction. Annual cleaning is the floor; ask for a free inspection at month 9 to see whether you can stretch it.',
      },

      { type: 'h3', text: 'Multi-Generational Household' },
      {
        type: 'p',
        text: 'Every 6 months. Households with grandparents, parents, kids, and possibly grandkids under one roof typically run 8–12 loads per week. At that rate, the dryer duct accumulates a year\'s worth of compaction in roughly six months. A semiannual schedule keeps the system clean and prevents the longer-dry-time / hot-cabinet / fire-risk progression from ever starting.',
      },

      { type: 'h2', text: 'Seasonal Timing — When Tampa Bay Homeowners Book' },
      {
        type: 'p',
        text: 'Booking demand for dryer vent cleaning across Tampa Bay peaks twice a year. The biggest peak is January, driven by post-holiday catch-up — families who hosted out-of-town guests, ran their dryers nonstop through the holidays, and finally have the bandwidth to schedule maintenance. The second peak is September, driven by hurricane-season prep and back-to-school timing — homeowners want their systems checked before the storm season fully kicks in and before kids\' sports laundry ramps up. Both peak months see roughly 880 search-volume spikes for "dryer vent cleaning Tampa." If you have schedule flexibility, booking off-peak (March–May or October–November) typically gets you faster availability and the same $79 starting price.',
      },

      { type: 'h2', text: 'How to Tell If You\'re Overdue' },
      {
        type: 'p',
        text: 'You do not have to wait for a calendar reminder to know your vent needs cleaning. The dryer itself will tell you — it is just a matter of knowing what to listen for. We have a complete breakdown in our companion guide on the 10 warning signs your dryer vent is clogged, but the short version: longer drying times, a hot dryer cabinet, a hot laundry room, lint visible at the exterior vent, or a vent flap that does not open during a cycle. Any one of those means it is time. A burning smell means same-day.',
      },

      { type: 'h2', text: 'What a Free Inspection Tells You' },
      {
        type: 'p',
        text: 'If you are not sure whether you are due, the cheapest first step is to find out for free. Airflow offers a no-obligation dryer vent inspection across Tampa Bay — our certified technicians camera-scope your dryer duct from the appliance to the exterior termination, measure airflow at the vent hood, and give you an honest written assessment. If you are clean and your airflow is healthy, we tell you so and leave. No upsell, no pressure. If you are due, you get an exact quote on the spot. Most inspections take 20–30 minutes.',
      },

      { type: 'h2', text: 'Tampa Bay Cost If You\'re Due' },
      {
        type: 'p',
        text: 'Standard residential dryer vent cleaning in Tampa Bay is $79 for the first 10 feet plus $10 per additional foot. Most single-family homes fall in the $79–$249 range. Two-story homes with long roof-vented runs typically land at the upper end. If the inspection turns up a damaged or collapsed in-wall section, dryer duct repair runs $195–$595 depending on access and materials. The inspection itself is always free regardless of outcome, and our quotes are firm — no surprise add-ons. Call (813) 744-1127 to schedule, or book online; same-day appointments are usually available.',
      },

      {
        type: 'faq',
        items: [
          {
            q: 'Is annual cleaning really enough for Florida?',
            a: 'For a low-use, no-pet, owner-occupied single-family home, annual is usually sufficient — that matches NFPA 211 guidance. But the Airflow team\'s service data across 15,000+ Tampa Bay cleanings shows that homes with pets, larger families, two-story long vent runs, or coastal sand exposure often need cleaning every 6–9 months to maintain healthy airflow inside the dryer duct. The free inspection is the easiest way to find out which category you fall into.',
          },
          {
            q: 'Should I clean more often if I have pets?',
            a: 'Yes. Pet hair binds with lint into a denser, stickier mat that compacts faster and is harder for hardware-store brush kits to dislodge. Households with one or more shedding pets should plan on every 6–9 months instead of annual. Households with multiple pets or a heavy shedder (Husky, Golden Retriever, German Shepherd) often benefit from every 6 months.',
          },
          {
            q: 'When are the busiest booking months?',
            a: 'January (post-holiday catch-up) and September (hurricane-season prep + back-to-school) are the two peak demand months for Tampa Bay dryer vent cleaning. If you have schedule flexibility, booking in March–May or October–November typically gets you faster availability at the same $79 starting price.',
          },
          {
            q: 'What does the free inspection check?',
            a: 'Our certified technicians camera-scope the entire dryer duct from the appliance to the exterior termination, measure airflow at the vent hood with a calibrated anemometer, inspect the transition hose behind the dryer for kinks or damage, and document the condition in a written assessment. If you need cleaning or repair, you get an exact quote on the spot. If you are fine, we tell you that and leave. No obligation, no upsell. Call (813) 744-1127.',
          },
        ],
      },
    ],
  },

  {
    slug: 'how-often-dryer-vent-cleaning-tampa',
    title: 'How Often Should You Clean Your Dryer Vent in Tampa?',
    excerpt: 'Tampa\'s humidity and year-round dryer use mean annual cleaning is essential. Here\'s exactly when — and why — to schedule your next service.',
    date: '2026-04-10',
    readTime: '6 min',
    category: 'Maintenance',
  },
  {
    slug: 'dryer-vent-fire-warning-signs',
    title: '7 Warning Signs Your Dryer Vent Is a Fire Hazard',
    excerpt: 'Burning smells, long dry times, hot dryer surfaces — these warning signs mean your vent needs immediate professional attention.',
    date: '2026-04-02',
    readTime: '5 min',
    category: 'Safety',
  },
  {
    slug: 'dryer-vent-cleaning-cost-tampa-bay',
    title: 'How Much Does Dryer Vent Cleaning Cost in Tampa Bay?',
    excerpt: 'Complete 2026 pricing guide for residential, commercial, and multi-family dryer vent cleaning across Tampa, St. Pete, and Clearwater.',
    date: '2026-03-22',
    readTime: '8 min',
    category: 'Pricing',
  },
  {
    slug: 'flexible-foil-dryer-ducting-dangers',
    title: 'Why Flexible Foil Dryer Ducting Is a Hidden Fire Risk',
    excerpt: 'If your dryer vent uses plastic or foil ducting, you may be operating outside current safety code. Here\'s what to do.',
    date: '2026-03-15',
    readTime: '7 min',
    category: 'Safety',
  },
  {
    slug: 'dryer-vent-cleaning-vs-diy',
    title: 'Professional vs DIY Dryer Vent Cleaning: What Actually Works',
    excerpt: 'Brush kits from hardware stores seem convenient — but they miss up to 60% of lint buildup. Here\'s why professional cleaning matters.',
    date: '2026-03-08',
    readTime: '6 min',
    category: 'DIY',
  },
  {
    slug: 'commercial-dryer-vent-compliance-florida',
    title: 'Commercial Dryer Vent Compliance in Florida: What Property Managers Need to Know',
    excerpt: 'NFPA 211 documentation, insurance requirements, and scheduled maintenance — everything Florida property managers need for compliance.',
    date: '2026-02-28',
    readTime: '10 min',
    category: 'Commercial',
  },
];
