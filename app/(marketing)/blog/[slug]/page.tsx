import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema } from '@/lib/schema';
import { posts } from '@/lib/posts';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryventtampa.com';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
  });
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
    author: { '@type': 'Organization', name: 'Dry Vent Tampa' },
    publisher: {
      '@type': 'Organization',
      name: 'Dry Vent Tampa',
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${post.slug}` },
  };

  return (
    <>
      <SchemaMarkup
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />

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

            <p className="text-gray-700 leading-relaxed">
              This is a placeholder article page. Full article content is generated when your team runs <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/SEO</code> and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/AI SEO</code> through Claude Code on this page. The title, excerpt, category, and metadata are already fully configured — only the body content needs generation.
            </p>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-4">How to generate this article</h2>
            <p className="text-gray-700 leading-relaxed">
              Open this file in Claude Code and run: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/AI SEO write full article body for "{post.title}" with 1,200+ words, definition-style intro, H2/H3 structure, structured comparison tables, internal links to /services and /areas pages, and FAQ block at the end.</code>
            </p>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-4">Ready to book service?</h2>
            <p className="text-gray-700 leading-relaxed">
              If this article inspired you to get your vent cleaned, <Link href="/contact" className="text-fire font-semibold underline">request a free estimate</Link> or call us directly.
            </p>
          </div>
        </div>
      </article>

      <FinalCTA />
    </>
  );
}
