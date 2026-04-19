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
        a: 'Standard Tampa single-family homes run $149–$249 flat-rate. Condos and townhouses (Channelside, Westshore high-rises, downtown) run $129–$199. A second-floor laundry adds $50. Inspection-only visits with a written airflow report are $149. We publish the full price sheet on the site — no phone-quote dance, no pressure pricing once the truck arrives.',
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
        a: 'Single-family homes are $149–$249. Condos and townhouses — including most downtown high-rises and the barrier-island buildings — are $129–$199. Inspection-only with a written airflow report is $149. The most common St. Pete add-on is exterior stainless-steel cap replacement when corrosion is found; that is quoted with photos before any work happens.',
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
      "South Tampa pricing tracks the historic-home specialty. Standard single-family cleanings start at $149, but Hyde Park, Bayshore Beautiful, and Davis Islands homes more often land at $199–$249 because of pre-cleaning camera inspection time and the longer, often retrofitted, duct paths. Wall ductwork repair ($195–$595) is the line item we quote most often in South Tampa — undersized 3-inch original runs, abandoned duct stubs, and out-of-code flexible foil all surface during the first thorough cleaning. Inspection-only at $149 is a popular entry point for first-time clients who want to know what's behind the wall before committing to repair.",
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
        a: "Standard single-family pricing is $149–$249. South Tampa historic homes more often land in the upper half of that band because of pre-cleaning camera inspection and longer retrofitted duct paths. Wall ductwork repair, when needed, runs $195–$595 and is always quoted with photos before any repair work begins. Inspection-only at $149 is a good first step if you've never had a professional look behind the wall.",
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

  // ─────────────────────────────────────────────────────────────────────────
  // 6. NEW TAMPA — executive 2-story, 30+ ft vertical vent-run reach specialty
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'new-tampa',
    metaTitle: 'New Tampa Dryer Vent Cleaning | 30-Ft Vertical Run Specialists',
    metaDescription:
      'New Tampa dryer vent and dryer duct cleaning for Tampa Palms, Hunters Green, Cross Creek, Arbor Greene. 30+ ft vertical-run rotary brush specialists from $149.',
    heroSubtitle:
      "New Tampa's executive two-story homes with 30+ foot vertical dryer duct runs need brush extensions that physically reach the top — not generic 20-foot kits. Locally-owned, I-75-corridor fast.",
    longIntro:
      "New Tampa dryer vent cleaning is a vertical-reach discipline. The executive two-story homes in Tampa Palms, Hunters Green, Cross Creek, Arbor Greene, West Meadows, and Cory Lake Isles regularly run a dryer duct 30 to 38 feet from a second-floor laundry room straight up to a roof-jack termination or straight across and down to a sidewall exit. A standard 20-foot rotary brush kit — which is what most national-chain technicians and budget operators carry — physically cannot reach the top third of that duct path. The Airflow team invests in 35-foot rotary brush extensions rated for vertical runs, services every New Tampa ZIP (33647 and 33613 east side), and covers the I-75 corridor from Bruce B. Downs to the Pasco line with the same flat-rate pricing.",
    whyClogHere:
      "Three factors stack to make New Tampa one of the most demanding vent-cleaning submarkets in Tampa Bay. First, vertical run length. Executive two-story floor plans in Tampa Palms, Hunters Green, Arbor Greene, and Cory Lake Isles put the laundry room on the second floor and typically route the dryer duct straight up through an interior chase to a roof jack — or up and then laterally through an attic to a sidewall vent. Total paths of 30 to 38 feet are normal; some Cory Lake Isles homes exceed 40 feet. Second, dual-income professional usage patterns. Most New Tampa households are I-75 commuter dual-income families running premium high-efficiency dryers harder than average — more cycles per week, at higher heat settings, which accelerates lint-compaction velocity significantly. Third, the Florida cooling season compounder. Tampa's 11-month air-conditioning runtime keeps interior air fully conditioned year-round, and airborne fine dust combines with dryer lint inside the vertical stack to form a denser, more adhesive compound than seasonal-climate submarkets see. Annual cleaning is the floor for any New Tampa home; 9-month intervals are reasonable for high-volume households with runs over 30 feet.",
    neighborhoodDetail: [
      {
        name: 'Tampa Palms',
        zip: '33647',
        detail:
          "New Tampa's original flagship master-planned community with 2,800-4,500 sqft executive two-story homes. Dryer duct runs from second-floor laundry to roof-jack termination routinely hit 32-35 feet and require extended rotary brush reach.",
      },
      {
        name: 'Hunters Green',
        zip: '33647',
        detail:
          'Gated golf-course community with large two-story executive floor plans built mid-1990s through early-2000s. Most homes route vents vertically through interior chases — long reach plus occasional attic lateral runs make this a rotary-brush-required zone.',
      },
      {
        name: 'Cross Creek',
        zip: '33647',
        detail:
          'Master-planned community near the University Mall corridor with predominantly two-story homes and 28-33 foot dryer duct paths. Younger-family demographic pushes laundry volume above average, compounding lint accumulation.',
      },
      {
        name: 'Arbor Greene',
        zip: '33647',
        detail:
          'Gated community with upscale two-story homes and second-floor laundry universal across floor plans. Vent runs frequently exit through the roof rather than the sidewall, requiring roof-safe cap inspection in addition to the rotary brush work.',
      },
      {
        name: 'West Meadows',
        zip: '33647',
        detail:
          'Family-oriented master-planned community with dense two-story construction — HOA cohorts occasionally book block days, and per-home pricing drops meaningfully when 8+ neighbors schedule together.',
      },
      {
        name: 'Cory Lake Isles',
        zip: '33647',
        detail:
          "New Tampa's largest-home subdivision — 3,500-6,000 sqft lakefront and lake-view executive homes where dryer duct paths of 35-40 feet are routine and 35-foot brush extensions are mandatory for thorough cleaning.",
      },
      {
        name: 'Live Oak Preserve',
        zip: '33647',
        detail:
          'Newer 2000s-2010s two-story construction with consistent floor plans routing vents vertically through interior walls. Younger homes mean transition hoses are not yet at end-of-life, but long-run cleaning discipline still applies.',
      },
      {
        name: 'Heritage Isles',
        zip: '33647',
        detail:
          'Golf-course community with large two-story floor plans and an aging-in-place owner base — many original 1999-2004 dryers have been replaced on original ducting, compounding airflow problems on runs that already push 30 feet.',
      },
      {
        name: 'K-Bar Ranch',
        zip: '33647',
        detail:
          "Newer master-planned area on New Tampa's east side with executive two-story homes built 2010 onward. Consistent floor plans make block-day coordination easy; vent runs uniformly hit 28-32 feet from second-floor laundry to sidewall termination.",
      },
    ],
    includesList: [
      '35-foot rotary brush extension rated for vertical runs (the equipment most competitors do not carry)',
      'Roof-jack inspection and cleaning when the dryer duct terminates above the roofline',
      'Pre- and post-airflow measurement with calibrated anemometer (recorded on invoice)',
      'Multi-segment cleaning passes for vertical runs exceeding 25 feet',
      'Attic-path inspection for homes with lateral runs between the vertical chase and sidewall termination',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'Identification and replacement quote for any out-of-code flexible foil transition hose',
      'Written report with photos and airflow numbers emailed within 24 hours',
    ],
    pricingNotes:
      "New Tampa pricing consistently lands in the upper half of the standard $149–$249 single-family band because of two compounding factors: universal second-floor laundry (which triggers the standard $50 surcharge) and long vertical duct paths. Most Tampa Palms, Hunters Green, Arbor Greene, and West Meadows homes bill at $199–$249. Cory Lake Isles executive homes with 35-40 foot runs and roof-jack terminations occasionally move to the top of standard pricing. Inspection-only with a written airflow report is $149 — a common entry point for homeowners who have never had a 30-foot vertical run evaluated. Wall ductwork repair ($195–$595) is quoted with photos before any work begins, never added as a surprise.",
    counterPositioning:
      "National franchise crews arrive in New Tampa with standard 20-foot rotary brush kits from corporate inventory — which cannot physically reach the upper third of your 32-foot vertical dryer duct. Under the FTC-mandated \"independently owned and operated franchises\" disclosure, equipment standards vary operator-to-operator and there is no route-density relationship with the community. Airflow invests in 35-foot vertical-rated extensions because Tampa Palms and Cory Lake Isles homes actually require them.",
    testimonial: {
      text: "Cory Lake Isles home, 35-foot run from the upstairs laundry straight up through the chase to a roof jack. Had two other companies out over the past four years who said they 'cleaned it' and we still had a dryer taking two cycles per load. Airflow showed up with a 35-foot brush extension, ran the full path, pulled out a dense lint mat from the top 12 feet that the other guys never touched. Photos of the before-and-after airflow numbers on the invoice. Completely different experience.",
      author: 'Anika R.',
      neighborhood: 'Cory Lake Isles',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in New Tampa?',
        a: "January and September are the two annual demand peaks across Tampa Bay, each running near 880 monthly searches for vent cleaning. New Tampa's dual-income professional demographic also drives an August back-to-school surge that pulls some September volume forward. HOA block-day requests from Tampa Palms, West Meadows, and K-Bar Ranch typically target October or March scheduling. October and February are the easiest months for an individual weekday appointment.",
      },
      {
        q: 'How much does dryer vent cleaning cost in New Tampa?',
        a: 'Most New Tampa homes land at $199–$249. The $149 single-family baseline plus the $50 second-floor laundry surcharge applies to nearly every Tampa Palms, Hunters Green, Arbor Greene, and Cory Lake Isles floor plan. Inspection-only with a written airflow report is $149 — useful if you are buying a New Tampa home and want to know what is happening in a 32-foot vertical run before closing. Wall ductwork repair, when needed, runs $195–$595 and is always quoted with photos first.',
      },
      {
        q: 'My Tampa Palms home has a 32-foot vertical run. Does it need special equipment?',
        a: "Yes — a standard 20-foot rotary brush cannot physically reach the top 12 feet of a 32-foot vertical dryer duct, and most budget operators and national-chain crews arrive with 20-foot kits from central inventory. We run 35-foot extensions rated for vertical runs on every New Tampa job. If you have ever had a service that finished in 30 minutes with a wand and the problem came back in three months, this is almost certainly why.",
      },
      {
        q: 'How long does a New Tampa vent cleaning take?',
        a: "90-110 minutes for a typical Tampa Palms, Hunters Green, or Arbor Greene two-story with a 30+ foot vertical run. Cory Lake Isles executive homes with 35-40 foot paths and roof-jack terminations occasionally run to 120 minutes because of the additional roof-safe cap inspection step. Multi-segment rotary brush passes through a long vertical chase take time — we do not rush it, because rushing is how cleanings that should last a year end up lasting three months.",
      },
      {
        q: 'How often should a New Tampa executive home get vent cleaning?',
        a: "Annual is the NFPA 211 baseline. For New Tampa specifically, a 9-month interval is reasonable for any home with a 30+ foot duct path, a dual-income family running 6+ loads per week, or a dryer that already takes more than one cycle to dry a normal load. The combination of long vertical runs, 11-month Florida cooling-season airborne dust, and premium high-efficiency dryer usage compounds compaction faster than inland suburban averages.",
      },
    ],
    responseNote:
      "New Tampa addresses are 25-40 minutes from our Tampa base via I-75 or Bruce B. Downs. Same-week scheduling is the norm; Tampa Palms, Cory Lake Isles, and K-Bar Ranch occasionally land on a Thursday or Friday slot based on weekly I-75 corridor routing. Saturday appointments are available with no weekend surcharge — popular for dual-income households where weekday access is hard.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. CARROLLWOOD — 1970s rigid aluminum retrofit expertise + oak canopy
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'carrollwood',
    metaTitle: 'Carrollwood Dryer Vent Cleaning | Retrofit Specialists',
    metaDescription:
      'Carrollwood dryer vent cleaning and dryer duct retrofit for 1970s-era rigid aluminum vents past end-of-life. One-visit retrofits, flat-rate pricing from $149.',
    heroSubtitle:
      "Carrollwood's 1960s-80s housing needs more than cleaning — it needs a retrofit from brittle original rigid aluminum to modern semi-rigid duct rated for today's high-efficiency dryers. One-visit service.",
    longIntro:
      "Carrollwood dryer vent cleaning is rarely just cleaning. The housing stock across Original Carrollwood, Lake Carroll, Carrollwood Village, Carrollwood Meadows, and Northdale was built between 1965 and 1985 — which means the original rigid aluminum dryer duct behind the wall is now 40 to 60 years old, brittle, fractured at joints, and sized for 1970s dryer airflow that ran roughly one-third the CFM of a 2025 high-efficiency unit. Cleaning alone is a half-measure on hardware that old. The Airflow team carries replacement duct on every truck and retrofits in the same visit — something national-chain crews cannot do because their inventory is centralized and material swaps require corporate approval. We service every Carrollwood ZIP from 33618 through 33624.",
    whyClogHere:
      "Carrollwood's vent problems are driven by three interlocking factors that reinforce one another. First, original duct material. Homes built 1965-1985 almost universally installed rigid aluminum dryer duct behind drywall — a material that was fine for 1970s dryer specs but is now brittle with age, develops hairline cracks at elbow joints, and loses interior smoothness (which accelerates lint adhesion on any rough surface). Second, appliance-code mismatch. A 2024 high-efficiency electric dryer moves roughly 3× the CFM of the 1975 dryer this duct was sized for, which means today's airflow is pushing harder through a pipe designed for a lower volume. The pressure differential alone accelerates lint packing at every joint. Third, the oak canopy effect. Carrollwood's mature oak tree coverage is beloved but drops leaves, acorns, and fine seed material into exterior vent caps year-round; squirrels nest at external terminations with near-permanent occupancy. The combination — brittle interior duct, oversized interior airflow, choked exterior cap — means simple cleaning often reveals cracked ducting that should not be re-sealed but replaced. We retrofit in the same visit with semi-rigid aluminum rated to modern specs.",
    neighborhoodDetail: [
      {
        name: 'Original Carrollwood',
        zip: '33618',
        detail:
          'The 1960s-70s founding neighborhood east of Dale Mabry with mature oak canopy and original ranch-style homes. Nearly every home has original rigid aluminum dryer duct behind the wall and needs retrofit work alongside cleaning.',
      },
      {
        name: 'Lake Carroll',
        zip: '33618',
        detail:
          'Lakefront 1960s-70s neighborhood with waterfront homes that have added slight humidity exposure on top of the already-aged dryer duct inventory. Exterior vent caps here also see more algal growth at the cap than inland Carrollwood addresses.',
      },
      {
        name: 'Carrollwood Village',
        zip: '33618',
        detail:
          "Master-planned 1970s-80s community with predominantly two-story homes on original ducting. The combination of 40+ year old rigid aluminum, second-floor laundry, and oak-canopy exterior caps makes this the neighborhood that most often needs full retrofit alongside cleaning.",
      },
      {
        name: 'Carrollwood Meadows',
        zip: '33618',
        detail:
          'Family neighborhood west of Dale Mabry with 1970s-80s single-story and two-story construction. Original flexible foil transition hose is common at the dryer connection and is replaced at nearly every cleaning visit here.',
      },
      {
        name: 'Northdale',
        zip: '33624',
        detail:
          'Late-1970s-80s master-planned community on the north edge of Carrollwood with larger executive homes and consistent floor plans. Original ducting is aging into replacement territory at roughly the same pace across the community.',
      },
      {
        name: 'Lake Magdalene',
        zip: '33618',
        detail:
          "Established 1970s lakefront neighborhood east of Dale Mabry with mature oak canopy. Many homes have had laundry rooms moved or expanded during renovations — which leaves abandoned duct stubs in walls alongside the aging active duct.",
      },
      {
        name: 'Country Run',
        zip: '33624',
        detail:
          'Family-oriented 1980s subdivision on the Carrollwood edge with semi-rural lot sizes. Oak and pine canopy drops heavy organic debris on exterior vent caps, and squirrel nesting is a seasonal issue almost every cleaning visit uncovers.',
      },
      {
        name: 'The Hamptons',
        zip: '33624',
        detail:
          'Upscale 1980s Carrollwood subdivision with larger two-story homes on original rigid aluminum duct. Second-floor laundry is common here, compounding the 40+ year-old-duct problem with long vertical runs.',
      },
    ],
    includesList: [
      'Full rotary brush cleaning of existing dryer duct (with camera inspection on pre-1985 homes)',
      'On-the-spot retrofit from brittle original rigid aluminum to modern semi-rigid aluminum rated for current dryer CFM',
      'Replacement duct stocked on every truck — no corporate approval, no second visit required',
      'Exterior vent cap cleaning, squirrel-nest removal, and oak-debris clearing at the termination',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Identification of abandoned previous-laundry-room duct stubs left in walls during past renovations',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'Written report with photos, retrofit documentation, and airflow numbers emailed within 24 hours',
    ],
    pricingNotes:
      "Carrollwood pricing has two tiers. Cleaning-only visits fall into the standard $149–$249 single-family band — most Original Carrollwood, Lake Magdalene, and Carrollwood Meadows single-story homes bill at $149–$199. The retrofit scenario is where Carrollwood becomes distinct. When we discover brittle 40-year-old rigid aluminum duct with cracked joints or confirmed leakage, the wall ductwork repair line ($195–$595) covers replacement with modern semi-rigid aluminum in the same visit. Carrollwood Village and Hamptons two-story homes with second-floor laundry add the standard +$50 and often land at $199–$249 for cleaning-only. Inspection-only at $149 is a reasonable first visit for any Carrollwood homeowner who has never had the duct evaluated.",
    counterPositioning:
      "National chains are clean-only shops in Carrollwood because their inventory is centralized and any material swap requires a corporate approval loop — which means a second visit, a second trip charge, and a second day off work for you. The FTC-disclosed \"independently owned and operated franchises\" model also means the operator who cleans today may not be the operator who returns for the retrofit. Airflow carries replacement duct on every truck and retrofits in one visit.",
    testimonial: {
      text: "Carrollwood Village home, original 1978 ducting behind the wall. A national chain came out last year, cleaned what they could reach, and told me I needed to 'call them back' for duct replacement on a separate visit. Never happened. Airflow showed up, ran the camera, showed me two cracked elbow joints on the screen, pulled replacement semi-rigid off the truck, and had the whole retrofit done the same afternoon. One visit. One invoice. Dryer runs 40% cooler according to the airflow numbers they emailed me.",
      author: 'Daniel H.',
      neighborhood: 'Carrollwood Village',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Carrollwood?',
        a: "January and September are the two annual demand peaks across Tampa Bay, each running near 880 monthly searches. Carrollwood retrofits tend to cluster in the shoulder months — May, October, November — when owners have already seen cleaning-only fail and decide to address the underlying ducting. October and February are the easiest months to book an individual weekday appointment.",
      },
      {
        q: 'How much does Carrollwood dryer vent cleaning and retrofit cost?',
        a: "Cleaning-only lands at $149-$249 depending on run length and second-floor laundry. Carrollwood's common retrofit scenario — replacing brittle 40-year-old rigid aluminum dryer duct with modern semi-rigid in the same visit — is the wall ductwork repair line at $195–$595. We quote the retrofit with photos before any work happens. Inspection-only with a written airflow report is $149 and is a good first step for any Carrollwood home that has never had a professional duct evaluation.",
      },
      {
        q: 'My Original Carrollwood home has original 1970s ducting. Should I clean it or replace it?',
        a: "Both. Cleaning alone on 40-50 year old rigid aluminum dryer duct is a half-measure because the interior surface has lost its original smoothness and hairline cracks at elbow joints have started to leak. The Airflow approach is: run a camera first, show you on the screen what is cracked versus intact, retrofit the failed sections in the same visit with modern semi-rigid aluminum rated for today's high-efficiency dryers, and leave you with a duct system that matches a 2025 dryer's CFM.",
      },
      {
        q: 'Do squirrels and oak debris really affect my dryer vent?',
        a: "Yes — Carrollwood's mature oak canopy drops leaves, acorns, and seed material into exterior vent caps year-round, and squirrels nest at external duct terminations almost continuously. A cap packed with leaves or a squirrel nest will choke dryer airflow completely, which forces the dryer to run hotter and longer to finish a load. We clear the exterior cap and install bird-guards (included, not an upsell) at every Carrollwood visit.",
      },
      {
        q: 'How often should a Carrollwood home get vent cleaning?',
        a: "Annual is the NFPA 211 baseline, and for Carrollwood specifically that is the right starting cadence — but the real differentiator is whether your dryer duct has been retrofitted. Homes still on original 1970s rigid aluminum compact lint faster because of the aged interior surface. Post-retrofit on modern semi-rigid, the annual cadence holds comfortably. Pre-retrofit, consider a 9-month interval until the duct is updated.",
      },
    ],
    responseNote:
      "Carrollwood addresses are 15-25 minutes from our Tampa base via Dale Mabry or Veterans Expressway. Same-week scheduling is standard for both cleaning and retrofit visits. Because we carry replacement duct on every truck, a same-day retrofit is almost always available if cleaning surfaces a cracked elbow or leaking joint — no second trip, no second invoice.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. WESTCHASE — route density + builder-template knowledge
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'westchase',
    metaTitle: 'Westchase Dryer Vent Cleaning | Same-Day Availability',
    metaDescription:
      'Westchase dryer vent and dryer duct cleaning specialists. Pulte, DR Horton, Westbury floor plan experts. Route density, same-day availability, flat-rate from $149.',
    heroSubtitle:
      "Westchase's 1990s-2000s Pulte, DR Horton, and Westbury floor plans — we have serviced so many identical homes we already know where your duct runs and where the clog will be. Same-day availability.",
    longIntro:
      "Westchase dryer vent cleaning is a route-density and builder-template discipline. Westchase proper, West Park Village, Radcliffe, Harbor Links, Glenfield, Bennington, and Berkeley Village were built from a finite set of Pulte, Westbury, and DR Horton floor plans between the mid-1990s and the mid-2000s. That repetition is a feature, not a bug. When the Airflow team walks into any Pulte two-story plan in Glenfield, we already know where the dryer duct rises through the wall chase, where the two 90-degree elbows will be, and where the lint will have compacted hardest. That template knowledge plus genuine route density inside Westchase translates to same-day availability and tighter pricing than a franchise crew driving 45 minutes from Lakeland or Riverview. We service every Westchase ZIP — 33626 primary, plus the 33635 edge.",
    whyClogHere:
      "Three factors specific to Westchase drive the cleaning cadence. First, builder-template repetition. Because Westchase is built from a small set of Pulte, Westbury, and DR Horton master floor plans, the same clog patterns repeat block-to-block — lint compacts at the same elbow in the same wall cavity across hundreds of homes in Glenfield, Berkeley Village, and Radcliffe. The Airflow team has serviced so many identical plans that the first 15 minutes of the visit are pattern-match, not discovery. Second, active-lifestyle laundry volume. Westchase is a tennis, golf, and pool active community, which means towel laundry and workout-gear laundry per household runs materially higher than regional average — lint accumulation speeds up proportionally. Third, HOA and NextDoor referral density. Westchase has one of the tightest community-communication networks in Tampa Bay; when one Bennington home has a great cleaning experience, five Bennington neighbors book within the month, and our route density inside the community tightens further. The annual NFPA 211 baseline holds for most Westchase homes; 9-month cycles are reasonable for the highest-volume tennis-and-pool households.",
    neighborhoodDetail: [
      {
        name: 'Westchase proper',
        zip: '33626',
        detail:
          'The original 1990s master-planned core with predominantly two-story Pulte and Westbury floor plans. Second-floor laundry is the standard install and the dryer duct path is nearly identical block-to-block — template cleaning, fast and thorough.',
      },
      {
        name: 'West Park Village',
        zip: '33626',
        detail:
          'Walkable village-center neighborhood with mixed townhouses, courtyard homes, and single-family construction. Townhouses have short duct runs but shared exterior-wall clusters where HOA coordination speeds block-day scheduling.',
      },
      {
        name: 'Radcliffe',
        zip: '33626',
        detail:
          'Golf-course-adjacent Westchase subsection with upscale two-story Westbury plans and longer 25-30 foot duct runs than the core Westchase template. Pool-and-tennis household laundry volume is noticeably above average here.',
      },
      {
        name: 'Harbor Links',
        zip: '33626',
        detail:
          'Waterway-adjacent Westchase subsection with slight humidity exposure on top of standard Westchase template housing. Exterior vent caps need inspection for mild corrosion earlier than inland Westchase addresses.',
      },
      {
        name: 'Glenfield',
        zip: '33626',
        detail:
          'Mid-Westchase subsection with dense Pulte two-story construction — the template floor plan we have serviced hundreds of times. Second-floor laundry, 26-28 foot duct run, sidewall termination. Fast and consistent.',
      },
      {
        name: 'Bennington',
        zip: '33626',
        detail:
          'Upscale gated Westchase subsection with larger Westbury and DR Horton two-story plans. Executive-size floor plans push duct run length toward 30 feet, putting these homes at the upper end of standard pricing.',
      },
      {
        name: 'Berkeley Village',
        zip: '33626',
        detail:
          'Dense townhouse and single-family Westchase subsection with predominantly DR Horton product. Shorter duct runs on townhouses balance against tighter HOA communication — NextDoor referral density here is the highest in Westchase.',
      },
      {
        name: 'The Greens at Westchase',
        zip: '33626',
        detail:
          "Golf-course-adjacent with upscale two-story plans and longer duct runs. Active-lifestyle demographic drives high weekly laundry volume; 9-month cleaning intervals are reasonable for most households here.",
      },
    ],
    includesList: [
      'Template-based route-efficient cleaning for identified Pulte, Westbury, and DR Horton floor plans',
      'Full rotary brush of the dryer duct from transition hose through every elbow to exterior termination',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Exterior sidewall cap inspection, bird-guard check, and mild humidity-corrosion assessment',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'HOA block-day coordination for 8+ neighbor simultaneous scheduling',
      'Photo documentation of any code or repair recommendations before any upsell',
      'Written report emailed within 24 hours with airflow gain and next-cleaning timing',
    ],
    pricingNotes:
      "Westchase pricing lives in the $199-$249 zone for most homes because second-floor laundry is universal across Pulte, Westbury, and DR Horton floor plans — which triggers the standard $50 surcharge on top of the $149 single-family baseline. Townhouses in West Park Village and Berkeley Village fall into the $129-$199 condo/townhouse range. Where Westchase becomes interesting is HOA and NextDoor-driven block-day pricing: when 8-12 neighbors book the same morning, per-home pricing drops 15-25% because route density inside the community means zero drive time between addresses. Inspection-only is $149. Wall ductwork repair ($195-$595) is rare in Westchase because the housing is young enough that original ducting is still intact.",
    counterPositioning:
      "A franchise crew dispatched from a corporate routing center in Lakeland or Riverview has no Westchase route density and no builder-template pattern library — every visit is discovery, not pattern match. Franchise territory maps do not map to Tampa's actual traffic patterns, which is why the FTC-mandated \"independently owned and operated franchises\" disclosure exists. The Airflow team runs a Westchase-heavy route weekly and has serviced your exact floor plan many times before.",
    testimonial: {
      text: "Glenfield, standard Pulte two-story. Tech walked in, looked at the laundry room for about 10 seconds, and said, 'I know this plan — the clog is going to be at the second elbow behind the garage wall.' That is exactly where it was. 55 minutes later he emailed me before-and-after airflow numbers and photos of the compacted lint from the exact spot he predicted. Booked same-day because three of my neighbors had already used them.",
      author: 'Kendra S.',
      neighborhood: 'Glenfield',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Westchase?',
        a: "January and September are the two annual demand peaks across Tampa Bay, each running near 880 monthly searches. Westchase has its own mini-peak pattern driven by NextDoor and HOA referral density — when one neighbor has a great experience, the referral cluster books within 30 days. Block-day HOA requests cluster in October and March. October and February are the easiest months for individual weekday appointments.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Westchase?',
        a: 'Most Westchase single-family homes land at $199-$249 because second-floor laundry is universal across the Pulte, Westbury, and DR Horton floor plans (standard $50 surcharge on the $149 baseline). West Park Village and Berkeley Village townhouses run $129-$199. HOA block-day coordination (8+ neighbors) drops per-home pricing 15-25%. Inspection-only with a written airflow report is $149.',
      },
      {
        q: 'Why does a Westchase-based crew really matter?',
        a: "Two reasons. First, route density: a crew running Westchase weekly builds pattern knowledge of Pulte, Westbury, and DR Horton floor plans that a franchise crew driving in from Lakeland or Riverview cannot replicate — the first 15 minutes of your visit are pattern match, not discovery. Second, same-day availability: route density means we can often slot a Westchase call into the same route we are already running, which a corporate dispatching center cannot do for your neighborhood specifically.",
      },
      {
        q: 'How long does a typical Westchase cleaning take?',
        a: "55-75 minutes for a standard Glenfield, Berkeley Village, or Radcliffe two-story on a known Pulte or DR Horton floor plan. West Park Village townhouses run shorter (40-55 minutes) because of the shorter duct paths. Bennington and Greens at Westchase executive-size plans with 30-foot runs take 75-90 minutes. Template knowledge makes Westchase one of the fastest-average-visit submarkets in Tampa Bay.",
      },
      {
        q: 'How often should a Westchase active-lifestyle home get cleaning?',
        a: "Annual is the NFPA 211 baseline and works for most Westchase households. Tennis-and-pool active families with 6+ laundry loads per week — common in Radcliffe, Bennington, and Greens at Westchase — benefit from a 9-month cycle because towel and workout-gear laundry compacts lint faster than the regional average. If your dryer already takes more than one cycle to dry a load, move to the 9-month schedule regardless of household size.",
      },
    ],
    responseNote:
      "Westchase addresses are 20-30 minutes from our Tampa base via Veterans Expressway or Linebaugh. Same-day scheduling is frequently possible when our weekly Westchase route is already running; otherwise same-week is the norm. Block-day HOA requests are scheduled 4-6 weeks out to allow community enrollment. Saturday appointments are available with no weekend surcharge.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. PLANT CITY — agricultural particulate + housing diversity
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'plant-city',
    metaTitle: 'Plant City Dryer Vent Cleaning | Agricultural Particulate Specialists',
    metaDescription:
      'Plant City dryer vent and dryer duct cleaning for Walden Lake, Strawberry Ridge, historic downtown, mobile homes. Agricultural-particulate specialists, flat-rate from $149.',
    heroSubtitle:
      "Plant City air carries strawberry-field dust, grove pollen, and fine agricultural particulate that combines with lint to form a harder-to-remove compound than suburban Tampa. A local crew that handles bungalows, SFH subdivisions, and mobile homes with one truck.",
    longIntro:
      "Plant City dryer vent cleaning is a distinct practice from suburban Tampa because the air itself is different. Strawberry-field dust during winter planting and harvest, orange-grove pollen in spring bloom, and fine particulate from nearby cattle operations drift into exterior vent terminations across Walden Lake, Strawberry Ridge, Country Hills, North Park Isle, historic downtown, and the surrounding agricultural areas. These particles combine with dryer lint inside the dryer duct to form a denser, more adhesive compound than typical suburban lint, and the practical consequence is a shorter cleaning interval: 6-9 months rather than annually. Plant City also demands versatility — a 1920s downtown bungalow, a 2020 Walden Lake SFH, and a Strawberry Ridge mobile home each ask for different technique, and a single Airflow truck handles all three in one day.",
    whyClogHere:
      "Plant City's vent problems are driven by a combination of agricultural airshed and housing diversity that no other Hillsborough submarket matches. First, the airshed. Plant City sits inside Hillsborough's agricultural belt: roughly 10,000 acres of strawberry fields during peak season, substantial citrus grove footprint to the north and east, and cattle operations scattered throughout the rural periphery. Wind-carried strawberry-field dust, grove pollen, and cattle-operation fine particulate enter exterior vent caps continuously and mix with outbound dryer lint to form a compound that is physically denser and more adhesive than typical suburban lint. Cleaning intervals shorten accordingly: what would be annual in Wesley Chapel is 6-9 months in Plant City. Second, housing diversity. The dryer duct routing in a 1925 downtown bungalow with plaster walls and undersized 3-inch original ducting, a 2018 Walden Lake SFH with a 28-foot second-floor run, and a 1990 Strawberry Ridge mobile home with exposed under-skirting duct each require different technique, different equipment, and different inspection discipline. A suburban-template franchise crew is not equipped for this range. Third, mobile-home specifics. Plant City has a meaningful mobile-home inventory, and mobile-home vent access is genuinely different — exterior terminations are often at a different height and routing is exposed under the skirting, which requires a different crawl-access method.",
    neighborhoodDetail: [
      {
        name: 'Walden Lake',
        zip: '33566',
        detail:
          "Plant City's flagship master-planned community with 1980s-2000s single- and two-story SFH construction. Suburban-standard duct routing with 20-28 foot runs; agricultural-particulate compound formation pushes cleaning cycles to 9 months for most homes here.",
      },
      {
        name: 'Strawberry Ridge',
        zip: '33565',
        detail:
          "Mixed housing including established mobile-home communities — mobile-home vent terminations require exterior-skirting access technique that suburban-template crews are not equipped for. Single-truck visits handle the full range in one trip.",
      },
      {
        name: 'Country Hills',
        zip: '33567',
        detail:
          'Family-oriented 1990s-2000s SFH subdivision south of downtown. Agricultural-particulate exposure is similar to Walden Lake; 9-month cleaning intervals reasonable for high-volume households.',
      },
      {
        name: 'North Park Isle',
        zip: '33565',
        detail:
          'Newer 2000s-2010s Plant City subdivision with consistent two-story floor plans. Younger housing means original ducting is intact, but the agricultural airshed still drives a 9-month cleaning recommendation.',
      },
      {
        name: 'Historic Downtown Plant City',
        zip: '33563',
        detail:
          '1920s-1940s bungalows around the historic strawberry-festival district. Original 3-inch undersized dryer duct is common here, and every cleaning typically surfaces a code-update recommendation alongside the cleaning itself.',
      },
      {
        name: 'Turkey Creek',
        zip: '33567',
        detail:
          'Semi-rural Plant City fringe with larger lot sizes and a mix of older SFH and mobile-home construction. Agricultural-particulate exposure is highest in this zone because of direct field and grove proximity.',
      },
      {
        name: 'Cork / Knights',
        zip: '33565',
        detail:
          'Working-class agricultural communities on the Plant City edge with mobile homes, historic cottages, and scattered SFH. Transparent flat-rate pricing matters more here than in affluent Tampa suburbs, and we publish it openly.',
      },
      {
        name: 'Lakeland edge / Plant City East',
        zip: '33567',
        detail:
          'Plant City east edge closer to the Polk County line with semi-rural housing and heavy grove exposure. Citrus-pollen compound formation is most acute here during spring bloom — seasonal cleaning cycles matter.',
      },
    ],
    includesList: [
      'Agricultural-particulate-aware cleaning with extra exterior cap attention at strawberry, grove, and cattle-operation proximity',
      'Full rotary brush of the dryer duct from transition hose to exterior termination',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Mobile-home-specific exterior-skirting access technique for Strawberry Ridge and Turkey Creek mobile units',
      'Historic-bungalow hand-tool technique at 1920s downtown terminations (no pressure brushing on original plaster or stucco)',
      'Identification and replacement quote for undersized 3-inch original runs in historic downtown homes',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'Written report with photos and airflow numbers emailed within 24 hours',
    ],
    pricingNotes:
      "Plant City pricing is transparent flat-rate because the economic reality of the market demands it — pricing-sensitive households respond to published numbers, not phone-quote dances. Single-family cleanings in Walden Lake, Country Hills, and North Park Isle fall into the $149-$249 range, with most single-story homes at the $149-$199 end and two-story with second-floor laundry at $199-$249. Mobile-home cleanings in Strawberry Ridge and Turkey Creek typically fall into the $129-$199 range because of the shorter vent runs and simpler access, though exterior-skirting crawl-access can shift toward the middle of that band. Historic downtown bungalows with original 3-inch undersized duct often trigger the wall ductwork repair line ($195-$595) for code-update retrofit, always quoted with photos first. Inspection-only is $149.",
    counterPositioning:
      "A suburban-template franchise is not built for Plant City's housing diversity — one truck needs to clean a 1920s downtown bungalow in the morning, a 2020 Walden Lake SFH at lunch, and a Strawberry Ridge mobile home in the afternoon. The franchise model rotates operators via a corporate routing center under the FTC-mandated \"independently owned and operated franchises\" disclosure, and the Neighborly family of brands centralizes inventory by suburban template. One Airflow truck, one crew, three completely different jobs in a day.",
    testimonial: {
      text: "Walden Lake home, right at the edge of the strawberry fields. Had a suburban chain out last year and they charged me more and left in 20 minutes. Airflow came out, spent a full hour, pulled out the strangest-looking compacted material from the vent — the tech said it was lint bound up with field dust, explained why it forms denser than normal lint, and recommended a 9-month interval instead of annual. First honest explanation I have gotten for why my dryer was acting up six months after a 'cleaning' last year.",
      author: 'Miguel A.',
      neighborhood: 'Walden Lake',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Plant City?',
        a: "January and September are the two annual demand peaks across Tampa Bay, each running near 880 monthly searches. Plant City has an additional agricultural-season rhythm: January-March strawberry harvest coincides with peak field-dust exposure, which drives an in-season cleaning uptick. Post-citrus-bloom in April-May is another natural cleaning window. October and July are the easiest months for an individual weekday appointment.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Plant City?',
        a: 'We publish transparent flat-rate pricing because Plant City households deserve it: $149-$249 for single-family homes, $129-$199 for mobile homes and condo-style units, +$50 for second-floor laundry, $195-$595 for wall ductwork repair (including undersized 3-inch duct retrofit in historic downtown bungalows), and $149 for inspection-only with a written airflow report. No phone-quote dance, no pressure pricing once the truck arrives.',
      },
      {
        q: 'Does Plant City agricultural dust really affect my dryer vent more?',
        a: "Yes. Strawberry-field dust, orange-grove pollen, and cattle-operation fine particulate drift into exterior vent caps continuously, and inside the dryer duct these particles bond with lint to form a denser, more adhesive compound than typical suburban lint. The practical effect is that a Walden Lake, Country Hills, or Turkey Creek home benefits from a 6-9 month cleaning interval rather than the annual suburban-Tampa cycle. We inspect and make a specific recommendation for your address at the first visit.",
      },
      {
        q: 'Can you service mobile homes in Strawberry Ridge and Turkey Creek?',
        a: "Yes. Mobile-home vent cleaning is a distinct technique from SFH work — exterior terminations are at different heights, routing is often exposed under the skirting, and access requires a specific crawl method. One Airflow truck can handle a 1920s downtown bungalow in the morning, a 2020 Walden Lake SFH at lunch, and a Strawberry Ridge mobile home in the afternoon. We bring the right equipment for all three on the same truck.",
      },
      {
        q: 'My historic downtown bungalow has original 3-inch ducting. What should I do?',
        a: "Modern code calls for 4-inch rigid metal duct. A 3-inch run — common in pre-1950 Plant City downtown bungalows — chokes airflow, builds lint faster, and runs the dryer significantly hotter. We document undersized runs in the written report and quote the upgrade (wall ductwork repair line, $195-$595). Many clients choose to run on the 3-inch with a 6-month cleaning cadence; others retrofit during a remodel. Either path is reasonable; we explain the tradeoff before you decide.",
      },
    ],
    responseNote:
      "Plant City addresses are 30-45 minutes from our Tampa base via I-4. Same-week scheduling is the norm; weekday routing frequently groups Plant City with Brandon or FishHawk Ranch addresses for efficiency. Mobile-home and historic-downtown jobs are handled on the same truck as standard SFH visits — no separate specialist dispatch, no separate trip charge. Saturday appointments are available with no weekend surcharge.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. APOLLO BEACH — salt-water canal corrosion + builder-grade flex failure
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'apollo-beach',
    metaTitle: 'Apollo Beach Dryer Vent Cleaning | MiraBay & Waterset Canal Specialists',
    metaDescription:
      'Apollo Beach dryer vent and dryer duct cleaning for MiraBay, Waterset, Symphony Isles. Canal-corrosion specialists, stainless caps, flat-rate pricing from $149.',
    heroSubtitle:
      "Apollo Beach canal-front homes see exterior vent cap corrosion in 6-12 months instead of 3-5 years, and 2015-2018 builder-grade flex duct is already failing. A local crew that knows which side of MiraBay's canal streets gets the worst salt spray.",
    longIntro:
      "Apollo Beach dryer vent cleaning is a canal-corrosion and builder-grade-flex-failure discipline. Roughly 80% of Apollo Beach housing is 2015-2024 new construction across MiraBay, Waterset, Symphony Isles, Covington Park, Andalucia, and Apollo Beach Estates — and a meaningful share of those homes sit directly on salt-water canals with full-time windward exposure to prevailing SE winds. The result is two compounding problems no other Hillsborough submarket shares: canal-adjacent dryer duct exterior caps corrode in 6-12 months rather than the 3-5 years typical inland, and builder-grade flexible foil installed 2015-2018 is now failing at the 8-10 year mark across the entire 2015 build cohort. The Airflow team runs a weekly Apollo Beach route, specifies 316 stainless or powder-coated aluminum replacement caps for waterfront homes, and knows which side of each MiraBay canal street takes the worst spray.",
    whyClogHere:
      "Apollo Beach's vent problems are driven by three factors that stack uniquely in this submarket. First, salt-water canal corrosion. Homes directly on the MiraBay, Symphony Isles, and Apollo Beach Estates canal network take airborne salt spray continuously — and the practical consequence is that a standard galvanized or aluminum exterior vent cap loses its protective coating in 6-12 months (versus 3-5 years for inland Hillsborough addresses). Once the coating goes, corrosion accelerates, cap spring tension fails, pest entry follows, and rainwater intrusion follows that. Second, prevailing wind directionality. Apollo Beach's prevailing SE winds mean the windward (SE-facing) side of any canal street sees materially worse corrosion than the leeward side just one block over — and a crew running a weekly route learns these patterns street by street, while a franchise rotating through quarterly does not. Third, the builder-grade flex duct failure cohort. The 2015-2018 Apollo Beach building boom installed flexible foil transition hose and semi-rigid builder-grade dryer duct as standard spec across new construction; that material is now 7-10 years old and failing at joint seals, interior surface integrity, and kink-compression at elbows. What worked fine in 2016 is the leading cause of reduced airflow calls in 2025. Add waterfront humidity — canal + pool + AC combinations push indoor humidity toward lint-moisture compaction — and Apollo Beach becomes a 9-month-cycle submarket for most waterfront homes.",
    neighborhoodDetail: [
      {
        name: 'MiraBay',
        zip: '33572',
        detail:
          "Apollo Beach's largest canal-front master-planned community with extensive salt-water canal network. The windward (SE-facing) side of each canal street takes materially worse salt spray than the leeward side — route-density knowledge matters here.",
      },
      {
        name: 'Waterset',
        zip: '33572',
        detail:
          'Large newer master-planned community (2015-2024 construction) on the Apollo Beach interior. Less direct canal exposure than MiraBay but still inside the salt-aerosol drift zone; 2015-era builder-grade flex duct is failing on schedule across the original Waterset sections.',
      },
      {
        name: 'Symphony Isles',
        zip: '33572',
        detail:
          'Established gated canal-front community with direct Tampa Bay and canal exposure. Exterior vent caps here need 316 stainless or powder-coated aluminum replacement at 6-12 month cycles; standard galvanized does not hold up.',
      },
      {
        name: 'Covington Park',
        zip: '33572',
        detail:
          'Interior Apollo Beach master-planned community built mid-2000s — far enough inland that canal-corrosion is not acute, but still within the 2015-era builder-grade flex failure cohort for transition hose and semi-rigid duct.',
      },
      {
        name: 'Andalucia',
        zip: '33572',
        detail:
          'Upscale newer Apollo Beach subdivision with larger two-story floor plans. Mixed canal and interior lot configurations; windward/leeward corrosion patterns apply where homes are canal-adjacent.',
      },
      {
        name: 'Apollo Beach Estates',
        zip: '33572',
        detail:
          'Older established Apollo Beach waterfront neighborhood with direct bay and canal exposure. Some homes here have 30+ year-old exterior cap hardware that has been replaced multiple times because of corrosion cycle — stainless-steel upgrade breaks the cycle.',
      },
      {
        name: 'Harbour Isles',
        zip: '33572',
        detail:
          'Gated waterfront community with boat-dock homes and direct canal exposure. Pool + canal + AC combinations push indoor humidity toward lint-moisture compaction — 9-month cleaning cycles are reasonable for most homes here.',
      },
      {
        name: 'Southshore Falls',
        zip: '33572',
        detail:
          '55+ active-adult community on the Apollo Beach interior. Less canal exposure but the 2008-2012 build cohort is entering the flex-duct-failure window and the lower laundry volume per household stretches cleaning intervals toward annual.',
      },
    ],
    includesList: [
      '316 stainless-steel or powder-coated aluminum exterior vent cap replacement quoted before install (canal-corrosion-resistant hardware, not standard galvanized)',
      'Windward / leeward street-side corrosion assessment for canal-adjacent MiraBay and Symphony Isles addresses',
      'Full rotary brush of the dryer duct from transition hose to exterior termination',
      'Identification and replacement quote for 2015-2018 builder-grade flexible foil transition hose (failing across the cohort)',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Waterfront-humidity-aware assessment of lint-moisture compaction inside the duct',
      'Lint trap housing vacuum-out and dryer drum back-cleaning',
      'Written report with photos and airflow numbers emailed within 24 hours',
    ],
    pricingNotes:
      "Apollo Beach pricing reflects the waterfront-corrosion reality. Standard single-family cleanings fall into the $149-$249 band; second-floor laundry adds the standard +$50 (common in newer MiraBay and Waterset floor plans), which puts most jobs at $199-$249. The Apollo Beach-specific add-on is corrosion-resistant exterior cap replacement: a 316 stainless-steel or powder-coated aluminum cap runs $65-$125 in parts plus install — more than standard galvanized, but it breaks the 6-12 month corrosion-replacement cycle on canal-adjacent homes and pays back in 1-2 cycles. Wall ductwork repair ($195-$595) is increasingly common as 2015-2018 builder-grade flex hits failure — almost always quoted with photos during cleaning, never as a surprise. Inspection-only is $149.",
    counterPositioning:
      "A franchise tech rotating through Apollo Beach once a quarter via a corporate routing center never learns which side of MiraBay's canal streets gets the worst salt spray, or which Waterset section is deepest into the 2015 flex-failure cohort. The FTC-mandated \"independently owned and operated franchises\" disclosure means the operator changes visit-to-visit — no pattern library, no route density. A local crew running Apollo Beach weekly builds that knowledge street by street.",
    testimonial: {
      text: "MiraBay canal home, windward side. Had a national chain replace the vent cap 18 months ago with a standard galvanized unit — it was already rusting through when Airflow came out. The tech explained the windward/leeward corrosion pattern on my specific street, swapped in a 316 stainless cap, and showed me the 2016 builder-grade flex duct was already cracking at the transition. Replaced it in the same visit. Photos and airflow numbers on the invoice. Finally feel like someone who actually lives here is doing the work.",
      author: 'Thomas G.',
      neighborhood: 'MiraBay',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Apollo Beach?',
        a: "January and September are the two annual demand peaks across Tampa Bay, each running near 880 monthly searches. Apollo Beach has a secondary corrosion-inspection rhythm — many waterfront owners book a 6-month inspection in the shoulder seasons (April-May and October-November) because of canal-corrosion cycle awareness. October and February are the easiest months to book an individual weekday appointment.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Apollo Beach?',
        a: 'Standard single-family cleanings run $149-$249, with most MiraBay, Waterset, and Andalucia two-story homes landing at $199-$249 (second-floor laundry triggers the $50 surcharge). The Apollo Beach-specific line item is corrosion-resistant exterior cap replacement: 316 stainless-steel or powder-coated aluminum at $65-$125 parts plus install, quoted with photos. Builder-grade flex duct replacement (wall ductwork repair, $195-$595) is increasingly common across the 2015-2018 cohort. Inspection-only is $149.',
      },
      {
        q: 'Does being on a canal really affect my dryer vent?',
        a: "Yes — materially. A standard galvanized or aluminum exterior vent cap on a MiraBay, Symphony Isles, or Apollo Beach Estates canal home loses its protective coating in 6-12 months versus 3-5 years inland. Once coating fails, corrosion accelerates, cap spring tension is lost, pests enter, and rainwater follows. We specify 316 stainless-steel or powder-coated aluminum replacement on waterfront addresses because it breaks the cycle — the upgrade typically pays back in 1-2 standard-cap replacement cycles.",
      },
      {
        q: 'My Waterset home was built in 2016. Is the flex duct really failing already?',
        a: "Very likely, yes. Builder-grade flexible foil transition hose and semi-rigid duct installed 2015-2018 across Apollo Beach new construction is now 7-10 years old and failing at joint seals, interior surface integrity, and elbow-kink compression. If your dryer takes longer than it used to, or runs hotter, the 2016-era flex is the leading candidate. We inspect, document with photos, and quote replacement as the wall ductwork repair line ($195-$595) during cleaning — never as a separate visit.",
      },
      {
        q: 'How often should an Apollo Beach waterfront home get vent cleaning?',
        a: "Annual is the NFPA 211 baseline, but for canal-adjacent MiraBay, Symphony Isles, Apollo Beach Estates, and Harbour Isles homes a 9-month cycle is the practical recommendation because of the pool + canal + AC indoor humidity stack that drives lint-moisture compaction faster than inland suburbia. A 6-month inspection-only visit at $149 between cleanings is reasonable for direct-waterfront homes — it surfaces corrosion and flex-duct issues before they become airflow problems.",
      },
    ],
    responseNote:
      "Apollo Beach addresses are 30-45 minutes from our Tampa base via US-41 or I-75. We run a weekly Apollo Beach route, so same-week scheduling is the norm and same-day slots open up when we are already working MiraBay or Waterset that day. Stainless-steel cap inventory and 316 corrosion-resistant hardware travel on every truck — no second trip, no second invoice. Saturday appointments are available with no weekend surcharge.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. RIVERVIEW — builder-grade flex-foil failure cohort (IRC 2018 R303.6)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'riverview',
    metaTitle: 'Riverview Dryer Vent Cleaning | Flex-Foil Failure Cohort Specialists',
    metaDescription:
      'Riverview dryer vent and dryer duct cleaning for Panther Trace, Rivercrest, South Fork, Summerfield Crossings. Builder-grade flex-foil replacement, flat-rate from $149.',
    heroSubtitle:
      "Riverview is the Tampa submarket where 2010-2017 builder-grade flex foil is failing on schedule right now. A local crew that knows which developments Lennar built in which permit year — and replaces flex with rigid metal as standard practice.",
    longIntro:
      "Riverview dryer vent cleaning is a builder-grade-flex-foil failure discipline first and a cleaning job second. Roughly three-quarters of Riverview housing is new construction from the 2010-2023 Lennar, DR Horton, Pulte, KB Homes, and Taylor Morrison subdivision boom — Panther Trace, Rivercrest, South Fork, Summerfield Crossings, St. Andrews, Boyette Springs, Summerfield. Those builders specified flexible foil transition duct behind the dryer to hit price points. IRC 2018 R303.6 now prohibits flex foil for dryer vents in new construction, but permits issued 2010-2017 on those Riverview homes did not enforce it, and that material is failing at the five-to-eight-year mark. The 2010-2018 permit cohort is hitting the failure window right now. The Airflow team replaces failed flex with rigid metal dryer duct as standard practice — not as an upsell, but as the only code-compliant fix.",
    whyClogHere:
      "Riverview's clogging pattern is driven by the combination of builder-grade flex-foil vintage and Florida humidity, and the pattern differs development by development based on who built which phase in which permit year. Flexible foil duct has an accordion-ribbed interior surface that traps lint by design — every rib is a micro-catch. Combined with Tampa Bay dew points above 70°F for half the year, the lint never fully dries; it compacts into a felt-like mat that a household shop vac cannot remove and that accelerates the material's thermal fatigue. The 2010-2013 Lennar and DR Horton cohort in Panther Trace and parts of Rivercrest is deepest into the failure window. The 2014-2017 Pulte and KB Homes cohort in Summerfield Crossings, St. Andrews, and the newer Rivercrest sections is entering it now. Post-2018 construction is rigid-metal by code, but any home still running original 2010-2017 flex foil has dryer duct material that was never code-compliant for Riverview's climate and is actively degrading. Second-order effects compound the issue: the 2010-2018 Riverview permit cohort is almost entirely two-story floor plans with second-floor laundry, which means the failing flex foil is hidden inside interior wall cavities and attic chases where gravity-fed lint accumulation piles up at the lowest point of every dip. Exterior cap hardware on those same builds was specified at builder-grade minimum and is routinely corroded or stuck open by the time the first deep clean happens, inviting pest entry and rainwater intrusion that further degrades the interior surface of the flex. Annual cleaning is the NFPA 211 floor; any Riverview home in the 2010-2017 permit range needs camera inspection first because a clean-only job on a failing flex duct is a half-measure that reaccumulates lint within months.",
    neighborhoodDetail: [
      {
        name: 'Panther Trace',
        zip: '33579',
        detail:
          "Large 2010-2016 Lennar and DR Horton master-planned subdivision — deepest into the builder-grade flex-foil failure cohort across Riverview. The 2010-2013 original phases routinely surface failed flex duct during camera inspection.",
      },
      {
        name: 'Rivercrest',
        zip: '33569',
        detail:
          'Established 2005-2015 master-planned community with mixed Lennar and Pulte construction across phases. Original flex foil from the 2005-2010 phases is well past the five-to-eight-year failure window and is essentially guaranteed to need replacement.',
      },
      {
        name: 'South Fork',
        zip: '33579',
        detail:
          "Large DR Horton and Taylor Morrison 2013-2020 subdivision — the 2013-2017 permit cohort is the current failure wave, and homes sold resale in the last three years almost always have original builder-grade flex still in place behind the dryer.",
      },
      {
        name: 'Summerfield Crossings',
        zip: '33579',
        detail:
          'Primarily 2014-2018 KB Homes and Pulte construction — the trailing edge of the pre-IRC-2018 flex-foil permit cohort. Homes here are hitting the failure window now; camera-first inspection recommended on every cleaning.',
      },
      {
        name: 'St. Andrews',
        zip: '33579',
        detail:
          "Pulte-dominated 2014-2019 community on the eastern Riverview boundary. Two-story floor plans with flex-foil transition duct are the dominant pattern; second-floor surcharge applies to the typical installation here.",
      },
      {
        name: 'Boyette Springs',
        zip: '33569',
        detail:
          "Older established 1990s-2000s community — pre-dates the 2010-2018 flex-foil failure cohort, but original builder-grade flex from the late 1990s is even further past replacement age and often has been upgraded once already with in-spec replacement.",
      },
      {
        name: 'Summerfield',
        zip: '33579',
        detail:
          'Mid-2000s established Riverview subdivision with original builder-grade materials at end-of-life on essentially every home — this is the cohort where flex-foil replacement becomes the headline line item on the invoice more often than not.',
      },
    ],
    includesList: [
      'Camera-first inspection on 2010-2017 permit cohort homes before any cleaning pass (wand-only services skip this)',
      'Identification of builder-grade flexible foil transition duct and semi-rigid flex still in service behind the dryer',
      'Rigid metal dryer duct replacement as the code-compliant fix (IRC 2018 R303.6) — quoted before install',
      'Full rotary brush of the interior dryer duct run from transition hose to exterior termination',
      'Pre- and post-airflow measurement with calibrated anemometer',
      'Exterior termination cap inspection, cleaning, and bird-guard verification',
      'Photo documentation of flex-foil failure points (ribbed-surface lint packing, joint separation, kink compression)',
      'Written report with airflow numbers, before-and-after photos, and next-cleaning timing within 24 hours',
    ],
    pricingNotes:
      "Riverview pricing tracks the $149-$249 residential band for single-story cleanings and $199-$249 for the dominant two-story floor plans (second-floor laundry adds the standard $50 surcharge). The Riverview-specific line item is rigid-metal dryer duct replacement of failed builder-grade flex foil, quoted as wall ductwork repair ($195-$595) based on the run length and number of elbows needing conversion. On the 2010-2017 permit cohort — Panther Trace, Rivercrest, South Fork, Summerfield Crossings — we quote this line item on most visits because the flex is demonstrably failing; on post-2018 Palmetto Cay-style rigid-metal-by-code builds, wall ductwork repair is rare and the cleaning usually finishes inside standard single-family pricing. Multi-elbow conversions (four or more 90-degree bends over a 30-foot run, common in Panther Trace executive plans) can land at the top of the wall-ductwork-repair band because each elbow needs discrete cut, fit, and seal work rather than a slip-fit replacement. Condo / townhouse stock falls in the $129-$199 band. Inspection-only is $149 — a reasonable standalone service for a Riverview homeowner wanting a camera audit before deciding on cleaning scope, and it applies as credit toward a same-visit cleaning or replacement job.",
    counterPositioning:
      "National franchise crews are trained to clean and leave; the corporate routing center dispatches whatever franchisee is rotating through (FTC-disclosed as \"independently owned and operated franchises\") and that operator has no pattern library across Riverview phases. A local crew that has seen the same Lennar 2012 flex-foil failure across 40 Panther Trace homes can tell the homeowner why a clean-only job on failing duct material is a half-measure — and quote the real fix with photos.",
    testimonial: {
      text: "Panther Trace, original 2012 Lennar build. Had a national chain clean the vent eighteen months ago — same problem came back in six months. The Airflow tech ran a camera first before cleaning, showed me the flex foil behind the dryer was split at two elbow joints and the interior ribbing was packed solid with matted lint. Replaced with rigid metal, cleaned the rest of the run, photos and airflow numbers on the invoice. Finally understand why the last cleaning didn't stick.",
      author: 'Jennifer M.',
      neighborhood: 'Panther Trace',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Riverview?',
        a: "January and September are the two demand peaks across Tampa Bay, each running near 880 monthly searches. Riverview's new-construction demographic concentrates demand around the January cold-snap dryer-strain window and the August-September back-to-school laundry ramp. October and February are the easiest months to book individual weekday appointments without waiting on a block-day HOA request.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Riverview?',
        a: "Single-story cleanings fall into $149-$249; two-story floor plans (most of Panther Trace, South Fork, St. Andrews) land at $199-$249 because of the standard $50 second-floor surcharge. Condo / townhouse work is $129-$199. The Riverview-specific line item is rigid-metal replacement of failed 2010-2017 builder-grade flex foil, quoted as wall ductwork repair ($195-$595) with photos. Inspection-only is $149 — a reasonable audit step before committing to scope.",
      },
      {
        q: 'My home was built by Lennar in 2013. Is the flex-foil duct really failing?',
        a: "Very likely, yes. Flexible foil transition duct specified by Lennar, DR Horton, Pulte, KB Homes, and Taylor Morrison across 2010-2017 Riverview permits was never code-compliant under IRC 2018 R303.6 (which now prohibits flex foil for dryer vents in new construction) — and the material fails at the five-to-eight-year mark. A 2013 build is in the deep failure window now. We camera-inspect before cleaning, document the failure points with photos, and quote rigid-metal replacement as the code-compliant fix.",
      },
      {
        q: 'Why does a clean-only job not work on my South Fork home?',
        a: "Because cleaning a failing flex-foil dryer duct addresses symptoms, not cause. The accordion-ribbed interior of flex foil traps lint by design — every rib is a micro-catch — and once the material has thermal-fatigued and split at elbow joints, no amount of brushing restores it. Clean-only services on 2010-2017 Riverview homes often see repeat airflow problems within six months because the failing material re-traps lint faster than a sound rigid-metal duct would. Replacement is the real fix.",
      },
      {
        q: 'How do I know if my Riverview home has flex foil or rigid metal duct?',
        a: "If your home was permitted 2018 or later, it is almost certainly rigid metal by code (IRC 2018 R303.6). If it was permitted 2010-2017 — including most of Panther Trace, Rivercrest, South Fork, Summerfield Crossings, St. Andrews — flex foil is the default builder spec and the odds are high it is still in place. A camera inspection ($149 inspection-only) confirms the material and its condition before you commit to cleaning scope or replacement.",
      },
    ],
    responseNote:
      "Riverview addresses are 25-40 minutes from our Tampa base via I-75 and US-301. We run a standing Riverview route and camera inspection kit travels on every truck — no second trip to diagnose flex-foil failure. Same-week scheduling is the norm on Panther Trace, South Fork, and Summerfield Crossings; rigid-metal replacement parts in 4-inch diameter are stocked in-truck for runs up to 35 feet, plus the standard elbow counts and exterior cap replacements needed for a full flex-to-rigid conversion, so most cohort-failure jobs finish on the same visit as the cleaning without a callback. Saturday appointments available with no weekend surcharge; block-day HOA requests coordinated through Panther Trace and Rivercrest management are accommodated directly with documented per-home airflow readings in a compliance-ready packet.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. CLEARWATER — beach sand + salt aerosol + vacation-rental turnover
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'clearwater',
    metaTitle: 'Clearwater Dryer Vent Cleaning | Beach Condo & Sand-Salt Specialists',
    metaDescription:
      'Clearwater dryer vent and dryer duct cleaning for Clearwater Beach, Island Estates, Sand Key, Countryside. HEPA containment for sand, vacation-rental turnaround, flat-rate from $129.',
    heroSubtitle:
      "Clearwater is not a Brandon tract-home job. Beach condos, vacation rentals, and shared vertical vent stacks need HEPA containment, sand-aware equipment, and a crew that understands salt-aerosol interactions — not a franchise playbook copy-pasted from the mainland.",
    longIntro:
      "Clearwater dryer vent cleaning is a fundamentally different protocol than mainland Tampa Bay work because three factors stack only here: airborne fine beach sand, continuous salt aerosol, and the fastest lint-accumulation rate in Pinellas County driven by vacation-rental guest turnover. Clearwater Beach, Sand Key, and Island Estates dryer duct runs route through shared vertical chases in the high-rise condo stock — one clogged unit degrades the entire column. Fine sand bonds with lint into an abrasive compound that damages dryer drum surfaces and destroys standard shop-vac filters on contact. Short-term Airbnb and HOA vacation-rental properties here see back-to-back guest laundry cycles that push lint accumulation past a 6-month cycle on the busiest beach-block condos. The Airflow team runs HEPA containment equipment rated for sand capture, carries 316 stainless exterior hardware for salt-spray addresses, and handles every Clearwater ZIP — 33755, 33756, 33759-33765, 33767 — across Countryside, Morningside, Skycrest mainland stock and the beach-condo tower inventory.",
    whyClogHere:
      "Clearwater's vent problems are driven by a three-factor stack that does not exist anywhere else in the Tampa Bay metro. First, beach sand. Airborne fine silica-based sand is present continuously on Clearwater Beach, Sand Key, and Island Estates, and it enters dryer duct systems through exterior terminations and interior intake. Once inside, sand bonds with lint by static and humidity into an abrasive compound — this compound scrubs dryer drum interior surfaces over time, accelerates metal ducting wear at elbow interior walls, and destroys standard HEPA shop-vac filters in a single job. The abrasion effect on drum interiors is the single most under-reported cause of premature dryer replacement on Clearwater beach-block addresses, and it compounds over the lifespan of the appliance regardless of how often the lint trap is emptied. Second, salt aerosol. The same waterfront exposure that drives canal-corrosion at Apollo Beach drives continuous salt corrosion of exterior vent cap hardware on every beach-block address — six-to-twelve-month hardware cycles on standard galvanized, versus three-to-five-year cycles for inland addresses. Salt interacts with sand and humidity inside the dryer duct to form a slightly acidic film that accelerates interior metal degradation at every elbow joint. Third, vacation-rental guest-load velocity. Clearwater's dense short-term rental inventory (Airbnb, VRBO, HOA vacation-rental stock) sees back-to-back guest laundry — a busy beach-week unit can run six-to-ten loads in seventy-two hours, more than a typical full-time residential household runs in three weeks. Combined with shared-vertical-chase dryer duct routing in the high-rise condo stock (Island Estates towers, Sand Key towers), a single clogged unit propagates airflow resistance through the entire column and, in the worst cases, backdrafts humid lint-laden air into adjacent units on the same riser. Some Clearwater HOAs enforce short-term-rental certification requirements that mandate documented quarterly vent service; the paperwork side of that work — airflow readings, photo documentation, date-stamped invoices — is familiar territory for a local operator but unfamiliar territory for a franchise field tech. Annual cleaning is the NFPA 211 floor; six-month cycles are the practical baseline for any beach-adjacent vacation rental.",
    neighborhoodDetail: [
      {
        name: 'Clearwater Beach',
        zip: '33767',
        detail:
          'Beach-block high-rise condo towers and vacation-rental inventory — the fastest-lint-accumulation addresses in Pinellas. HEPA containment and sand-aware filter spec is standard; shared vertical dryer duct chases require building-management coordination on multi-unit work.',
      },
      {
        name: 'Island Estates',
        zip: '33767',
        detail:
          "Gated island community with high-rise towers and canal-front single-family homes off Memorial Causeway. Continuous salt aerosol drives 6-12 month exterior cap hardware cycles; we specify 316 stainless or powder-coated aluminum replacement, never standard galvanized.",
      },
      {
        name: 'Sand Key',
        zip: '33767',
        detail:
          "Narrow barrier-island high-rise condo corridor south of Clearwater Beach — dense tower inventory with shared vertical vent stacks. Building-access coordination and HEPA-rated equipment are non-negotiable here; franchise crews typically skip shared-stack work entirely.",
      },
      {
        name: 'Belleair',
        zip: '33756',
        detail:
          'Established upscale residential community on the mainland bluffs — older single-family housing stock with some original mid-century vent materials still in place. Less sand exposure than barrier-island addresses but salt aerosol still reaches these addresses on prevailing winds.',
      },
      {
        name: 'Countryside',
        zip: '33761',
        detail:
          'Mainland master-planned community with 1980s-2000s single-family housing — the Clearwater cleaning job that most closely resembles a standard mainland Tampa Bay visit, but still within the salt-aerosol drift zone for exterior cap hardware decisions.',
      },
      {
        name: 'Morningside',
        zip: '33759',
        detail:
          "Established mainland Clearwater neighborhood with predominantly 1960s-1980s single-family homes — older builder-grade vent materials are common and frequently surface for replacement during cleaning. No direct beach exposure but salt still shortens exterior cap life.",
      },
      {
        name: 'Skycrest',
        zip: '33755',
        detail:
          "Older mainland residential neighborhood north of downtown Clearwater — mid-century single-family housing stock with a share of original undersized 3-inch dryer duct that needs code-update to 4-inch rigid metal during cleaning.",
      },
      {
        name: 'Clearwater Downtown',
        zip: '33755',
        detail:
          "Mid-rise residential and mixed-use corridor along Cleveland Street — a mix of converted older buildings and newer infill construction with varied vent routing that rewards camera inspection over assumption.",
      },
    ],
    includesList: [
      'HEPA-rated containment equipment with sand-capable filter media (standard shop-vac filters destroy on Clearwater beach-block work)',
      'Pre-cleaning camera inspection on shared-vertical-chase high-rise condo stock (Island Estates, Sand Key, Clearwater Beach towers)',
      'Building-management and HOA access coordination for multi-unit and shared-stack dryer duct work',
      '316 stainless-steel or powder-coated aluminum exterior vent cap replacement for beach-block salt-exposure addresses',
      'Full rotary brush cleaning of the dryer duct from transition hose to exterior termination',
      'Pre- and post-airflow measurement with calibrated anemometer (recorded on invoice)',
      'Short-term-rental certification documentation packet when HOA paperwork is required',
      'Written report with photos, airflow numbers, and recommended re-cleaning cycle within 24 hours',
    ],
    pricingNotes:
      "Clearwater pricing splits by housing type. Beach condo and high-rise tower units — Clearwater Beach, Sand Key, Island Estates — fall into the $129-$199 condo / townhouse band; shared-vertical-chase work that requires building coordination may land at the top of that range. Mainland single-family homes in Countryside, Morningside, and Skycrest run $149-$249 with the standard +$50 second-floor surcharge where it applies. Beach-block addresses needing 316 stainless or powder-coated aluminum exterior cap replacement carry a $65-$125 parts-plus-install line (the upgrade pays back in 1-2 cycles versus standard galvanized). Wall ductwork repair ($195-$595) surfaces most often in the older Morningside and Skycrest mid-century stock. Inspection-only is $149. Commercial and multi-unit HOA block work is custom-quoted. Zero surprise pricing — the rate range travels with the job.",
    counterPositioning:
      "Franchise field techs treat Clearwater Beach condos with the same playbook they use for Brandon tract homes — same wand, same filter, same forty-five-minute schedule block. The sand-plus-salt plus saltwater-humidity stack demands different containment, different equipment, and different scheduling. Corporate routing centers behind the FTC-mandated \"independently owned and operated franchises\" disclosure dispatch whichever operator is rotating through; they do not carry HEPA sand-media filters, 316 stainless cap inventory, or the shared-stack coordination habits this market requires.",
    testimonial: {
      text: "Top-floor unit on Sand Key, vacation-rental certification renewal coming up and the HOA needed a documented cleaning with airflow readings. Called a national chain first — they quoted a flat rate over the phone, showed up, took one look at the shared riser stack and said they do not do that work. Airflow came out the next day, coordinated with building management, ran HEPA containment, cleaned the unit stack, provided the paperwork for the HOA certification file. Airflow before and after on the invoice. That is what I was paying for the first time and did not get.",
      author: 'Karen B.',
      neighborhood: 'Sand Key',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Clearwater?',
        a: "January and September are the two Tampa Bay demand peaks, each running near 880 monthly searches. Clearwater layers on a secondary vacation-rental turnover cycle — March-April and October are HOA certification renewal windows that concentrate short-term-rental cleaning demand. The easiest months to book individual Clearwater appointments are May-June and November for mainland work; beach-block condo work is always tighter because of building-access coordination.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Clearwater?',
        a: "Beach condo and high-rise tower units (Clearwater Beach, Sand Key, Island Estates) fall into the $129-$199 condo band. Mainland single-family homes in Countryside, Morningside, Skycrest run $149-$249 with $50 second-floor surcharge where applicable. Beach-block addresses needing 316 stainless or powder-coated aluminum exterior cap replacement carry a $65-$125 parts-plus-install line. Wall ductwork repair is $195-$595 when needed; inspection-only is $149. Commercial and multi-unit HOA work is custom-quoted.",
      },
      {
        q: 'Why do beach condos need different equipment than mainland homes?',
        a: "Because airborne fine beach sand bonds with lint by static and humidity into an abrasive compound that destroys standard shop-vac filter media on contact and scrubs dryer drum surfaces over time. HEPA-rated sand-capable filter media is required to contain the material during cleaning without dumping it back into the condo unit, and shared vertical vent stacks in the tower inventory demand camera inspection and building-management coordination that franchise playbooks skip entirely.",
      },
      {
        q: 'My Clearwater Beach unit is in an HOA that requires documented vent cleaning. Can you provide the paperwork?',
        a: "Yes. Several Clearwater and Sand Key HOAs enforce short-term-rental certification requirements that include documented quarterly or annual vent service. We provide a certification-ready packet on every relevant job: pre- and post-airflow anemometer readings, photographic documentation of the cleaning, invoice line-items, and date-stamped records suitable for the HOA compliance file. This is standard documentation on every Clearwater job, not a premium add-on.",
      },
      {
        q: 'How often should a Clearwater vacation rental get vent cleaning?',
        a: "Six months is the practical baseline for any beach-adjacent short-term-rental unit because guest-turnover laundry velocity — back-to-back six-to-ten loads in seventy-two hours on a busy beach week — accumulates lint faster than full-time residential use. Owner-occupied beach condos can run the annual NFPA 211 floor. Mainland Countryside and Morningside single-family homes follow the standard annual schedule unless household laundry volume pushes toward a 9-month cycle.",
      },
    ],
    responseNote:
      "Clearwater addresses are 35-55 minutes from our Tampa base via the Courtney Campbell or Howard Frankland. We run a standing Clearwater route on two weekdays; beach-block and shared-stack condo work is scheduled on dedicated days because of building-management coordination. HEPA sand-media filters, 316 stainless cap inventory, and short-term-rental certification packets travel on every truck. Saturday appointments available with no weekend surcharge — useful for vacation-rental turnover-day scheduling.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. LAND O' LAKES — 2005-2010 insulation-compression vent kinks
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'land-o-lakes',
    metaTitle: "Land O' Lakes Dryer Vent Cleaning | Camera-First Inspection",
    metaDescription:
      "Land O' Lakes dryer vent and dryer duct cleaning for Ballantrae, Connerton, Pebble Creek, Stonegate. Camera-first inspection for 2005-2010 builds, flat-rate from $149.",
    heroSubtitle:
      "Land O' Lakes 2005-2010 builds have insulation-compressed dryer duct paths hidden inside second-floor walls and attic chases. A flat phone quote cannot price what a camera has not seen. We inspect first, quote second.",
    longIntro:
      "Land O' Lakes dryer vent cleaning is a camera-first discipline because the 2005-2010 Pasco County build cohort does not have standard vent runs — it has insulation-compressed dryer duct paths with kinks and dips hidden inside second-floor walls and attic chases. Master-planned communities across Ballantrae, Connerton, Chapel Pines, Stonegate, Pebble Creek, Lake Padgett Estates, Stagecoach, and Wilderness Lake built 2005-2018 are now hitting the 15-to-20-year first-deep-clean window simultaneously, and the pre-recession 2005-2010 permit cohort is the one where rushed insulation crews compressed cellulose and fiberglass around dryer vent runs in ways that produced systematic kink-and-dip patterns along the metal duct path. A flat phone-quote service cannot price what it has not seen. The Airflow team runs camera inspection before quoting scope on every Land O' Lakes 2005-2010-cohort address and services every ZIP from 34637 through 34639.",
    whyClogHere:
      "Land O' Lakes vent problems are rooted in a specific construction-era pattern that Pasco County permit records make visible: the 2005-2010 pre-recession build cohort was rushed. Framing schedules compressed, insulation subcontractor crews rotated fast, and the practical consequence was that cellulose and fiberglass insulation was often packed around dryer duct runs inside second-floor walls and attic chases without regard for the duct path's geometry. Compressed insulation against metal dryer duct creates two problems. First, it kinks and dips the duct path — a straight factory-rated 4-inch metal run becomes, in practice, a series of subtle shallow sags and pinch-points that trap lint by design and compound airflow resistance. Second, the compression is invisible from both ends of the duct; from the dryer transition and from the exterior cap the run looks fine, and a cleaning wand passes through it without catching on anything. Only a camera inspection from inside the duct reveals the kink-and-dip pattern. A clean-only job on a kinked duct addresses symptoms, not cause — the lint reaccumulates at the same dip within months because the geometry that trapped it in the first place is still there. The 2005-2010 cohort is also now entering its 15-to-20-year first-deep-clean window, which means the kink-trapped lint has had nearly two decades to compact, and humidity-bound compaction (Tampa Bay dew points above 70°F for half the year) pushes the material toward a felt-mat state that rotary brushes have to scrub through segment by segment. Attic-chase routing adds a second compounding factor: Pasco summer attic temperatures regularly exceed 140°F, which thermally cycles the metal duct material and relaxes any factory-bent elbows near compressed insulation points — the dips deepen over time rather than stabilizing. Flat phone-quote pricing assumes a standard vent run; Land O' Lakes 2005-2010 builds do not have standard runs. Two addresses on the same Connerton street with the same floor plan can have dramatically different cleaning scope because the insulation crews on the day those particular homes were framed produced different compression patterns inside the walls. Camera inspection first, scope and price after.",
    neighborhoodDetail: [
      {
        name: 'Ballantrae',
        zip: '34638',
        detail:
          'Large 2003-2012 master-planned community — the early Ballantrae phases are core 2005-2010 insulation-compression cohort territory. Camera inspection before cleaning routinely surfaces kink-and-dip patterns in second-floor duct runs that wand-only services pass through without noticing.',
      },
      {
        name: 'Connerton',
        zip: '34637',
        detail:
          'Master-planned 2005-2018 community with mixed phase ages — the earliest Connerton sections (2005-2009) are deepest into the insulation-compression kink-dip pattern; later phases (2012-2018) have cleaner duct paths but are now hitting the 15-year first-deep-clean window.',
      },
      {
        name: 'Chapel Pines',
        zip: '34638',
        detail:
          "Established 2000s master-planned community — primarily two-story floor plans with second-floor laundry and dryer duct paths routed through attic chases where 2005-2008 insulation-compression kinks are the dominant pattern.",
      },
      {
        name: 'Stonegate',
        zip: '34638',
        detail:
          'Mid-2000s master-planned subdivision — the 2005-2009 Stonegate permit cohort is classic insulation-compression kink territory. Flat phone-quote pricing here is unreliable because the real scope only surfaces after camera inspection.',
      },
      {
        name: 'Pebble Creek',
        zip: '34639',
        detail:
          "Established 1990s-2000s community with mixed housing age — the older 1990s phases pre-date the insulation-compression cohort but have their own issues with original flex-foil transition duct, while the 2005-2009 infill sections have the systematic kink-dip pattern.",
      },
      {
        name: 'Lake Padgett Estates',
        zip: '34639',
        detail:
          "Older established waterfront and equestrian-zoned community north of Land O' Lakes proper — larger lot sizes and non-standard vent installations (pool houses, detached laundry rooms) are common, requiring rotary brush reach configurations beyond typical suburban kits.",
      },
      {
        name: 'Stagecoach',
        zip: '34638',
        detail:
          "Master-planned 2005-2015 community — core 2005-2010 insulation-compression cohort. The systematic kink-dip pattern is visible under camera inspection on the original phases; camera-first inspection is standard practice here rather than an upsell.",
      },
      {
        name: 'Wilderness Lake',
        zip: '34637',
        detail:
          "Gated 2000s master-planned community with larger executive two-story floor plans and second-floor laundry as the dominant standard — the longer runs compound the 2005-2010 insulation-compression kink problem because each subtle dip is one more lint-trap zone in a 30-foot duct path.",
      },
    ],
    includesList: [
      'Camera-first inspection of the dryer duct path on every 2005-2010 permit cohort address before quoting scope (wand-only services skip this)',
      'Documentation of insulation-compression kink-and-dip locations with photos pulled from the camera feed',
      'Rotary brush cleaning sized to actual duct diameter with multi-segment passes to scrub through compacted lint at each kink zone',
      'Pre- and post-airflow measurement with calibrated anemometer (recorded on invoice)',
      'Exterior termination cap inspection, cleaning, and bird-guard verification',
      'Identification of any out-of-code flexible foil or semi-rigid duct material still in service',
      'Remediation quote with before-and-after photos when kinks need physical access repair (wall ductwork repair line)',
      'Written report with airflow numbers, camera-feed stills, and recommended re-cleaning cycle within 24 hours',
    ],
    pricingNotes:
      "Land O' Lakes pricing tracks the $149-$249 single-family band, with most Connerton, Ballantrae, Chapel Pines, and Stonegate two-story floor plans landing at $199-$249 because of the standard +$50 second-floor surcharge. The Land O' Lakes-specific practice is the camera-first inspection — we quote the cleaning scope after we have seen the duct path, not before. On 2005-2010 cohort addresses, wall ductwork repair ($195-$595) surfaces as a quoted line item more often than the Tampa Bay average because insulation-compression kinks occasionally need physical access repair that goes beyond cleaning. Condo / townhouse work (Pebble Creek and similar) falls in the $129-$199 band. Inspection-only is $149 and is a reasonable standalone audit step for a Land O' Lakes homeowner who wants scope documentation before committing to cleaning spend.",
    counterPositioning:
      "Franchise quote-before-arrival pricing assumes a standard vent run; Land O' Lakes 2005-2010 builds do not have standard runs — they have insulation-compressed dips that drive up the actual work on-site and make a flat phone quote unreliable. The corporate routing center behind the FTC-mandated \"independently owned and operated franchises\" disclosure cannot deploy a camera-first inspection flow because the operator rotates visit-to-visit. We quote after camera inspection so the price is real.",
    testimonial: {
      text: "Connerton two-story, original 2007 build. Had a national chain quote me $129 over the phone, showed up with a wand and a shop vac, spent twenty minutes, left. Dryer still took two cycles for a load of jeans. Airflow came out, ran a camera first, showed me a spot in the second-floor wall where insulation had collapsed the duct into a shallow dip — lint was packed solid at that point and the wand never reached it. Rotary brush scrubbed through, before-and-after airflow on the invoice. Actually fixed.",
      author: 'Ryan P.',
      neighborhood: 'Connerton',
    },
    cityFaqs: [
      {
        q: "When is dryer vent cleaning busiest in Land O' Lakes?",
        a: "January and September are the Tampa Bay demand peaks, each running near 880 monthly searches. Land O' Lakes concentrates demand in the January cold-snap window and the August-September back-to-school ramp common across the master-planned family-home submarkets. October and February-March are the easiest months to book individual weekday appointments without waiting on peak-season timing.",
      },
      {
        q: "How much does dryer vent cleaning cost in Land O' Lakes?",
        a: "Single-story homes fall into $149-$249; most two-story Connerton, Ballantrae, Chapel Pines, and Stonegate floor plans land at $199-$249 with the standard $50 second-floor surcharge. Condo / townhouse work is $129-$199. Wall ductwork repair ($195-$595) surfaces more often than average on 2005-2010 cohort addresses because of insulation-compression kinks needing physical access repair. Inspection-only is $149. We quote scope after camera inspection — the price on the invoice matches the quote, every job.",
      },
      {
        q: 'Why does my 2008 home in Ballantrae need a camera inspection before cleaning?',
        a: "Because the 2005-2010 Pasco permit cohort was built fast, and insulation crews regularly compressed cellulose and fiberglass around dryer duct runs inside second-floor walls and attic chases in ways that produced systematic kinks and dips along the metal duct path. Those compressions are invisible from both ends of the duct; only a camera feed from inside the run reveals them. Cleaning without knowing where the kinks are is cleaning blind, and lint reaccumulates at the same dip within months.",
      },
      {
        q: 'Can you just give me a flat phone quote?',
        a: "For 2015-and-later Land O' Lakes addresses with clean straight duct paths, yes — the standard $149-$249 single-family / $129-$199 condo ranges apply and the invoice matches the range. For the 2005-2010 cohort in Connerton, Ballantrae, Chapel Pines, Stonegate, and Stagecoach we decline to lock a flat phone quote before camera inspection because insulation-compression kinks change the actual scope. We prefer to inspect ($149), document the duct path, and quote real scope rather than surprise you on the invoice.",
      },
      {
        q: "How often should a Land O' Lakes home get vent cleaning?",
        a: "Annual is the NFPA 211 baseline and the right schedule for most Land O' Lakes households. The 2005-2010 cohort addresses where insulation-compression kinks are present benefit from a 9-month cycle until the kinks are physically remediated, because lint reaccumulates faster at each dip zone. Owner-occupied single-story homes and post-2015 clean-duct-path builds can run the annual schedule without additional concern.",
      },
    ],
    responseNote:
      "Land O' Lakes addresses are 30-45 minutes from our Tampa base via the Suncoast Parkway or I-75. Camera inspection kits travel on every truck — no second trip to diagnose insulation-compression kinks or scope wall-ductwork repair. Same-week scheduling is the norm; rigid-metal replacement parts cover standard 4-inch runs up to 35 feet in-truck for single-visit remediation. Saturday appointments available with no weekend surcharge.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. LUTZ — equestrian rural + 40+ ft detached-structure vent runs
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'lutz',
    metaTitle: 'Lutz Dryer Vent Cleaning | 40+ ft Detached-Structure Runs',
    metaDescription:
      'Lutz dryer vent and dryer duct cleaning for Cheval, Van Dyke Farms, Stonebridge, Heritage Harbor. Detached-structure specialists, 50-foot rotary reach, flat-rate from $149.',
    heroSubtitle:
      "Lutz is Tampa equestrian country. Mother-in-law suites, pool houses, barn-converted workshops, and breezeway laundry rooms push dryer duct runs past 40 feet. One appointment, every structure. No re-dispatch, no second invoice.",
    longIntro:
      "Lutz dryer vent cleaning is a rural-outskirts discipline that does not exist in the standard Tampa-suburb franchise playbook. Lutz housing stock splits between equestrian and large-lot estates (Van Dyke Farms, Stonebridge, Lake Park) and newer subdivision infill (Cheval, Calusa Trace, Heritage Harbor) — and the rural-zone addresses commonly have detached mother-in-law suites, pool houses, barn-converted workshops with laundry hookups, or breezeway laundry rooms where the dryer duct run from the appliance to the exterior termination exceeds forty feet. That is beyond the rotary-brush reach of standard suburban cleaning kits. Add equestrian-zone airborne particulate — fine hay dust, feed dust, and pollen load materially higher than typical suburban Tampa — and cleaning frequency shifts from annual to semiannual for any address with horses on-property. The Airflow team carries a rotary brush kit rated for fifty-foot reach, services ZIP codes 33548, 33549, and 33558, and handles main house plus every secondary structure on one appointment — no per-structure re-dispatch.",
    whyClogHere:
      "Lutz's vent problems are a direct consequence of its zoning and housing pattern. The equestrian and large-lot estate sections — Van Dyke Farms, Stonebridge, Lake Park, parts of Heritage Harbor — commonly have detached structures with laundry: a mother-in-law suite over a detached garage, a pool house with a washer-dryer stack, a barn-converted workshop with hookups, or a breezeway laundry room between main house and secondary structure. The dryer duct run from a detached-structure laundry to a code-compliant exterior termination routinely exceeds forty feet because the structure itself is set back from the property line and the duct has to travel to a wall or roof cap location that is not over a living space. Standard suburban cleaning kits with 30-foot rotary brushes physically cannot reach the middle of these runs; wand-only setups reach ten feet from each end and leave twenty feet uncleaned. Secondary-structure runs also tend to be installed by handymen or general contractors rather than dedicated HVAC trades, which means elbow configurations, transition materials, and termination styles vary wildly from code-standard and often surface as surprises during camera inspection. Separately, equestrian-zone airborne particulate is a different animal than typical suburban Tampa air. Fine hay dust, feed dust, grain particulate, and horse-barn pollen stack are materially higher than non-equestrian addresses, and that particulate enters dryer duct systems through exterior terminations and mixes with lint into a denser compound that compacts faster. Cleaning frequency for equestrian addresses shifts from annual (NFPA 211 baseline) to semiannual — six-month cycles — as a realistic schedule. Add Tampa Bay dew points above 70°F for half the year and the particulate-lint compound becomes humidity-bound and felt-like, which rotary brushes have to scrub through segment by segment rather than glide through. The largest lots in Van Dyke Farms and Stonebridge also tend to have multiple dryers across the property — main house, guest suite, occasionally a staff quarters — each with its own duct path and its own cleaning requirement, and coordinating all of them on a single visit is the only sensible way to service these addresses without burning an entire day on re-dispatch logistics. Lutz rural-zone vent runs do not exist in the franchise playbook — they are a Tampa-outskirts edge case that local operators either know or refuse.",
    neighborhoodDetail: [
      {
        name: 'Cheval',
        zip: '33558',
        detail:
          "Gated upscale golf-course community — predominantly two-story executive homes with standard suburban vent routing, but a share of the estate-lot sections have detached pool houses or guest suites with secondary laundry and extended dryer duct runs.",
      },
      {
        name: 'Van Dyke Farms',
        zip: '33558',
        detail:
          'Equestrian-zoned large-lot community — horse-property density is high, detached mother-in-law suites and barn-converted workshops with laundry are common, and the 50-foot rotary brush reach kit is frequently the only way to clean the secondary-structure runs properly.',
      },
      {
        name: 'Stonebridge',
        zip: '33558',
        detail:
          "Large-lot established community with mixed equestrian and residential zoning — detached-structure dryer duct runs past 40 feet are common enough that camera inspection is the right starting step before committing to cleaning scope.",
      },
      {
        name: 'Lake Park',
        zip: '33548',
        detail:
          "Older established Lutz community near the Lake Park recreational area — mix of residential and rural-zoning addresses, with equestrian-adjacent particulate load driving 6-month cycles on the horse-property side of the neighborhood.",
      },
      {
        name: 'Calusa Trace',
        zip: '33558',
        detail:
          "Newer upscale subdivision infill — primarily two-story single-family homes with standard suburban vent routing. Less equestrian-zone particulate load than Van Dyke Farms or Stonebridge, but still within the Lutz 6-month-cycle drift zone on pollen-heavy springs.",
      },
      {
        name: 'Heritage Harbor',
        zip: '33558',
        detail:
          "Gated master-planned community with golf-course sections and larger executive floor plans — standard suburban vent routing for the core housing, but a share of the estate sections include detached pool houses and guest-suite laundry rooms that need the 50-foot brush reach kit.",
      },
      {
        name: 'Lutz Proper',
        zip: '33549',
        detail:
          "The core Lutz ZIP with mixed residential and rural-zoned housing — some 1970s-1990s original builder-grade flexible foil transition duct still in place on unrenovated homes, often replaced with rigid metal during first professional cleaning.",
      },
    ],
    includesList: [
      'Rotary brush kit rated for 50-foot reach — standard equipment for Lutz detached-structure runs beyond typical suburban kit capacity',
      'Camera inspection before cleaning on any detached-structure run exceeding 40 feet to scope the actual path',
      'Main house plus secondary-structure cleaning on one appointment (no per-structure re-dispatch, no second invoice)',
      'Equestrian-particulate-aware filter media for addresses with horses on-property or adjacent horse-barn exposure',
      'Pre- and post-airflow measurement with calibrated anemometer on every structure serviced',
      'Exterior termination cap inspection, cleaning, and bird-guard verification at each structure',
      'Identification of any out-of-code flexible foil or semi-rigid duct material still in service on older rural-zone addresses',
      'Written report per structure with airflow numbers, photos, and 6-month or annual re-cleaning recommendation within 24 hours',
    ],
    pricingNotes:
      "Lutz pricing accommodates the secondary-structure reality. A standard single-structure Lutz home falls into the $149-$249 residential band with the $50 second-floor surcharge where applicable — most Cheval, Heritage Harbor, and Calusa Trace two-story homes land at $199-$249. Multi-structure Lutz addresses (main house plus pool house, main house plus mother-in-law suite, main house plus barn-converted workshop) are quoted on one appointment with a per-structure rate — typically the main structure at standard pricing plus a reduced rate per secondary structure because the crew is already on-site. Wall ductwork repair ($195-$595) is quoted per structure as-needed. Equestrian-particulate addresses should plan on the 6-month cycle which doubles annual spend but keeps airflow consistent. Inspection-only is $149 per structure. Condo / townhouse stock (rare in Lutz) is $129-$199.",
    counterPositioning:
      "Lutz rural-zone vent runs do not exist in the franchise playbook — they are a Tampa-outskirts edge case. Local operators either know the work or refuse the job. The corporate routing center behind the FTC-mandated \"independently owned and operated franchises\" disclosure dispatches crews with standard 30-foot rotary kits that physically cannot reach the middle of a 45-foot detached-structure run, and franchise crews typically quote per-structure with re-dispatch between visits. One appointment, every structure, stocked for the reach this market needs.",
    testimonial: {
      text: "Van Dyke Farms, horse property with a mother-in-law suite above the detached garage. Called a national chain first — they quoted main house only, said the secondary structure would need a separate dispatch, did not mention their kit could not reach the 45-foot run anyway. Airflow came out, ran the 50-foot rotary on both structures in one appointment, showed me the equestrian-particulate compaction in the secondary-structure run that had been there since the last cleaning years ago. One invoice, airflow numbers for each structure, done.",
      author: 'Susan H.',
      neighborhood: 'Van Dyke Farms',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Lutz?',
        a: "January and September are the Tampa Bay demand peaks, each running near 880 monthly searches. Lutz equestrian addresses layer on a pollen-season spike in March-April because of the higher airborne particulate load on horse properties. October-November is the easiest window for multi-structure estate appointments; individual main-house jobs book easily in May-June.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Lutz?',
        a: "Standard single-structure Lutz homes fall into $149-$249; most two-story Cheval, Heritage Harbor, and Calusa Trace floor plans land at $199-$249 with the $50 second-floor surcharge. Multi-structure addresses (main house plus pool house, mother-in-law suite, or barn-converted workshop) are quoted on one appointment with the main structure at standard pricing and a reduced per-structure rate for each secondary. Wall ductwork repair is $195-$595 per structure as-needed. Inspection-only is $149 per structure. Condo work is $129-$199.",
      },
      {
        q: 'I have a detached pool house with a washer-dryer. Do I need a separate appointment?',
        a: "No. We handle main house plus every secondary structure on one appointment — no per-structure re-dispatch, no second invoice, no second trip charge. The rotary brush kit rated for 50-foot reach travels on every Lutz route truck, which covers the 40-plus-foot detached-structure runs that standard suburban kits cannot reach. Each structure gets its own airflow reading on the invoice and its own written report.",
      },
      {
        q: "My Van Dyke Farms property has horses. Does that change the cleaning schedule?",
        a: "Yes. Equestrian-zone airborne particulate — fine hay dust, feed dust, grain particulate, and horse-barn pollen — is materially higher than typical suburban Tampa air, and that particulate enters the dryer duct through exterior terminations and mixes with lint into a denser, faster-compacting compound. Cleaning frequency for horse-property addresses shifts from annual (NFPA 211 baseline) to semiannual — six-month cycles — as a realistic schedule that keeps airflow consistent.",
      },
      {
        q: 'Why can my national-chain cleaner not reach the middle of my 45-foot detached-structure duct?',
        a: "Because standard suburban rotary brush kits are sized for 30-foot maximum reach — adequate for typical two-story tract-home runs, insufficient for Lutz detached-structure geometry. Wand-only setups reach ten feet from each end of the duct and leave twenty-plus feet in the middle uncleaned. The 50-foot rotary brush kit is specialty equipment for this exact Tampa-outskirts edge case, and it is standard on our Lutz route trucks.",
      },
    ],
    responseNote:
      "Lutz addresses are 25-40 minutes from our Tampa base via the Suncoast Parkway or Dale Mabry extension. The 50-foot rotary brush kit for detached-structure runs is standard on every truck assigned to the Lutz route — no second trip to return with bigger equipment. Same-week scheduling is the norm; multi-structure estate appointments are scheduled slightly longer to fit every structure into one visit. Saturday appointments available with no weekend surcharge.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. VALRICO — FishHawk Ranch phase-by-phase + Facebook referral network
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'valrico',
    metaTitle: 'Valrico Dryer Vent Cleaning | FishHawk Ranch Phase Specialists',
    metaDescription:
      'Valrico dryer vent and dryer duct cleaning for FishHawk Ranch (Starling, Garcia, Park Square, Palmetto Cay), Bloomingdale, Diamond Hill. Phase-level specialists, flat-rate from $149.',
    heroSubtitle:
      "FishHawk Ranch is not one neighborhood — it is Starling, Garcia, Park Square, Palmetto Cay, and a dozen more phases built by different contractors across 2001-2018. A crew that has done 800 FishHawk homes can pattern-match the vent routing from the street name alone.",
    longIntro:
      "Valrico dryer vent cleaning is, in practice, FishHawk Ranch phase-by-phase cleaning plus the established Valrico suburb inventory. FishHawk Ranch is the 10,000-plus-home master-planned community that dominates the slug — and FishHawk is not one neighborhood. It is Starling, Garcia, Park Square, Palmetto Cay, and a dozen more phases built by different primary contractors across roughly 2001 through 2018. Each phase has subtly different vent layouts, different builders, and different insulation standards, which means the dryer duct routing varies by phase in ways that pattern-match from the street name alone once a crew has run the neighborhood long enough. Around FishHawk, Valrico also includes Bloomingdale, Diamond Hill, River Hills, Buckhorn, and Valrico proper — established 1990s-2000s suburban stock hitting the 20-year original-material replacement window. The Airflow team has worked hundreds of FishHawk homes over the years, services every Valrico ZIP (33594, 33596) and the FishHawk 33547 boundary, and carries the phase-level knowledge the national chains cannot staff for.",
    whyClogHere:
      "Valrico's cleaning pattern is dominated by FishHawk Ranch phase-level construction variation layered onto the broader Valrico 1990s-2000s suburban inventory. FishHawk was built over roughly seventeen years — 2001 through 2018 — and the phases evolved substantially across that span. Starling (early 2000s) was built to different spec than Garcia (mid-2000s), which was built different than Park Square (late 2000s), which was built different than Palmetto Cay (2010s). Different primary contractors specified different transition-duct materials, different elbow configurations, different second-floor-laundry routing conventions. Some phases exit the exterior wall through side soffit, some through rear wall, some through roof cap — and the lint-trap zone patterns inside the duct path vary accordingly. A crew that has done 800 FishHawk homes can pattern-match the vent routing from a street name in Starling versus Garcia and plan the visit accordingly — rotary brush size, reach length, ladder position, inspection camera angle. A franchise truck visiting once a month cannot. Separately, Bloomingdale, Diamond Hill, and River Hills are now 20-to-25-year-old original-construction stock where original builder-grade flexible foil and semi-rigid duct material is at end-of-life and the dryer duct replacement line is on most invoices. The FishHawk community Facebook group has 15,000+ members and is one of the fastest-moving referral networks in the Tampa suburbs; a single review here propagates through the network faster than almost anywhere else, which means the quality bar for any crew working FishHawk is set by the community's ability to surface problems in real time. Annual cleaning is the NFPA 211 floor across Valrico; 9-month cycles are reasonable for the highest-volume FishHawk family households.",
    neighborhoodDetail: [
      {
        name: 'FishHawk Ranch — Starling',
        zip: '33547',
        detail:
          "Early-2000s FishHawk phase — different primary contractor than Garcia and Park Square, different vent pitch and exterior termination conventions. Pattern-matches by street name for a crew that has worked hundreds of Starling homes.",
      },
      {
        name: 'FishHawk Ranch — Garcia',
        zip: '33547',
        detail:
          "Mid-2000s FishHawk phase with distinct floor-plan mix and vent routing conventions versus Starling — different builder, different insulation standard, different exterior cap style on the original builds. Phase-specific pattern library matters here.",
      },
      {
        name: 'FishHawk Ranch — Park Square',
        zip: '33547',
        detail:
          "Late-2000s FishHawk phase — executive floor plans with longer second-floor dryer duct runs than earlier phases, and a different set of elbow-configuration conventions that change how multi-segment rotary brush cleaning has to be staged.",
      },
      {
        name: 'FishHawk Ranch — Palmetto Cay',
        zip: '33547',
        detail:
          "2010s FishHawk phase — the newest core phase with rigid-metal-by-code dryer duct on most builds and different builder conventions again. Entering its first deep-clean window now that homes are 10-15 years old.",
      },
      {
        name: 'Bloomingdale',
        zip: '33596',
        detail:
          "Established 1980s-1990s master-planned community with predominantly two-story homes — 20-to-25-year-old original builder-grade material is at end-of-life, and the wall ductwork repair line is quoted on most invoices here.",
      },
      {
        name: 'Diamond Hill',
        zip: '33596',
        detail:
          "Gated golf-course community with executive two-story floor plans — long 30-plus-foot second-floor dryer duct runs are standard, rotary brush reach is required, and original builder-grade transition hose is routinely replaced during first deep clean.",
      },
      {
        name: 'River Hills',
        zip: '33596',
        detail:
          "Gated master-planned community with mid-1990s to early-2000s housing — older original vent materials at end-of-life, and the Alafia River-adjacent addresses have higher ambient humidity that accelerates lint-moisture compaction inside the duct.",
      },
      {
        name: 'Buckhorn',
        zip: '33594',
        detail:
          "Established older neighborhood east of Brandon proper bordering Valrico — 1980s-1990s two-story stock with original ducting universally past replacement age and a pattern of in-place dryer upgrades on old duct that compounds airflow problems.",
      },
      {
        name: 'Valrico Proper',
        zip: '33594',
        detail:
          "The core Valrico ZIP with mixed housing ages from 1970s ranches to 2010s infill — standard suburban vent routing in most cases, with a share of older addresses still running original builder-grade flex duct that surfaces for replacement during first professional cleaning.",
      },
    ],
    includesList: [
      'FishHawk Ranch phase-level pattern library — Starling, Garcia, Park Square, Palmetto Cay vent routing differences accounted for in visit planning',
      'Rotary brush system sized to actual duct diameter with reach configured to phase-specific run lengths',
      'Multi-segment cleaning passes on 25-35 foot two-story runs (single-pass wand cleaning leaves the middle dirty)',
      'Pre- and post-airflow measurement with calibrated anemometer (recorded on invoice)',
      'Exterior termination cap inspection per phase-specific style (side soffit, rear wall, or roof cap depending on phase)',
      'Identification of end-of-life original builder-grade material on 1990s-2000s Bloomingdale, Diamond Hill, River Hills stock',
      'Photo documentation of any code or repair recommendations before any upsell (FishHawk Facebook network quality bar)',
      'Written report with airflow numbers, phase-specific notes, and recommended re-cleaning cycle within 24 hours',
    ],
    pricingNotes:
      "Valrico pricing reflects the two-story floor-plan dominance across FishHawk Ranch and the established suburban stock. Most single-family jobs land at $199-$249 because almost every FishHawk, Bloomingdale, Diamond Hill, and River Hills floor plan triggers the +$50 second-floor surcharge on the $149-$249 base. Park Square and Diamond Hill executive-size homes with 32-plus-foot vent runs can land at the top of the band. Wall ductwork repair ($195-$595) is the line item we quote most often in Valrico — on 1990s-2000s Bloomingdale, River Hills, and Buckhorn stock it is usually original builder-grade flex or transition-hose replacement; on FishHawk 2001-2008 Starling and Garcia phases it is occasionally a builder-grade flex replacement in the 5-to-8-year failure cohort pattern that also shows up in Riverview. Condo / townhouse work is $129-$199. Inspection-only is $149.",
    counterPositioning:
      "National chains treat FishHawk Ranch as one ZIP code on a map. A local operator who has done 800 FishHawk homes over the years knows Starling has different vent pitch than Garcia and can plan the visit accordingly — rotary brush size, reach, ladder position, camera angle. The corporate routing center behind the FTC-mandated \"independently owned and operated franchises\" disclosure rotates crews in and out and cannot build that pattern library. The FishHawk Facebook network surfaces a bad job within days.",
    testimonial: {
      text: "FishHawk Ranch, Garcia phase, original 2006 build. Asked on the FishHawk Facebook group for recommendations, Airflow came up immediately — multiple neighbors said the same crew. They showed up with a rotary rig configured for Garcia routing specifically, ran the full 30-foot duct path, pulled a felt-mat of lint the previous service obviously never reached, and replaced a failing transition hose I did not even know was failing. Photos, airflow numbers, everything on the invoice. Posted back to the group.",
      author: 'Rebecca S.',
      neighborhood: 'FishHawk Ranch — Garcia',
    },
    cityFaqs: [
      {
        q: 'When is dryer vent cleaning busiest in Valrico?',
        a: "January and September are the Tampa Bay demand peaks, each running near 880 monthly searches. Valrico's FishHawk Ranch family-home demographic adds an August back-to-school surge that pulls some September volume early, and FishHawk community Facebook group referral threads concentrate demand in predictable clusters around posted recommendations. October and February are the easiest months for individual appointments; block-day HOA requests typically land in March or October.",
      },
      {
        q: 'How much does dryer vent cleaning cost in Valrico?',
        a: "Most Valrico jobs land at $199-$249 because almost every FishHawk, Bloomingdale, Diamond Hill, and River Hills floor plan triggers the $50 second-floor surcharge on the $149-$249 base. Park Square and Diamond Hill executive-size homes with 32-plus-foot runs can land at the top of that band. Wall ductwork repair is $195-$595 when original builder-grade material needs replacement — common on 1990s-2000s stock. Condo work is $129-$199. Inspection-only is $149.",
      },
      {
        q: 'Why does the FishHawk phase matter for my dryer vent cleaning?',
        a: "Because FishHawk Ranch is not one neighborhood — Starling, Garcia, Park Square, Palmetto Cay, and the other phases were built by different primary contractors across 2001-2018 with different vent routing, different elbow configurations, different exterior termination styles (side soffit versus rear wall versus roof cap), and different insulation standards. A crew that has done 800 FishHawk homes pattern-matches from the street name to plan rotary brush size, reach, ladder position, and camera angle before arrival. A franchise truck visiting once a month cannot.",
      },
      {
        q: 'My 2004 FishHawk Starling home is original construction. What should I expect during cleaning?',
        a: "Starling 2001-2005 builds commonly have original builder-grade flexible foil transition hose still in service and original exterior cap hardware at end-of-life. Camera inspection before cleaning reveals the condition; wall ductwork repair ($195-$595) to replace failed flex with rigid metal is quoted during the cleaning visit with photos, not as a surprise after. Expect a 75-110 minute job for a full rotary brush pass with replacement work included. Airflow numbers before and after are on the invoice.",
      },
      {
        q: 'How often should a FishHawk Ranch family home get vent cleaning?',
        a: "Annual is the NFPA 211 baseline and the right schedule for most FishHawk households. The two-story long-run ducting, high-volume family laundry pattern (5-8 loads per week is normal), and 90-degree elbows at every floor transition push the highest-volume households toward a 9-month cycle. Pet families and households with more than 4 occupants should plan on the 9-month interval; the FishHawk Facebook network usually circulates reminders ahead of the January and September peak windows.",
      },
    ],
    responseNote:
      "Valrico and FishHawk Ranch addresses are 25-35 minutes from our Tampa base via I-75 or Highway 60. The FishHawk phase-level pattern library travels with the crew — rotary brush kits are configured before arrival based on the street name. Same-week scheduling is the norm; block-day requests coordinated through the FishHawk Facebook community are common and we accommodate them directly. Saturday appointments available with no weekend surcharge.",
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
  { label: 'Inspection only', range: '$149' },
  { label: 'Commercial / multi-unit', range: 'Custom quote' },
] as const;
