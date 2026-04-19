# Airflow Dryer Vent Cleaning

> Florida's highest-converting dryer vent cleaning website — built to dominate Google, Google Ads, AI search engines (ChatGPT, Perplexity, Claude, Gemini), and local SEO across the Tampa Bay area.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Prisma · Supabase (Postgres) · Vercel · Resend · n8n webhook

---

## 🚀 Quick Start with Claude Code

Open this folder in your terminal and run Claude Code:

```bash
cd dry-vent-tampa
claude
```

Then paste this prompt to Claude Code:

```
Bootstrap this project end-to-end:

1. Run `npm install`
2. Create a Supabase project (or use existing) — give me the env vars I need
3. Run /SEO on every page in app/(marketing)/areas/ and app/(marketing)/services/
4. Use /firecrawl to scrape competitor sites (top 3 Tampa dryer vent companies on Google) and extract their schema, headings, content gaps. Save findings to scripts/seo-research.md
5. Use /ai-seo to rewrite all content to rank in AI search (ChatGPT, Perplexity, Claude, Gemini) — focus on extractable Q&A blocks, definition-style intros, structured comparisons
6. Generate llms.txt for AI crawlers
7. Set up GitHub repo: dry-vent-tampa
8. Push to GitHub
9. Connect repo to Vercel
10. Set up production env vars on Vercel
11. Deploy to production
12. Submit sitemap.xml to Google Search Console + Bing Webmaster Tools
```

---

## 📁 Project Structure

```
dry-vent-tampa/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Homepage
│   │   ├── layout.tsx                  # Marketing layout
│   │   ├── services/
│   │   │   ├── residential-dryer-vent-cleaning/page.tsx
│   │   │   ├── commercial-dryer-vent-cleaning/page.tsx
│   │   │   ├── dryer-vent-repair/page.tsx
│   │   │   ├── dryer-vent-installation/page.tsx
│   │   │   └── dryer-vent-inspection/page.tsx
│   │   ├── areas/
│   │   │   ├── tampa/page.tsx
│   │   │   ├── st-petersburg/page.tsx
│   │   │   ├── clearwater/page.tsx
│   │   │   ├── brandon/page.tsx
│   │   │   ├── riverview/page.tsx
│   │   │   ├── wesley-chapel/page.tsx
│   │   │   ├── new-tampa/page.tsx
│   │   │   ├── carrollwood/page.tsx
│   │   │   ├── westchase/page.tsx
│   │   │   ├── south-tampa/page.tsx
│   │   │   ├── lutz/page.tsx
│   │   │   ├── land-o-lakes/page.tsx
│   │   │   ├── plant-city/page.tsx
│   │   │   ├── apollo-beach/page.tsx
│   │   │   └── valrico/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── pricing/page.tsx
│   ├── api/
│   │   └── lead/route.ts               # Lead capture endpoint
│   ├── layout.tsx                      # Root layout (schema.org)
│   ├── sitemap.ts                      # Dynamic sitemap
│   ├── robots.ts                       # robots.txt
│   ├── llms.txt/route.ts              # AI crawler instructions
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LeadForm.tsx
│   ├── ServiceAreaPage.tsx             # Reusable area template
│   ├── ServicePage.tsx                 # Reusable service template
│   ├── FAQ.tsx
│   ├── Reviews.tsx
│   ├── StickyMobileCTA.tsx
│   ├── SchemaMarkup.tsx
│   └── TrustBar.tsx
├── lib/
│   ├── seo.ts                          # SEO utilities
│   ├── schema.ts                       # Schema.org generators
│   ├── areas.ts                        # Service area data
│   ├── services.ts                     # Service data
│   ├── reviews.ts                      # Customer reviews
│   ├── prisma.ts                       # Prisma client
│   └── analytics.ts                    # GA4 + Meta Pixel
├── prisma/
│   └── schema.prisma                   # DB schema (leads table)
├── public/
│   ├── images/                         # Optimized images
│   ├── favicon.ico
│   └── og-image.jpg
├── scripts/
│   ├── seed-content.ts                 # Generate area pages
│   └── seo-research.md                 # Firecrawl research output
├── .env.example
├── .env.local                          # Your secrets (gitignored)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔑 Required Environment Variables

Copy `.env.example` → `.env.local` and fill in:

```bash
# Supabase
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Resend (for lead emails)
RESEND_API_KEY="re_..."
LEAD_NOTIFICATION_EMAIL="info@airflowdryervent.com"

# n8n webhook (for CRM/automation)
N8N_LEAD_WEBHOOK_URL="https://your-n8n.com/webhook/dvt-lead"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="..."
NEXT_PUBLIC_GOOGLE_ADS_ID="AW-..."
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL="..."

# Site
NEXT_PUBLIC_SITE_URL="https://dryervent.vercel.app"
NEXT_PUBLIC_BUSINESS_PHONE="+18137441127"
NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY="(813) 744-1127"
```

---

## 🎯 SEO Strategy

### Traditional SEO
- ✅ Per-page metadata, OG tags, canonical URLs
- ✅ Schema.org: LocalBusiness, Service, FAQPage, BreadcrumbList, Review
- ✅ Internal linking matrix between services × areas
- ✅ Dynamic sitemap.xml (all pages)
- ✅ robots.txt with sitemap reference
- ✅ Optimized Core Web Vitals (Image component, font preloading)
- ✅ Mobile-first, semantic HTML

### AI Search SEO (GEO – Generative Engine Optimization)
- ✅ `llms.txt` for AI crawlers
- ✅ Definition-style intros (1-2 sentence answers AI can quote)
- ✅ Structured Q&A blocks (FAQ schema + visible markup)
- ✅ Comparison tables (AI loves these)
- ✅ Statistics with citations
- ✅ "How", "What", "Why" headings — match AI query patterns
- ✅ Author/expertise signals (E-E-A-T)
- ✅ Original data and case studies

### Local SEO
- ✅ 15 dedicated area pages with unique 800+ word content
- ✅ NAP consistency in schema markup
- ✅ Service Area Business markup
- ✅ Geo coordinates per area page
- ✅ "Near me" optimized titles

---

## 🛠️ Local Development

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open http://localhost:3000

---

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit: Airflow Dryer Vent Cleaning"
gh repo create dry-vent-tampa --private --source=. --push

# 2. Deploy to Vercel
vercel --prod
```

Or use Claude Code's Vercel MCP integration:
```
Deploy this to Vercel as dry-vent-tampa.vercel.app, set all env vars from .env.local
```

---

## 📊 Post-Launch Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Business Profile (Tampa)
- [ ] Set up Google Ads campaigns (location-targeted Tampa Bay)
- [ ] Verify schema markup with [validator.schema.org](https://validator.schema.org)
- [ ] Test PageSpeed Insights — target 95+ on mobile
- [ ] Configure Resend domain verification
- [ ] Connect form webhook to n8n → Google Sheet → Email + SMS alert
- [ ] Set up GA4 conversions (form submit, phone click)
- [ ] Set up Google Ads conversion tracking
- [ ] Test on real mobile device
- [ ] Verify llms.txt is accessible at /llms.txt
- [ ] Test ChatGPT and Perplexity for "dryer vent cleaning Tampa" — see if you get cited
