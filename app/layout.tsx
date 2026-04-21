import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { localBusinessSchema, organizationSchema, websiteSchema } from '@/lib/schema';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Airflow Dryer Vent Cleaning | Tampa Bay\'s Locally-Owned Dryer Vent & Duct Cleaning Service',
    template: '%s | Airflow Dryer Vent Cleaning',
  },
  description:
    'Locally-owned dryer vent and dryer duct cleaning across Tampa Bay. Prevent fires, cut energy bills, and dry clothes faster. Licensed, insured, same-day service. Call (813) 744-1127.',
  applicationName: 'Airflow Dryer Vent Cleaning',
  keywords: [
    'dryer vent cleaning Tampa',
    'dryer duct cleaning Tampa',
    'dryer vent cleaning Florida',
    'dryer vent repair Tampa',
    'dryer vent cleaning near me',
    'lint removal Tampa',
    'dryer fire prevention',
    'commercial dryer vent cleaning Tampa Bay',
  ],
  authors: [{ name: 'Airflow Dryer Vent Cleaning' }],
  creator: 'Airflow Dryer Vent Cleaning',
  publisher: 'Airflow Dryer Vent Cleaning',
  formatDetection: { email: false, address: false, telephone: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#E8450E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body>
        {children}

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
              ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
