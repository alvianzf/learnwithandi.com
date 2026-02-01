import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learn With Andi - Bangun Karier Profesional & Siap Kerja',
  description: 'Learn With Andi (LWA) adalah ekosistem belajar karier profesional. Dapatkan mentoring CV, LinkedIn, Interview, dan strategi cari kerja yang ngena dan realistis.',
  keywords: ['career coaching indonesia', 'belajar cari kerja', 'mentoring cv', 'optimasi linkedin', 'siap kerja', 'career switch', 'andi satriawan lubis', 'lwa'],
  authors: [{ name: 'Andi Satriawan Lubis' }],
  metadataBase: new URL('https://learnwithandi.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Learn With Andi - Bangun Karier Profesional',
    description: 'Bantu kamu siap kerja sesuai value, naik level, atau shifting career secara realistis.',
    url: 'https://learnwithandi.com',
    siteName: 'Learn With Andi',
    images: [
      {
        url: '/assets/andi/potrait.png',
        width: 1200,
        height: 630,
        alt: 'Andi Satriawan Lubis - Learn With Andi',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn With Andi',
    description: 'Bangun Karier Profesional dengan Arah yang Jelas.',
    images: ['/assets/andi/potrait.png'],
  },
  icons: {
    icon: '/assets/logo/white.png',
    apple: '/assets/logo/white.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFD700',
};

import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Google Analysis Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-T3WP8FYV6C`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T3WP8FYV6C');
            gtag('config', 'GT-5NXK4T2Q');
          `}
        </Script>
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Learn With Andi",
            "url": "https://learnwithandi.com",
            "logo": "https://learnwithandi.com/assets/logo/white.png",
            "sameAs": [
              "https://www.instagram.com/learnwithandi/",
              "https://www.linkedin.com/in/andisatr/",
              "https://www.youtube.com/@LearnwithAndis"
            ],
            "founder": {
              "@type": "Person",
              "name": "Andi Satriawan Lubis"
            },
            "description": "Learn With Andi (LWA) adalah ekosistem belajar karier profesional yang membantu kamu siap kerja sesuai value."
          })}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
