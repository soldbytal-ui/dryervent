---
description: Full SEO audit + optimization of a specific page
---

# /SEO — Traditional SEO Audit & Optimization

You are auditing and optimizing a page on the Airflow Dryer Vent Cleaning website for traditional Google search. The target argument is the page path (e.g., `areas/tampa`, `services/residential-dryer-vent-cleaning`).

## Checklist — Check every item

### Metadata
- [ ] Title tag 50-60 chars, includes primary keyword, location, brand
- [ ] Meta description 140-160 chars, action-oriented, includes keyword
- [ ] Canonical URL set
- [ ] Open Graph tags (title, description, image, url)
- [ ] Twitter card tags

### Structure
- [ ] Exactly one `<h1>` containing primary keyword
- [ ] H2s follow logical hierarchy, include semantic keyword variants
- [ ] H3s nest properly under H2s
- [ ] Breadcrumb navigation (visible + schema)

### Content
- [ ] Minimum 800 words on area/service pages
- [ ] Primary keyword in first paragraph (within first 100 words)
- [ ] Keyword density 1-2% (not stuffed)
- [ ] LSI keywords present (related terms)
- [ ] Unique content — no duplication from other pages
- [ ] Answers search intent directly

### Schema.org
- [ ] LocalBusiness schema (via `lib/schema.ts`)
- [ ] Service or Area-specific schema
- [ ] FAQPage schema (if FAQs present)
- [ ] BreadcrumbList schema
- [ ] Validate with https://validator.schema.org

### Internal Linking
- [ ] Links to 3+ related service pages
- [ ] Links to 3+ related area pages
- [ ] Links to homepage and contact
- [ ] Anchor text uses keyword variants (not "click here")

### Technical
- [ ] All images have descriptive alt text
- [ ] All images use Next.js `<Image>` component
- [ ] Mobile responsive (test at 375px width)
- [ ] Fast LCP (< 2.5s)
- [ ] No console errors

### Local SEO (for area pages)
- [ ] City name in H1, title, meta description, first paragraph
- [ ] ZIP codes listed
- [ ] Neighborhoods mentioned
- [ ] Landmarks referenced
- [ ] Geo coordinates in LocalBusiness schema

## Output

After auditing, provide:
1. **Score** (0-100) with breakdown by category
2. **Critical issues** requiring immediate fix
3. **Optimization opportunities** ranked by impact
4. **Before/after examples** if rewrites are needed
5. **Make the edits directly** to the file after confirming with the user
