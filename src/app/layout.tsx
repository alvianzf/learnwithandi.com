import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learn With Andi - Mentoring Karier yang Ngena & Siap Kerja',
  description: 'Ekosistem belajar karier profesional paling realistis di Indonesia. Dapetin mentoring CV, LinkedIn, & Interview yang beneran ngerubah mindset dan hasil.',
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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1159739412561439');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1159739412561439&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Learn With Andi",
              "url": "https://learnwithandi.com",
              "logo": "https://learnwithandi.com/assets/logo/white.png",
              "image": "https://learnwithandi.com/assets/andi/potrait.png",
              "description": "Platform career coaching terkemuka yang fokus pada optimasi karier profesional secara strategis dan realistis.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID"
              },
              "knowsAbout": ["Career Development", "Personal Branding", "Job Search Strategy", "Recruitment"],
              "founder": {
                "@type": "Person",
                "name": "Andi Satriawan Lubis",
                "jobTitle": "Founder & Career Coach",
                "url": "https://www.linkedin.com/in/andisatr/"
              },
              "employee": [
                {
                  "@type": "Person",
                  "name": "Alvian Zachry Faturrahman",
                  "jobTitle": "Software Engineer & Tech Mentor"
                },
                {
                  "@type": "Person",
                  "name": "Derryl Ditramaneti",
                  "jobTitle": "Expert Product Manager"
                },
                {
                  "@type": "Person",
                  "name": "Muhammad Fauzan",
                  "jobTitle": "Digital Marketing Specialist"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Apakah Learn With Andi cocok untuk pemula?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Materi di LWA disusun dari fundamental sampai tingkat lanjut, jadi sangat pas buat fresh graduate maupun pemula yang mau lari di trek karier yang benar."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Pelatihannya bisa sambil kerja?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sangat bisa. Kita desain programnya fleksibel dengan akses materi kapan pun, pas banget buat profesional yang lagi sibuk upgrade diri."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Format belajarnya gimana?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Campuran antara materi video, live mentoring mingguan, tugas praktik yang relevan dengan dunia kerja, dan support komunitas 24/7."
                  }
                }
              ]
            }
          ])}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
