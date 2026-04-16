import type { Metadata } from 'next';
import TabNav from '@/components/scale/TabNav';

export const metadata: Metadata = {
  title: 'Scale Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function ScaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <TabNav />
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
