import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { posts, type BodySection } from '@/lib/posts';
import { getPopularCities } from '@/lib/internal-links';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
  });
}

function renderSection(section: BodySection, idx: number) {
  switch (section.type) {
    case 'p':
      return (
        <p key={idx} className="text-gray-700 leading-relaxed mb-5">
          {section.text}
        </p>
      );
    case 'h2':
      return (
        <h2
          key={idx}
          className="font-display font-bold text-2xl md:text-3xl text-navy mt-12 mb-4"
        >
          {section.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={idx}
          className="font-display font-bold text-xl text-navy mt-8 mb-3"
        >
          {section.text}
        </h3>
      );
    case 'ul':
      return (
        <ul key={idx} className="list-disc pl-6 mb-6 space-y-2 text-gray-700 leading-relaxed">
          {section.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={idx} className="list-decimal pl-6 mb-6 space-y-2 text-gray-700 leading-relaxed">
          {section.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case 'callout':
      return (
        <div
          key={idx}
          className="bg-orange-50 border-l-4 border-fire rounded-r-lg p-5 my-6"
        >
          {section.title && (
            <p className="font-display font-bold text-navy mb-2">{section.title}</p>
          )}
          <p className="text-gray-700 leading-relaxed">{section.text}</p>
        </div>
      );
    case 'faq':
      return (
        <div key={idx} className="mt-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {section.items.map((item, i) => (
              <div key={i} className="border-l-4 border-fire pl-5">
                <p className="font-display font-bold text-lg text-navy mb-2">{item.q}</p>
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Airflow Dryer Vent Cleaning' },
    publisher: {
      '@type': 'Organization',
      name: 'Airflow Dryer Vent Cleaning',
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${post.slug}` },
  };

  const faqItems = post.body
    ?.filter((s): s is Extract<BodySection, { type: 'faq' }> => s.type === 'faq')
    .flatMap((s) => s.items) ?? [];

  const schemaData: object[] = [
    articleSchema,
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  ];

  if (faqItems.length > 0) {
    schemaData.push(faqSchema(faqItems));
  }

  return (
    <>
      <SchemaMarkup data={schemaData} />

      <article className="bg-white pt-10 pb-16">
        <div className="container-custom max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-fire mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to all articles
          </Link>

          <div className="mb-6">
            <span className="inline-block bg-orange-50 text-fire text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {post.category}
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-navy leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8">{post.excerpt}</p>

            {post.body ? (
              <>
                {post.body.map((section, idx) => renderSection(section, idx))}

                {post.internalLinks && post.internalLinks.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="font-display font-bold text-xl text-navy mb-4">Related pages</h2>
                    <ul className="space-y-2">
                      {post.internalLinks.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.href}
                            className="text-fire font-semibold hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10 bg-orange-50 border-l-4 border-fire rounded-r-lg p-6">
                  <p className="font-display font-bold text-navy text-lg mb-2">
                    Ready for a free Tampa Bay dryer vent inspection?
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    No-obligation camera scope and airflow assessment from our
                    technicians. Same-day appointments usually available.
                  </p>
                  <p className="text-gray-700">
                    Call{' '}
                    <a
                      href="tel:+18137441127"
                      className="text-fire font-bold hover:underline"
                    >
                      (813) 744-1127
                    </a>{' '}
                    or{' '}
                    <Link href="/contact" className="text-fire font-bold hover:underline">
                      request a free estimate
                    </Link>
                    .
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 leading-relaxed">
                  This is a placeholder article page. Full article content is generated when your team runs <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/SEO</code> and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/AI SEO</code> through Claude Code on this page. The title, excerpt, category, and metadata are already fully configured — only the body content needs generation.
                </p>

                <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-4">How to generate this article</h2>
                <p className="text-gray-700 leading-relaxed">
                  Open this file in Claude Code and run: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/AI SEO write full article body for &quot;{post.title}&quot; with 1,200+ words, definition-style intro, H2/H3 structure, structured comparison tables, internal links to /services and /areas pages, and FAQ block at the end.</code>
                </p>

                <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-4">Ready to book service?</h2>
                <p className="text-gray-700 leading-relaxed">
                  If this article inspired you to get your vent cleaned, <Link href="/contact" className="text-fire font-semibold underline">request a free estimate</Link> or call us directly.
                </p>
              </>
            )}
          </div>
        </div>
      </article>

      {/* Related Resources — internal linking block (only on posts with body) */}
      {post.body && (() => {
        const otherPosts = posts
          .filter((p) => p.slug !== post.slug && p.body && p.body.length > 0)
          .slice(0, 3);
        const topCities = getPopularCities(5);
        return (
          <section className="bg-gray-50 py-14">
            <div className="container-custom max-w-5xl">
              <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">
                Related Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-display font-bold text-base text-navy mb-4">More Articles</h3>
                  <ul className="space-y-2.5">
                    {otherPosts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="text-sm text-gray-700 hover:text-fire transition-colors">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-display font-bold text-base text-navy mb-4">Get Started</h3>
                  <ul className="space-y-2.5">
                    <li><Link href="/pricing" className="text-sm text-gray-700 hover:text-fire transition-colors">Transparent Per-Foot Pricing</Link></li>
                    <li><Link href="/services/dryer-vent-inspection" className="text-sm text-gray-700 hover:text-fire transition-colors">Free Dryer Vent Inspection</Link></li>
                    <li><Link href="/areas" className="text-sm text-gray-700 hover:text-fire transition-colors">Service Areas Across Tampa Bay</Link></li>
                    <li><Link href="/services/residential-dryer-vent-cleaning" className="text-sm text-gray-700 hover:text-fire transition-colors">Residential Cleaning Service</Link></li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-display font-bold text-base text-navy mb-4">Popular Service Areas</h3>
                  <ul className="space-y-2.5">
                    {topCities.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/areas/${c.slug}`} className="text-sm text-gray-700 hover:text-fire transition-colors">
                          Dryer Vent Cleaning in {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      <FinalCTA />
    </>
  );
}
