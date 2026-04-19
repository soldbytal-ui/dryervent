// Per-city enhanced content for Tier 1 area pages.
// When an entry exists for an area.slug, the area template renders its richer
// sections (longIntro, whyClogHere, neighborhoodDetail, pricing, testimonial,
// counterPositioning, cityFaqs) instead of the generic area.intro/area.why fallback.
// Cities without an entry (Tier 2 stubs, any not-yet-enhanced Tier 1) use the generic render.

export type AreaContentFaq = { q: string; a: string };

export type AreaContentNeighborhood = {
  name: string;
  zip: string;
  detail: string; // 1-2 sentences, ~25-40 words
};

export type AreaContent = {
  slug: string;
  metaTitle: string; // max 60 chars
  metaDescription: string; // max 160 chars
  heroSubtitle: string; // overrides the population-based default
  longIntro: string; // 80-120 words, uses BOTH "dryer vent" AND "dryer duct" in first 150 words
  whyClogHere: string; // 150-200 words, city-specific clogging factors
  neighborhoodDetail: AreaContentNeighborhood[]; // 5-10 entries with ZIPs
  includesList: string[]; // 6-8 concrete service steps
  pricingNotes: string; // 60-120 words of city-specific pricing context
  counterPositioning: string; // 50-80 words — franchise contrast without naming DVW
  testimonial: { text: string; author: string; neighborhood?: string };
  cityFaqs: AreaContentFaq[]; // 5 FAQs — must include peak-season, pricing, duration
  responseNote: string; // 30-60 words on response time / service radius from Tampa
};

export const areaContent: AreaContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. TAMPA — flagship mother page, broad-metro authority
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'tampa',
    metaTitle: 'Tampa Dryer Vent Cleaning | Locally Owned, Same Week',
    metaDescription:
      'Locally owned Tampa dryer vent cleaning. Transparent flat-rate pricing from $149, same-week appointments, full dryer duct inspection across all 26 Tampa ZIPs.',
    heroSubtitle:
      'Tampa-owned, Tampa-operated dryer vent cleaning across all 26 city ZIP codes — flat-rate pricing, same-week appointments, no franchise routing.',
    longIntro:
      'Tampa dryer vent cleaning is the process of removing compacted lint and humidity-bound debris from the entire dryer duct pathway — from the appliance transition hose, through interior wall and ceiling cavities, out to the exterior termination cap. In Tampa specifically, the combination of subtropical humidity, year-round air-conditioning runtime, and a housing stock that ranges from 1920s Hyde Park bungalows to 2024 Westshore mid-rises means no two dryer vent jobs look the same. The Airflow team services every Tampa neighborhood — Hyde Park, Seminole Heights, Westchase, New Tampa, Davis Islands — with the same flat-rate pricing, the same calibrated airflow meter check, and the same locally-owned crew that lives here too.',
    whyClogHere:
      "Tampa lint behaves differently than lint in Atlanta, Phoenix, or anywhere else with a less hostile climate. Dew points sit above 70°F for nearly half the year, which means the lint moving through your dryer duct is never truly dry. Damp lint compacts. Damp lint sticks to the inside of galvanized metal at every elbow and every transition point, building a felt-like layer that a household leaf blower or shop vac will not touch. Layer that on top of Tampa's mix of older single-family homes with original 1960s ducting still in place behind drywall, fast-built post-2010 subdivisions with 25-foot vent runs, and downtown / Channelside high-rise stacks where shared vertical chases compound the problem — and you have a city where the average household dryer is running 30 to 50 percent hotter than it should within 18 months of the last professional cleaning. NFPA 211 calls for annual professional inspection. In Tampa, that's the floor, not the ceiling.",
    neighborhoodDetail: [
      {
        name: 'Hyde Park',
        zip: '33606',
        detail:
          'Pre-war bungalows and 1920s craftsman homes around Bayshore and Swann Avenue often hide undersized 3-inch dryer duct runs from kitchen-conversion laundry rooms — code today calls for 4-inch rigid metal.',
      },
      {
        name: 'Seminole Heights',
        zip: '33603',
        detail:
          'The 1920s-1940s bungalow belt north of downtown frequently has dryers tucked into former back porches, with vent runs that snake through original wood-frame walls and exit through stucco patches that trap lint at the cap.',
      },
      {
        name: 'Westshore',
        zip: '33607',
        detail:
          'The high-rise condo and luxury rental corridor along Cypress and Boy Scout Boulevard has shared vertical vent stacks where one neglected unit clogs the entire column — coordination with property management is standard here.',
      },
      {
        name: 'Davis Islands',
        zip: '33606',
        detail:
          'Causeway-accessed Mediterranean-revival homes from the 1920s have masonry exterior walls and tile roofs, meaning vent terminations are often capped through clay tile or stucco — fragile work that demands a careful local hand.',
      },
      {
        name: 'New Tampa',
        zip: '33647',
        detail:
          'Tampa Palms, Cory Lake Isles, and Hunters Green executive homes routinely have 30-plus-foot vent runs from second-floor laundry rooms — these need rotary brush systems, not the wand-only setups budget services carry.',
      },
      {
        name: 'Westchase',
        zip: '33626',
        detail:
          'Late-1990s two-story floor plans in Greens of Westchase and Bennington nearly all locate the dryer on the second floor with vents traveling down through wall cavities — gravity pulls lint into the lowest section.',
      },
      {
        name: 'Carrollwood',
        zip: '33618',
        detail:
          'Original 1960s and 70s Carrollwood Village homes often still run flexible foil or white plastic ducting behind the dryer — both materials are now banned by code and replaced during cleaning when found.',
      },
      {
        name: 'Channelside / Downtown',
        zip: '33602',
        detail:
          'Mid-rise and high-rise condos near Amalie Arena and Water Street use bundled riser vent stacks. Single-unit cleanings still require building access coordination, and we handle the building-management side directly.',
      },
      {
        name: 'Ybor City',
        zip: '33605',
        detail:
          'Historic cigar-worker shotgun houses and converted brick warehouses have eccentric vent routing — sometimes through original brick chimneys — that requires camera inspection before any cleaning is attempted.',
      },
    ],
    includesList: [
      'Full interior duct cleaning from appliance transition hose through every elbow to exterior termination',
      'Rotary brush system sized to the actual vent diameter (3-inch and 4-inch heads on truck)',
      'Pre- and post-airflow measurement with calibrated anemometer (recorded on invoice)',
      'Exterior termination cap removal, cleaning, and bird-guard inspection',
      'Lint trap housing vacuum-out (where most household fires actually originate)',
      'Visual inspection for crushed, kinked, or out-of-code flexible foil ducting',
      'Photo documentation of any code or repair recommendations before any upsell',
      'Written report emailed within 24 hours covering airflow gain, materials found, and next-cleaning timing',
    ],
    pricingNotes:
      "Most Tampa single-family homes fall squarely into the $149–$249 residential range. The two factors that move a Tampa job toward the higher end are vent run length (anything over 25 feet — common in New Tampa and Westchase) and second-floor laundry, which adds the standard $50 surcharge for ladder work and longer brush extensions. Downtown and Channelside condo units are typically $129–$199. Older Hyde Park and Seminole Heights homes occasionally surface a wall-ductwork repair need ($195–$595) when 1960s flexible foil is found behind drywall — we always photograph and quote before any repair work begins, never after.",
    counterPositioning:
      "When you call a national franchise for Tampa service, you reach a corporate routing center that may dispatch any one of several rotating franchisees — and the FTC-mandated fine print on their site reads \"independently owned and operated franchises.\" Pricing is hidden until the truck arrives. The Airflow team is one Tampa-owned business, one phone, one published price sheet, and the same NADCA-trained crew that cleaned your neighbor's vent last week.",
    testimonial: {
      text: "Booked online Tuesday morning, on the calendar for Thursday afternoon. The tech showed me the airflow reading before and after — went from 28% blocked to clean — and emailed me photos of the exterior cap and the lint pile from inside the duct. No upsell pressure, just an honest report. Already booked next year.",
      author: 'Marcus T.',
      neighborhood: 'Seminole Heights',
    },
    cityFaqs: [
      {
        q: 'When is the busiest season for dryer vent cleaning in Tampa?',
        a: "January and September are the two demand peaks across Tampa Bay, each running roughly 880 search-volume per month for vent cleaning. January spikes because of post-holiday laundry loads and snowbird arrivals; September spikes because of back-to-school household reset and the first cool-front laundry catch-up. If you want a weekday morning slot in either month, book three weeks ahead — if you call us in October or May, you'll usually get something inside of a week.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Tampa?',
        a: 'Standard Tampa single-family homes run $149–$249 flat-rate. Condos and townhouses (Channelside, Westshore high-rises, downtown) run $129–$199. A second-floor laundry adds $50. Inspection-only visits with a written airflow report are $79. We publish the full price sheet on the site — no phone-quote dance, no pressure pricing once the truck arrives.',
      },
      {
        q: 'How long does a dryer vent cleaning take in a Tampa home?',
        a: "A typical single-story Tampa home takes 45 to 75 minutes from arrival to written invoice. Two-story homes with second-floor laundry run 75 to 100 minutes because of the longer dryer duct path and ladder access to the exterior termination. We never rush — the rotary brush has to make full contact with every section of the duct or the cleaning isn't worth doing.",
      },
      {
        q: 'How often should a Tampa home get its dryer vent cleaned?',
        a: "Once a year is the NFPA 211 baseline and the right schedule for most Tampa households. You should bump that to every 6–9 months if any of these apply: more than 4 people in the home, pets that shed, vent run longer than 25 feet, or the dryer takes more than one cycle to dry a normal load. Tampa's humidity adds about 20% to compaction rates compared to drier climates.",
      },
      {
        q: 'Do you service every part of Tampa, or just specific neighborhoods?',
        a: 'Every ZIP. From 33602 downtown to 33647 in New Tampa, from 33611 in South Tampa out to 33635 in Westchase — all 26 Tampa ZIPs are covered at the same flat-rate pricing with no travel surcharge. The same crew also reaches Brandon, Riverview, Carrollwood, Lutz, and the rest of Hillsborough.',
      },
    ],
    responseNote:
      "Same-week scheduling is standard for Tampa addresses — most calls placed by Wednesday land a Thursday or Friday slot the same week. We dispatch from a central Tampa base, so every Tampa ZIP is inside a 25-minute drive. Saturday appointments are available; Sunday is reserved for emergency lint-fire follow-ups only.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ST. PETERSBURG — coastal salt + condos + 1940s-60s bungalows
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'st-petersburg',
    metaTitle: 'St. Petersburg Dryer Vent Cleaning | Salt-Air Specialists',
    metaDescription:
      'St. Pete dryer vent and dryer duct cleaning specialists. Coastal salt corrosion, condo vent stacks, Old Northeast bungalows. Flat-rate pricing from $129.',
    heroSubtitle:
      "Pinellas peninsula specialists — salt-air vent corrosion, downtown condo stacks, and Old Northeast bungalows handled by a Tampa Bay-owned crew, not a national chain.",
    longIntro:
      "St. Petersburg dryer vent cleaning is fundamentally different from inland service because every dryer duct on this peninsula breathes salt. Gulf and bay aerosol drifts onto exterior vent caps daily, mixes with lint inside the duct, and forms an abrasive, slightly conductive paste that no other Tampa Bay submarket has to contend with. Add to that one of Florida's densest concentrations of 1940s-1960s bungalows in Old Northeast and Crescent Lake, the high-rise condo stacks rebuilding the downtown skyline, and the Snell Isle and Shore Acres waterfront homes — and you have a city where vent neglect costs more, faster. Airflow services every St. Pete ZIP from 33701 downtown to 33715 on Tierra Verde with the same Tampa Bay-owned crew, not a rotating franchise schedule.",
    whyClogHere:
      "Three coastal forces drive St. Pete's vent problems. First, salt aerosol — the peninsula geography means no St. Pete home is more than four miles from open saltwater, and exterior galvanized vent caps lose their zinc coating two to three times faster than equivalent caps in Brandon or Wesley Chapel. Once the zinc goes, the steel corrodes, the cap loses spring tension, and pest entry plus rainwater intrusion follows. Second, condo stack density: downtown, Snell Isle, and the beach barrier islands have hundreds of multi-unit buildings where ten to twenty dryers vent into a shared vertical chase. One unit's neglected lint becomes every unit's problem, and a single building cleaning often surfaces multi-unit code violations dating to the original 1980s construction. Third, the 1940s-60s housing stock in Old Northeast, Kenwood, and Disston Heights was built before modern dryer-vent code even existed — many homes still have undersized 3-inch ducting, foil-tape splices, and runs that exit through original brick chimneys. Annual professional service is the floor here. Six-month service is common for waterfront and condo units.",
    neighborhoodDetail: [
      {
        name: 'Old Northeast',
        zip: '33701',
        detail:
          "Brick-and-stucco bungalows from the 1920s-40s along Beach Drive and 5th Ave NE often have dryer duct runs originally sized for 1950s gas dryers — too narrow for modern high-volume electric dryers, which compounds lint compaction.",
      },
      {
        name: 'Snell Isle',
        zip: '33704',
        detail:
          'Mediterranean-revival waterfront homes around the Vinoy Golf Club have direct bay exposure on three sides — exterior vent caps here corrode within five years and need replacement at every other cleaning visit.',
      },
      {
        name: 'Shore Acres',
        zip: '33703',
        detail:
          "Single-story 1960s ranch homes built on filled bay-front land sit low to the water table — vent terminations on north-facing walls take constant onshore wind off Tampa Bay and accumulate the heaviest salt buildup we see anywhere in Pinellas.",
      },
      {
        name: 'Downtown St. Pete',
        zip: '33701',
        detail:
          "The Beach Drive condo corridor and high-rises around the Pier and Pier District have shared vertical vent stacks — single-unit cleanings require board approval but pay back fast in shared-system airflow.",
      },
      {
        name: 'Crescent Lake',
        zip: '33704',
        detail:
          'Bungalow district north of downtown with original 1920s-30s housing — many of these homes have dryers retrofitted into former back porches with vents punched through old wood-frame walls and capped with mismatched hardware.',
      },
      {
        name: 'Kenwood',
        zip: '33713',
        detail:
          'Designated historic district with the highest concentration of bungalows in St. Pete — original ducting is the rule, not the exception, and almost every cleaning here surfaces at least one code-update opportunity.',
      },
      {
        name: 'Tyrone',
        zip: '33710',
        detail:
          'Mid-1960s tract homes between Tyrone Boulevard and Park Street were built on a uniform plan — vent runs predictably exit the same north or east wall, making cleaning fast but corrosion patterns very consistent.',
      },
      {
        name: 'St. Pete Beach / Pass-a-Grille',
        zip: '33706',
        detail:
          'Barrier-island condos and beach cottages take direct Gulf exposure — salt aerosol here is the most aggressive in Tampa Bay, and short-term-rental dryer use stacks the cleaning frequency to twice a year minimum.',
      },
      {
        name: 'Greater Pinellas Point',
        zip: '33705',
        detail:
          "South-end peninsula neighborhood with 1950s-60s ranch homes and Tampa Bay exposure on the east side — exterior caps see consistent onshore salt and benefit from stainless-steel replacement at the first cleaning.",
      },
    ],
    includesList: [
      'Salt-aware exterior cap inspection — corrosion grade documented on invoice',
      'Stainless-steel cap replacement quoted before install (not a surprise upcharge)',
      'Full rotary brush of dryer duct from transition hose to exterior termination',
      'Pre- and post-airflow reading with calibrated anemometer',
      'Condo board / property management coordination for shared-stack buildings',
      'Pest entry inspection (gulf coast pests get into corroded caps fast)',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'Photo documentation and emailed written report within 24 hours',
    ],
    pricingNotes:
      "Most St. Pete jobs sit at one of two clear price points. Single-family homes in Old Northeast, Crescent Lake, Tyrone, and Disston Heights run $149–$249. Condo and townhouse units — and there are a lot of them, from Beach Drive high-rises to barrier-island three-stories — run $129–$199. The St. Pete-specific add-on we see most often is exterior cap replacement: a corroded galvanized cap swapped for a stainless-steel unit runs $45–$95 in parts plus install. Snell Isle, Shore Acres, and St. Pete Beach addresses with active corrosion will see this line item more often than inland Tampa addresses.",
    counterPositioning:
      "No national chain has a dedicated St. Petersburg page, and there's a reason — salt-air work demands local knowledge that a corporate franchise routing system can't ship in. The franchise model uses the FTC-mandated phrase \"independently owned and operated franchises\" precisely because no two visits come from the same operator. Airflow is one Tampa Bay-owned business with one consistent crew that sees the same Pinellas corrosion patterns week after week.",
    testimonial: {
      text: "Lived in our 1953 bungalow for 18 years and never had the vent professionally cleaned — we just kept buying new dryers. The tech pulled out a wad of compacted lint the size of a football and showed me the corroded cap on the back wall. Replaced the cap with a stainless one, dryer runs cooler, single-cycle drying again. Should have called five dryers ago.",
      author: 'Patricia W.',
      neighborhood: 'Old Northeast',
    },
    cityFaqs: [
      {
        q: 'When does demand peak for dryer vent cleaning in St. Petersburg?',
        a: "January and September. January peaks because snowbirds arrive in St. Pete in volume — a lot of seasonal condos go from zero dryer use to daily use overnight, and owners book a fresh cleaning at arrival. September is the post-summer / pre-snowbird scramble. Both months run near 880 monthly searches across Tampa Bay; weekday slots fill three to four weeks out. November and February are the easiest months to book.",
      },
      {
        q: 'How much does dryer vent cleaning cost in St. Pete?',
        a: 'Single-family homes are $149–$249. Condos and townhouses — including most downtown high-rises and the barrier-island buildings — are $129–$199. Inspection-only with a written airflow report is $79. The most common St. Pete add-on is exterior stainless-steel cap replacement when corrosion is found; that is quoted with photos before any work happens.',
      },
      {
        q: 'How long does a typical St. Pete cleaning take?',
        a: "Bungalow single-story homes in Old Northeast or Crescent Lake run 45-75 minutes. High-rise condo units take a similar window once building access is sorted; we coordinate with the property manager ahead of time. Snell Isle or Shore Acres waterfront homes with cap replacement add about 20 minutes for the part swap. Every job ends with a photo report, not a rushed exit.",
      },
      {
        q: 'Do salt-air homes really need cleaning more often than inland?',
        a: "Yes. Coastal St. Pete addresses — Snell Isle, Shore Acres, St. Pete Beach, Pass-a-Grille, anything within a half-mile of open water — accumulate exterior cap corrosion two to three times faster than Brandon or Wesley Chapel. Six-month inspection cycles are reasonable for direct-waterfront homes. Cleanings still go on the annual cycle; inspections are the off-cycle visit.",
      },
      {
        q: 'Do you handle condo buildings and shared vent stacks?',
        a: "Yes. Downtown high-rises, Snell Isle towers, beach barrier-island condos — single-unit cleanings happen often, and full-building shared-stack cleanings are quoted on a custom commercial basis. We coordinate directly with property management or the HOA board so you don't have to play middleman.",
      },
    ],
    responseNote:
      "St. Pete addresses are 25-40 minutes from our Tampa base via the Howard Frankland or Gandy Bridge. Same-week scheduling is the norm; barrier-island and Tierra Verde addresses occasionally land on a Thursday or Friday-only schedule because of bridge traffic. Snell Isle, Shore Acres, and downtown condo work is dispatched as readily as any inland Tampa job.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SOUTH TAMPA — historic + luxury, retrofitted vent systems
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'south-tampa',
    metaTitle: 'South Tampa Dryer Vent Cleaning | Bayshore to Davis Islands',
    metaDescription:
      'South Tampa dryer vent and dryer duct cleaning. Hyde Park, Bayshore, Davis Islands, Palma Ceia. Historic-home retrofit specialists. Flat-rate from $149.',
    heroSubtitle:
      "South Tampa's historic Bayshore, Davis Islands, Hyde Park, and Palma Ceia homes deserve a vent cleaner who understands 1920s ducting — not a national chain reading off a script.",
    longIntro:
      "South Tampa dryer vent cleaning is a specialty practice, not a generic service. The dryer duct in a 1925 Bayshore Beautiful colonial doesn't behave the same as a duct in a 2020 Westchase tract home — and pretending otherwise is how you damage original plaster, crack stucco, and miss undersized 3-inch runs that should have been replaced 40 years ago. Airflow services every South Tampa ZIP — 33606, 33611, 33616, 33629 — covering Hyde Park, Davis Islands, Palma Ceia, Bayshore Beautiful, Beach Park, Sunset Park, and SoHo. We bring the right brush diameters for narrow historic ducts, the right cameras for inspecting routing through wall cavities you can't open, and the patience to do retrofitted systems correctly the first time.",
    whyClogHere:
      "Three things make South Tampa vent cleaning genuinely different. First, age — the bulk of Hyde Park, Davis Islands, Bayshore, and Palma Ceia housing was built between 1920 and 1965, decades before any dryer vent code existed. Original \"vent\" routing was often whatever a homeowner could improvise: undersized 3-inch metal pipe, runs through original brick chimneys, exits through stucco patches, even venting into attic spaces (which is a fire hazard the moment lint starts to gather on rafters). Second, retrofits — most of these homes have had dryer locations moved two or three times across renovations, and each move left the previous duct stub somewhere in the wall. Third, premium high-heat dryers — South Tampa households tend toward high-end appliances that move more air at higher temperature than a standard mid-market dryer, which accelerates lint compaction inside undersized historic ducting. The combination is a vent system that looks fine from the laundry room and is dangerous behind the wall. Camera inspection before brushing is standard South Tampa practice.",
    neighborhoodDetail: [
      {
        name: 'Hyde Park',
        zip: '33606',
        detail:
          "South Tampa's prestige core has 1920s craftsman and Mediterranean-revival homes where dryer vents often exit through original brick or terra-cotta features — fragile masonry that requires hand-tool work, not pressure brushing.",
      },
      {
        name: 'Davis Islands',
        zip: '33606',
        detail:
          'Causeway-accessed island with 1920s Mediterranean-revival, 1950s mid-century, and recent rebuilds side-by-side. Vent routing varies wildly within a single block — every home gets a fresh camera inspection before cleaning.',
      },
      {
        name: 'Bayshore Beautiful',
        zip: '33611',
        detail:
          "Bayshore Boulevard-adjacent neighborhood with 1920s-1960s estate homes — many have dryers in basement-level laundry rooms (rare in Florida) with vent runs that climb 15-20 feet up exterior walls before terminating.",
      },
      {
        name: 'Palma Ceia',
        zip: '33629',
        detail:
          'Established 1920s-1950s neighborhood around the Palma Ceia Golf & Country Club — many original homes have laundry rooms converted from sleeping porches, with vent runs improvised through original tongue-and-groove walls.',
      },
      {
        name: 'Beach Park',
        zip: '33609',
        detail:
          "Westshore-adjacent estate neighborhood with 1940s-1960s homes — some on the bay side with mild salt exposure, almost all with retrofitted laundry rooms and undersized duct runs that haven't been touched in 30+ years.",
      },
      {
        name: 'Sunset Park',
        zip: '33629',
        detail:
          'Quiet upscale 1950s-1970s neighborhood north of MacDill — many homes have second-laundry setups (main floor + garage workshop) that double the vent inventory and double the service interval.',
      },
      {
        name: 'SoHo (South of Howard)',
        zip: '33606',
        detail:
          "Mix of 1920s bungalows, 1980s townhouses, and recent infill construction — bungalow vent runs are typically 3-inch original; townhouse runs are second-floor with 90-degree drops that need rotary brushes to clean.",
      },
      {
        name: 'New Suburb Beautiful',
        zip: '33629',
        detail:
          "Hyde Park-adjacent 1920s-30s neighborhood with original homes still on original ducting — code-compliance updates are recommended at almost every cleaning here.",
      },
    ],
    includesList: [
      'Pre-cleaning camera inspection of dryer duct routing through wall cavities (standard for pre-1965 homes)',
      'Brush sized to actual duct diameter — 3-inch and 4-inch heads carried for historic and modern runs',
      'Hand-tool work at original brick, terra-cotta, and stucco terminations (no pressure brushing on fragile masonry)',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Identification of abandoned previous-laundry-room duct stubs left in walls',
      "Recommendation report on undersized 3-inch runs that don't meet current 4-inch code",
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'Written report with photos emailed within 24 hours',
    ],
    pricingNotes:
      "South Tampa pricing tracks the historic-home specialty. Standard single-family cleanings start at $149, but Hyde Park, Bayshore Beautiful, and Davis Islands homes more often land at $199–$249 because of pre-cleaning camera inspection time and the longer, often retrofitted, duct paths. Wall ductwork repair ($195–$595) is the line item we quote most often in South Tampa — undersized 3-inch original runs, abandoned duct stubs, and out-of-code flexible foil all surface during the first thorough cleaning. Inspection-only at $79 is a popular entry point for first-time clients who want to know what's behind the wall before committing to repair.",
    counterPositioning:
      "Historic South Tampa homes are not a fit for a national chain rotating crews through a corporate routing system. The franchise model trains technicians to one playbook; pre-1965 housing demands judgment that comes from working hundreds of these homes locally. The FTC requires those chains to disclose \"independently owned and operated franchises\" because the operator changes from visit to visit. Airflow is one team, one phone, one set of hands that knows Bayshore housing.",
    testimonial: {
      text: "Our 1928 Hyde Park home had original ducting we didn't even know about — the previous owners had moved the laundry room twice and left two abandoned duct stubs in the walls. The Airflow tech ran a camera, mapped everything, and showed me on the screen what was where. Cleaned the active run, sealed the abandoned ones properly, and the dryer dries a full load on one cycle for the first time since we moved in.",
      author: 'Jennifer M.',
      neighborhood: 'Hyde Park',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in South Tampa?',
        a: "January and September are the two annual peaks. January traffic spikes because of post-holiday laundry loads and the start of the snowbird/seasonal-rental cycle on Davis Islands and Bayshore. September spikes because of post-summer reset and the back-to-school household-maintenance push. Both months see roughly 880 monthly Tampa Bay searches; South Tampa weekday slots fill 3-4 weeks out. May and November are the most flexible booking months.",
      },
      {
        q: 'How much does cleaning cost for a historic Hyde Park or Bayshore home?',
        a: "Standard single-family pricing is $149–$249. South Tampa historic homes more often land in the upper half of that band because of pre-cleaning camera inspection and longer retrofitted duct paths. Wall ductwork repair, when needed, runs $195–$595 and is always quoted with photos before any repair work begins. Inspection-only at $79 is a good first step if you've never had a professional look behind the wall.",
      },
      {
        q: 'How long does a South Tampa cleaning visit take?',
        a: "Pre-1965 homes take 75-110 minutes because of the camera inspection step and the slower hand work needed at fragile original masonry terminations. Modern infill construction in SoHo or Sunset Park runs the standard 45-75 minutes. We do not rush historic homes — the cost of cracking original stucco or chipping terra-cotta is a lot more than the cost of taking another 20 minutes.",
      },
      {
        q: 'My South Tampa home has a 3-inch dryer duct. Is that a problem?',
        a: "Yes. Modern code calls for 4-inch rigid metal duct. A 3-inch run — common in pre-1965 South Tampa homes — chokes airflow, builds lint faster, and runs the dryer hotter. We document undersized runs in the written report and quote the upgrade option, but never pressure-sell it. Many clients run on the original 3-inch with twice-yearly cleanings; others choose to upsize during a remodel.",
      },
      {
        q: 'Do you handle Davis Islands and Bayshore waterfront homes?',
        a: "Yes — every South Tampa ZIP, including the Davis Islands causeway addresses and the Bayshore Boulevard estate strip. Light salt exposure on the bay-facing side of Bayshore Beautiful and parts of Beach Park puts these homes between full-coastal St. Pete and inland Tampa for cap corrosion frequency — usually a stainless cap upgrade buys 8-10 years instead of 4-5.",
      },
    ],
    responseNote:
      "South Tampa is 10-25 minutes from our Tampa base depending on Bayshore traffic. Same-week scheduling is standard, and morning slots in Hyde Park, Davis Islands, Palma Ceia, and Bayshore are the most reliable. Saturday appointments are available for schedules that don't accommodate weekday work; we do not surcharge weekends.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. WESLEY CHAPEL — master-planned communities, HOA bulk angle
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'wesley-chapel',
    metaTitle: 'Wesley Chapel Dryer Vent Cleaning | HOA & Family Homes',
    metaDescription:
      'Wesley Chapel dryer vent cleaning for Seven Oaks, Meadow Pointe, Wiregrass Ranch and more. HOA bulk pricing, second-floor laundry specialists, $149 flat-rate.',
    heroSubtitle:
      "Wesley Chapel's master-planned communities — Seven Oaks, Meadow Pointe, Wiregrass Ranch, Estancia — get a flat-rate cleaning from a Tampa Bay-owned crew, plus HOA bulk pricing for whole-block scheduling.",
    longIntro:
      "Wesley Chapel dryer vent cleaning has a structural advantage other Tampa Bay submarkets don't: the housing is uniform. Master-planned communities like Seven Oaks, Meadow Pointe, Wiregrass Ranch, and Estancia were built block-by-block from the same set of floor plans, which means the dryer duct routing in your home is almost identical to your neighbor's — same run length, same number of elbows, same exit wall. That uniformity makes professional cleaning faster and unlocks a real opportunity: HOA bulk scheduling. When 8 or 12 neighbors book the same morning, the crew runs the block efficiently and per-home pricing drops noticeably. Airflow services every Wesley Chapel ZIP — 33543, 33544, 33545 — and works directly with HOA boards on multi-home days.",
    whyClogHere:
      "Wesley Chapel homes are mostly 2002-2018 master-planned construction, and that demographic creates three predictable issues. First, second-floor laundry is the standard — almost every floor plan in Seven Oaks, Wiregrass Ranch, Bridgewater, Watergrass, and Estancia puts the dryer on the upper floor with the vent dropping through wall cavities to exit at ground level or the soffit. Gravity does the rest: lint accumulates fastest at the lowest section of the run, often building a felt-thick layer at the elbow before the exterior cap. Second, the build cohort matters — homes built in the 2000s-2010s commonly have flexible foil or semi-rigid aluminum transition hose behind the dryer (now considered a fire hazard) and 25-35 foot total duct runs that exceed the manufacturer's recommended 25-foot maximum for many residential dryers. Third, family demographics — Wesley Chapel is a young-family submarket with high household sizes, and 5-7 loads per week per family compacts lint at roughly 1.5x the regional average. Annual cleaning is the floor; many Seven Oaks and Watergrass families benefit from a 9-month cycle.",
    neighborhoodDetail: [
      {
        name: 'Seven Oaks',
        zip: '33544',
        detail:
          'Mid-2000s master-planned community with predominantly two-story homes — second-floor laundry is the standard floor plan, and the dryer duct typically drops 18-25 feet through interior walls before exiting at the side soffit.',
      },
      {
        name: 'Meadow Pointe',
        zip: '33543',
        detail:
          'Mature 1990s-2000s community with a mix of one- and two-story plans — the older single-story homes occasionally have flexible foil transition hose still installed and benefit from a code-compliant rigid metal upgrade during cleaning.',
      },
      {
        name: 'Wiregrass Ranch',
        zip: '33543',
        detail:
          'Newer master-planned community around Wiregrass Mall with homes built 2010-2020 — almost all two-story with second-floor laundry, semi-rigid aluminum transition hose common, and HOA cohorts that book block-by-block.',
      },
      {
        name: 'Bridgewater',
        zip: '33545',
        detail:
          'East-side Wesley Chapel master-planned with younger family demographics — high laundry volume per household pushes the cleaning interval toward 9 months for most homes here.',
      },
      {
        name: 'Watergrass',
        zip: '33545',
        detail:
          'Family-heavy master-planned community on the Pasco border with predominantly large two-story floor plans and 25-30 foot dryer duct paths — rotary brush systems are required for thorough cleaning of the longer runs.',
      },
      {
        name: 'Estancia',
        zip: '33543',
        detail:
          'Upscale master-planned community with executive-size homes — vent runs frequently exceed 30 feet and second-floor laundry is universal, putting these homes consistently in the upper half of standard pricing.',
      },
      {
        name: 'Lexington Oaks',
        zip: '33544',
        detail:
          "Established 1990s-2000s community with one of Wesley Chapel's longer-tenured homeowner bases — many homes are now hitting the 20-year mark with original ducting that's never been professionally cleaned.",
      },
      {
        name: 'Saddlebrook',
        zip: '33543',
        detail:
          'Resort-adjacent community with a mix of full-time and seasonal residents — seasonal villas have the inverse problem of family homes: low use during vacant months allows pest intrusion at exterior caps.',
      },
    ],
    includesList: [
      'Full rotary brush of the long vertical drop runs typical of second-floor laundry installations',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Identification and replacement quote for any flexible foil or non-code transition hose',
      'Exterior termination cap inspection at side soffit or ground-level exit point',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'HOA bulk-day coordination with neighbors when 8+ homes book together',
      'Photo documentation of duct condition and any code recommendations',
      'Written report emailed within 24 hours covering airflow gain and next-cleaning timing',
    ],
    pricingNotes:
      "Wesley Chapel pricing skews predictably because the housing is uniform. Standard single-family at $149-$249 is the baseline; the second-floor laundry surcharge (+$50) applies to almost every Seven Oaks, Wiregrass Ranch, Watergrass, and Estancia home, which puts most jobs in the $199-$249 zone. The bigger pricing story here is HOA bulk scheduling: when 8-12 neighbors on the same street book the same morning, per-home pricing drops 15-25% because of the routing efficiency. We coordinate the block-day directly with HOA boards or community Facebook groups — many Wesley Chapel communities have an annual vent-cleaning day on the calendar.",
    counterPositioning:
      "A national chain dispatching to Seven Oaks via a corporate routing center has no incentive to coordinate the rest of your block, and no relationship with your HOA board. The franchise model — disclosed under FTC rules as \"independently owned and operated franchises\" — rotates operators visit-to-visit, which makes the bulk-day savings impossible to reproduce. One local Tampa Bay-owned crew, one HOA contact, one block-pricing offer.",
    testimonial: {
      text: "Got our HOA in Watergrass to coordinate a Saturday block day — 14 of us booked together. The Airflow crew showed up with two trucks, ran the block in about six hours, and we all got the bulk price. The tech showed me the lint pile from our 28-foot run and emailed me the airflow numbers. Going to make this an annual thing on the HOA calendar.",
      author: 'Robert P.',
      neighborhood: 'Watergrass',
    },
    cityFaqs: [
      {
        q: 'When is the busy season for vent cleaning in Wesley Chapel?',
        a: "January and September are the two annual demand peaks across Tampa Bay, each running near 880 monthly searches. Wesley Chapel's family demographic adds a back-to-school surge in August that pulls some of September's volume forward. Block-day HOA scheduling tends to land in October or March — the shoulder months when crews have the most flexibility for multi-home Saturday work.",
      },
      {
        q: 'How much does Wesley Chapel dryer vent cleaning cost?',
        a: "Most homes land at $199-$249 because almost every floor plan has second-floor laundry (which adds the standard $50 surcharge to the $149 baseline). HOA bulk-day pricing — when 8 or more neighbors book the same morning — drops per-home pricing 15-25% off standard rates. Wall ductwork repair runs $195-$595 if non-code flexible foil transition hose needs replacement.",
      },
      {
        q: 'How long does a typical Wesley Chapel cleaning take?',
        a: "75-100 minutes per home for a standard two-story Seven Oaks, Wiregrass Ranch, or Watergrass floor plan — the longer time is the second-floor ladder access and the 25-30 foot dryer duct rotary brushing. HOA block days run 6-7 homes per crew per day, so individual visits are similar in length even on bulk days.",
      },
      {
        q: 'How does HOA bulk pricing actually work?',
        a: "When 8 or more neighbors on the same street or in the same community book the same morning, per-home pricing drops 15-25% because we save the drive time between addresses. Coordination usually happens through the HOA board or a community Facebook group. We work directly with the board — no need for the homeowner to play middleman. Most Wesley Chapel communities make this an annual event.",
      },
      {
        q: 'My Seven Oaks home has a 28-foot vent run. Is that too long?',
        a: "Most residential dryers are rated for a maximum 25-foot equivalent run length, and every 90-degree elbow adds 5 feet to that calculation. A 28-foot run with two elbows is effectively a 38-foot run — which means your dryer is working harder than designed even when the duct is clean. Annual cleaning becomes mandatory at this length, and a 9-month cycle is reasonable for high-volume households.",
      },
    ],
    responseNote:
      "Wesley Chapel addresses are 35-50 minutes from our Tampa base via I-75. Same-week scheduling is standard for individual home calls; HOA block days are scheduled 4-6 weeks out to give boards time to coordinate enrollment. Saturday block days are the most popular slot and book first — board-level inquiries get priority on weekend calendar holds.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. BRANDON — suburban tract, long 20-30 ft 2-story vent runs
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'brandon',
    metaTitle: 'Brandon Dryer Vent Cleaning | Bloomingdale & FishHawk',
    metaDescription:
      'Brandon dryer vent cleaning for Bloomingdale, FishHawk Ranch, Brandon Lakes. Long 2-story duct runs, family-home volume, flat-rate pricing from $149.',
    heroSubtitle:
      "Brandon's two-story tract homes — Bloomingdale, FishHawk Ranch, Brandon Lakes, Heather Lakes — get the long-run rotary brush treatment from a locally-owned crew, not a national franchise.",
    longIntro:
      "Brandon dryer vent cleaning is a long-run discipline. Most Brandon two-story homes route their dryer duct 25 to 35 feet from a second-floor laundry room down through interior wall cavities and out a side or rear exterior wall — a path with three or four 90-degree elbows that compound airflow resistance and create lint-trap zones at every bend. National-chain technicians equipped only with a cleaning wand cannot reach the middle of these runs; they clean what they can see and leave the rest. Airflow runs the rotary brush system that's actually required for Brandon's housing stock, services every Brandon ZIP from 33508 through 33511, and covers Bloomingdale, FishHawk Ranch, Brandon Lakes, Heather Lakes, and Providence Lakes with the same flat-rate pricing.",
    whyClogHere:
      "Brandon's vent issues are driven by three interlocking factors. First, run length — the suburban tract-home build pattern from the late 1990s through the 2010s favored two-story floor plans with the laundry room upstairs, and the vent path from upstairs laundry to exterior wall regularly hits 25-35 feet. That's already past the manufacturer rating for most residential dryers, and once you add the equivalent-length penalty for elbows (5 feet per 90-degree bend), the effective run can exceed 50 feet. Second, family-home volume — Brandon is a family submarket with high weekly laundry counts (5-8 loads is normal), which compacts lint at well above the regional average. Third, the build-cohort age — homes from 1998-2008 are now hitting the 17-25 year mark, and original transition hose, exterior cap hardware, and elbow joints are at end-of-life simultaneously. Annual cleaning is the floor for any Bloomingdale, FishHawk, or Brandon Lakes home; 9-month cycles are reasonable for the highest-volume households. Wand-only cleaners cannot service these duct paths properly — rotary brush systems are required.",
    neighborhoodDetail: [
      {
        name: 'Bloomingdale',
        zip: '33511',
        detail:
          'Established 1980s-1990s master-planned community with predominantly two-story homes — dryer duct runs in the original Bloomingdale East and West sections frequently hit 30 feet, and many original exterior cap hardware sets are at end-of-life.',
      },
      {
        name: 'FishHawk Ranch',
        zip: '33547',
        detail:
          'Large-scale master-planned community south of Brandon proper — newer construction (2000s-2010s) with the longest dryer duct runs in the area, executive-size two-story plans where 32-35 foot paths are routine.',
      },
      {
        name: 'Brandon Lakes',
        zip: '33510',
        detail:
          'Established suburban subdivision with mid-1980s and 1990s two-story tract homes — long enough on the market that original ducting and transition hose are universally past replacement age.',
      },
      {
        name: 'Heather Lakes',
        zip: '33511',
        detail:
          'Mid-1990s suburban tract neighborhood with predominantly two-story floor plans — second-floor laundry is the standard installation, and rotary brush cleaning is required for the typical 28-foot duct path.',
      },
      {
        name: 'Providence Lakes',
        zip: '33511',
        detail:
          'Late-1990s two-story tract development with consistent floor plans — dryer duct runs exit predictably at the side soffit, making cleaning fast but the paths are uniformly long enough to demand rotary brush work.',
      },
      {
        name: 'Buckhorn',
        zip: '33511',
        detail:
          "Established 1980s-90s neighborhood east of Brandon proper — older two-story homes with original ducting and a pattern of in-place upgrades (new dryers on old duct) that compounds airflow problems.",
      },
      {
        name: 'Sterling Ranch',
        zip: '33511',
        detail:
          "Newer 2000s-2010s tract development with executive two-story plans — vent paths consistently hit 30+ feet and exterior cap quality varies widely between original-build hardware and post-construction replacements.",
      },
      {
        name: 'Brandon Pointe',
        zip: '33510',
        detail:
          'Newer infill subdivision near downtown Brandon — predominantly two-story construction with second-floor laundry standard, and second-floor surcharge applies to most jobs here.',
      },
    ],
    includesList: [
      'Rotary brush system sized to actual duct diameter — required for 25-35 foot two-story runs',
      'Multi-segment cleaning passes for runs exceeding 25 feet (single-pass cleaning leaves the middle dirty)',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Exterior cap inspection and bird-guard check at side soffit or rear exterior wall termination',
      'Identification of out-of-code flexible foil transition hose at the dryer connection',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'Photo documentation of any code or repair recommendations before any upsell',
      'Written report with photos and airflow numbers emailed within 24 hours',
    ],
    pricingNotes:
      "Brandon pricing predictably runs in the upper half of the standard $149-$249 single-family band because the housing is dominated by two-story floor plans. Almost every Bloomingdale, FishHawk, Heather Lakes, and Providence Lakes home triggers the +$50 second-floor laundry surcharge, putting most jobs at $199-$249. Long-run homes (FishHawk Ranch executive plans, Sterling Ranch) at the high end of the duct path range can land at the top of standard pricing. Wall ductwork repair ($195-$595) is the line item we quote most often in Brandon — usually for original transition hose replacement or code-update of out-of-spec elbow joints discovered during cleaning of older Bloomingdale and Brandon Lakes homes.",
    counterPositioning:
      "Brandon's long vent runs are exactly the housing type where wand-only national-chain cleaners fail — they reach 8-10 feet from each end and miss the middle 15 feet entirely. Corporate routing centers dispatching rotating franchisees (FTC-disclosed as \"independently owned and operated franchises\") rarely audit equipment standards visit-to-visit. The Airflow crew runs the rotary brush system every job, and the same crew does Brandon week after week.",
    testimonial: {
      text: "Two-story house in FishHawk, dryer was taking three cycles to dry a load of towels. Had a competitor out last year, didn't help. Airflow showed up with the rotary brush rig, ran it the full 32 feet, pulled out a felt-thick lint mat from the middle of the run that the previous service obviously never reached. One cycle drying again. The before-and-after airflow numbers were on the invoice — went from 22% blocked to clean.",
      author: 'David K.',
      neighborhood: 'FishHawk Ranch',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Brandon?',
        a: "January and September are the two demand peaks across Tampa Bay, each running near 880 monthly searches. Brandon's family-home demographic adds an August back-to-school surge that pulls some September volume early. Bloomingdale and FishHawk Ranch HOA block-day requests typically come in for October or March scheduling. October and February are the easiest months to book individual appointments.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Brandon?',
        a: "Most Brandon homes land at $199-$249 because almost every floor plan has second-floor laundry (which adds the standard $50 surcharge to the $149 single-family baseline). FishHawk Ranch and Sterling Ranch executive-size homes with 32+ foot vent runs occasionally land at the top of that band. Wall ductwork repair, when needed, runs $195-$595 and is always quoted with photos before any work begins.",
      },
      {
        q: 'How long does a Brandon vent cleaning take?',
        a: "75-110 minutes for a typical two-story Brandon home — longer than a single-story job because the rotary brush has to make multi-segment cleaning passes through the 25-35 foot duct path, and ladder access to the exterior cap takes additional time. We do not rush these jobs; the difference between a fast wand pass and a thorough rotary brush is the difference between a cleaning that lasts a year and one that lasts three months.",
      },
      {
        q: 'My Bloomingdale home has a 30-foot vent run. Does that need special equipment?',
        a: "Yes — long runs require a rotary brush system, not a cleaning wand. Wand-only cleaners (common with low-budget services and some national-chain franchisees) can only reach 8-10 feet from each end of the duct, leaving the middle 10-15 feet of a 30-foot run essentially uncleaned. Rotary brushes attach to a flexible drive shaft and rotate through the full duct path, scrubbing the inside walls clean.",
      },
      {
        q: 'How often should a Brandon family home get vent cleaning?',
        a: "Annual is the NFPA 211 baseline and the right schedule for most Brandon households. The high-volume family submarket pattern — 5-8 loads per week, two-story long-run ducting, 90-degree elbows at every floor transition — pushes toward a 9-month cycle for the busiest households. Pet families and homes with more than 4 occupants should plan on the 9-month interval.",
      },
    ],
    responseNote:
      "Brandon addresses are 20-30 minutes from our Tampa base via I-75 or Highway 60. Same-week scheduling is the norm; FishHawk Ranch and Bloomingdale East addresses sometimes land on a Thursday/Friday-only schedule depending on weekly routing. Saturday appointments are available with no weekend surcharge — popular for working family households where weekday access is hard.",
  },
];

export function getAreaContent(slug: string): AreaContent | undefined {
  return areaContent.find((c) => c.slug === slug);
}

// Standard Tampa Bay price ranges used across all enhanced area pages.
// Individual cities can override via AreaContent.pricingNotes.
export const STANDARD_PRICING = [
  { label: 'Residential single-family', range: '$149–$249' },
  { label: 'Condo / townhouse', range: '$129–$199' },
  { label: 'Second-floor laundry surcharge', range: '+$50' },
  { label: 'Wall ductwork repair', range: '$195–$595' },
  { label: 'Inspection only', range: '$79' },
  { label: 'Commercial / multi-unit', range: 'Custom quote' },
] as const;
