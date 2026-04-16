---
description: Scrape competitors and identify content gaps
---

# /firecrawl — Competitor Research via Firecrawl MCP

Scrape the top-ranking competitor sites for dryer vent cleaning in Tampa Bay and extract structured data to identify our content gaps and opportunities.

## Workflow

1. **Identify top 3 competitors** via web_search for: `"dryer vent cleaning Tampa"`, `"dryer vent cleaning Tampa Bay"`, `"dryer vent cleaning [city]"` for each of our 15 areas.

2. **Scrape each competitor homepage and top 3 internal pages** using Firecrawl MCP server. For each page extract:
   - Title, meta description, H1
   - All H2 and H3 headings (content outline)
   - Word count
   - Schema.org types used
   - FAQ questions (and their answers)
   - Service list and pricing if shown
   - Unique content angles we don't have
   - Internal link patterns

3. **Build a gap analysis table** with columns:
   | Competitor | Our Coverage | Gap | Priority |
   |---|---|---|---|

4. **Identify AI-search gaps** — questions competitors answer that we don't. These are opportunities for FAQ additions and new blog posts.

5. **Save findings** to `scripts/seo-research.md` with:
   - Executive summary
   - Competitor profiles
   - Content gap matrix
   - Specific recommended additions to `lib/areas.ts`, `lib/services.ts`, and blog post ideas
   - Keyword opportunities not currently targeted

6. **Propose edits** to the user — do not auto-edit files. Present findings as a plan and wait for approval.

## Tools You'll Use

- `web_search` — find top-ranking competitors
- `firecrawl` MCP — extract structured content from competitor pages
- `view` / `str_replace` — update files after approval

## Output Format

Return a brief summary in chat + write the full report to `scripts/seo-research.md`.
