import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Calendar, ArrowRight } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import { posts } from '@/lib/posts';

export const metadata = buildMetadata({
  title: 'Dryer Vent Cleaning Blog | Tampa Bay Expert Tips',
  description: 'Expert guides on dryer vent cleaning, fire prevention, energy efficiency, and home safety from Tampa Bay\'s most trusted dryer vent professionals.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy-mid to-navy-light py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 70% 20%, rgba(232,69,14,0.12) 0%, transparent 60%)',
        }} />
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs text-gold font-semibold backdrop-blur mb-5">
            Blog
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-4">
            Tampa Bay&apos;s Dryer Vent Knowledge Base
          </h1>
          <p className="text-lg text-white/75">
            Expert guides, safety tips, and local insights from the Airflow team — Tampa Bay&apos;s locally-owned dryer vent specialists.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-fire hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-navy via-navy-mid to-fire/40 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 text-8xl font-display font-black select-none">
                    {p.category[0]}
                  </div>
                  <span className="absolute top-4 left-4 bg-white/95 text-fire text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-lg text-navy leading-tight mb-2 group-hover:text-fire transition-colors">{p.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                  <span className="text-fire text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read article <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
