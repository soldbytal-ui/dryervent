# Deployment Guide — Dry Vent Tampa

Complete step-by-step deployment from zero to production. Follow these in order.

## Prerequisites

- Node.js 18+ installed locally
- GitHub account
- Vercel account
- Supabase account
- Resend account (for transactional email)
- Domain: dryventtampa.com (or similar)

---

## 1. Local Setup

```bash
# From the dry-vent-tampa folder
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your actual secrets (see section 2 for Supabase, section 3 for Resend).

```bash
# Generate Prisma client
npx prisma generate

# Start dev server
npm run dev
```

Visit http://localhost:3000 — you should see the full site.

---

## 2. Supabase Setup

1. Create a new project at https://supabase.com
2. Note the project URL and anon key (Settings → API)
3. Copy the database connection string (Settings → Database → Connection string → URI)
4. Add to `.env.local`:
   ```
   DATABASE_URL="postgresql://postgres:[PWD]@db.[PROJECT].supabase.co:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
   SUPABASE_SERVICE_ROLE_KEY="..."
   ```
5. Run migration:
   ```bash
   npx prisma db push
   ```
6. Verify in Supabase dashboard → Table Editor → you should see `Lead` table.

---

## 3. Resend Setup

1. Create account at https://resend.com
2. Verify your domain `dryventtampa.com`:
   - Add the DNS records Resend provides to your domain registrar
   - Wait for verification (~30 min)
3. Create API key (Dashboard → API Keys)
4. Add to `.env.local`:
   ```
   RESEND_API_KEY="re_..."
   LEAD_NOTIFICATION_EMAIL="info@dryventtampa.com"
   ```

---

## 4. GitHub — Push Code

```bash
# In project root
git init
git add .
git commit -m "Initial commit: Dry Vent Tampa production build"

# Create repo via GitHub CLI
gh repo create dry-vent-tampa --private --source=. --push

# Or manually:
# 1. Create empty repo at github.com/new
# 2. Then:
git remote add origin https://github.com/YOUR_USERNAME/dry-vent-tampa.git
git branch -M main
git push -u origin main
```

---

## 5. Vercel Deploy

### Option A: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B: Vercel Dashboard
1. https://vercel.com/new
2. Import your `dry-vent-tampa` GitHub repo
3. Framework: Next.js (auto-detected)
4. Add all env vars from `.env.local` (Settings → Environment Variables)
5. Deploy

### Option C: Claude Code (best path)
In Claude Code with Vercel MCP connected:
```
Deploy this project to Vercel. Create a new Vercel project called "dry-vent-tampa", link to the GitHub repo, copy all environment variables from my .env.local into Vercel production env, and trigger the first deployment.
```

---

## 6. Domain Setup

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add `dryventtampa.com` and `www.dryventtampa.com`
3. Update your registrar's DNS:
   - `A` record for `@` → Vercel's IP
   - `CNAME` for `www` → `cname.vercel-dns.com`
4. SSL certificate auto-provisions within 1-2 hours.

---

## 7. Google Search Console

1. https://search.google.com/search-console
2. Add property: `https://dryventtampa.com`
3. Verify via DNS TXT record (provided by Google)
4. Submit sitemap: `https://dryventtampa.com/sitemap.xml`
5. Add Google site verification code to `app/layout.tsx` metadata.verification.google

---

## 8. Bing Webmaster Tools

1. https://www.bing.com/webmasters
2. Import from Google Search Console (easiest path)
3. Submit sitemap: `https://dryventtampa.com/sitemap.xml`

---

## 9. Google Ads Setup

1. Create Google Ads account
2. Set up conversion actions:
   - "Lead form submit" (form submission)
   - "Phone click" (click on tel: links)
3. Add the Google Ads ID and conversion label to Vercel env:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID="AW-..."
   NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL="..."
   ```
4. Redeploy.

---

## 10. n8n Automation (Optional)

Use your existing n8n setup on DigitalOcean:

1. Create a new workflow in n8n
2. Trigger: Webhook
3. Copy the webhook URL → add to Vercel env as `N8N_LEAD_WEBHOOK_URL`
4. Add nodes for:
   - Google Sheets (append row)
   - SMS alert (via Twilio)
   - Slack notification
   - Send to CRM
5. Redeploy.

---

## 11. Post-Launch Verification

Run through each item:

- [ ] Homepage loads fast — test on https://pagespeed.web.dev (target: 95+ mobile)
- [ ] All 15 area pages render correctly
- [ ] All 5 service pages render correctly
- [ ] Lead form submits successfully → check Supabase `Lead` table
- [ ] Lead notification email received at info@dryventtampa.com
- [ ] Phone click tracking fires (check GA4 real-time)
- [ ] sitemap.xml accessible at https://dryventtampa.com/sitemap.xml
- [ ] robots.txt accessible at https://dryventtampa.com/robots.txt
- [ ] llms.txt accessible at https://dryventtampa.com/llms.txt
- [ ] Schema validates at https://validator.schema.org
- [ ] Mobile sticky CTA shows on mobile only
- [ ] Test on real phone (not just devtools)

---

## 12. SEO Kickoff (Claude Code)

Once deployed, open Claude Code in the project and run:

```
Run /SEO on every page in app/(marketing)/areas/ and app/(marketing)/services/
```

```
Run /firecrawl — scrape the top 3 competitors for "dryer vent cleaning Tampa" and write findings to scripts/seo-research.md
```

```
Run /ai-seo on app/(marketing)/page.tsx, app/(marketing)/areas/[slug]/page.tsx, and app/(marketing)/services/[slug]/page.tsx
```

These commands are defined in `.claude/commands/` and will systematically optimize every page.

---

## Ongoing Maintenance

Weekly:
- Check GA4 for new leads and conversion rates
- Check Google Search Console for new queries you're ranking for
- Review Supabase `Lead` table and update status (new → contacted → won)

Monthly:
- Add 1-2 new blog posts targeting long-tail keywords
- Refresh reviews in `lib/reviews.ts`
- Audit PageSpeed scores

Quarterly:
- Re-run `/firecrawl` to find new competitor gaps
- Run `/ai-seo` on top-trafficked pages to maintain AI citation
