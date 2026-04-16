import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-navy via-navy-mid to-navy-light text-white text-center px-6">
      <div>
        <Flame className="text-fire mx-auto mb-6" size={64} />
        <h1 className="font-display font-black text-6xl md:text-8xl mb-4">404</h1>
        <p className="text-xl text-white/80 mb-8">This page drifted off like lint in the breeze.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-fire hover:bg-fire-dark text-white font-display font-bold px-8 py-4 rounded-full shadow-lg shadow-fire/30 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
