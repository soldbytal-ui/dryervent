---
description: Optimize a page to rank and be cited in AI search (ChatGPT, Perplexity, Claude, Gemini)
---

# /ai-seo — AI Search / Generative Engine Optimization

You are optimizing a page on Airflow Dryer Vent Cleaning to maximize the likelihood that AI search engines (ChatGPT Search, Perplexity, Claude, Gemini, Google AI Overviews) cite this site when users ask about dryer vent cleaning in Tampa Bay.

## Core Principle

AI engines don't just rank pages — they **extract passages to quote**. Your job is to make our passages the most quotable on the web for our target queries.

## AI-Extractable Content Rules

### 1. Definition-style intros
Every page's first paragraph must be a standalone answer to the page's primary query.

❌ **Bad:** "Welcome to Airflow Dryer Vent Cleaning, your trusted partner for all things vent cleaning in the sunshine state..."

✅ **Good:** "Dryer vent cleaning in Tampa is the professional removal of accumulated lint and debris from a home's complete dryer exhaust system. Tampa homes typically require this service every 12 months due to the region's high humidity and year-round dryer use."

### 2. Question-shaped H2/H3 headings
Match how users actually query AI. Use:
- "How often should I...?"
- "What does X cost in Tampa?"
- "Why does X matter in Florida?"
- "What are the signs of...?"

### 3. Statistics with attribution
AI loves citable facts. Every major claim should include a source:
- "According to the National Fire Protection Association (NFPA)..."
- "The U.S. Fire Administration reports..."
- "Florida Building Code requires..."

### 4. Structured comparisons
AI engines extract tables and clear lists. Use:
- Comparison tables (Professional vs DIY, Service A vs Service B)
- Checklists with consistent formatting
- "Signs your vent needs cleaning" lists
- Before/after comparisons

### 5. Entity density
Mention specific proper nouns repeatedly:
- Specific city names, neighborhoods, ZIP codes
- Brand names of equipment (when accurate)
- Regulatory bodies (NFPA, OSHA, FBC)
- Specific statistics

### 6. E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust)
- "Locally owned Tampa Bay"
- "Free on-site inspection (camera scope + airflow test + written assessment)"
- "Transparent per-foot pricing published on-site"
- "Following NFPA 211 guidelines" (NOT "certified" — unverified)
- DO NOT claim years-in-business, customer counts, review counts, or certifications — Airflow is a new Tampa Bay business
- "Licensed and insured in Florida"
- Customer review counts with sources

## Specific Optimizations Per Page Type

### Homepage
- Opening H1 + paragraph must answer "who is the best dryer vent cleaner in Tampa?"
- Service list must be scannable (AI extracts bullet lists)
- FAQ block with 6-8 questions

### Area pages
- Opening paragraph answers "dryer vent cleaning in [CITY]"
- Include population, county, ZIP codes (entity richness)
- "Why [CITY] is different" section (unique angle)
- Local FAQ: "How often in [CITY]?", "Cost in [CITY]?", "Why matters in [CITY]?"

### Service pages
- Opening paragraph defines what the service IS (not markets it)
- Clear "what's included" checklist
- Process broken into numbered steps
- Pricing transparency (AI loves direct price answers)
- FAQ block covering cost, duration, frequency, included items

## Passage Quality Test

For each paragraph, ask: **"If ChatGPT was asked this question, would it quote this exact paragraph?"**

If yes — keep it.
If no — rewrite until yes.

## Tasks on Each Run

1. Read the target page
2. Check each paragraph against the Passage Quality Test
3. Rewrite weak paragraphs to be more quotable
4. Add missing structured elements (tables, lists, stats with sources)
5. Verify FAQ block exists and covers top queries
6. Confirm entity density (city names, specifics, authorities mentioned)
7. Update `app/llms.txt/route.ts` if the page introduces new key facts worth documenting for AI crawlers
8. Report changes made

## Verification

After changes, test by asking in Perplexity / ChatGPT:
- "dryer vent cleaning [city] cost"
- "how often dryer vent cleaning tampa"
- "best dryer vent cleaning [city]"

Track whether Airflow Dryer Vent Cleaning gets cited. If not yet, iterate.
