import PartnershipHero from '@/components/sections/marketing/PartnershipHero';
import PartnershipWhy from '@/components/sections/marketing/PartnershipWhy';
import PartnershipSolutions from '@/components/sections/marketing/PartnershipSolutions';
import PartnershipCta from '@/components/sections/marketing/PartnershipCta';
import PartnershipInPerson from '@/components/sections/marketing/PartnershipInPerson';
import PastPartners from '@/components/sections/marketing/PastPartners';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import GlobalBackground from '@/components/layout/GlobalBackground';
import styles from '../(home)/page.module.css';

export const metadata = {
  title: 'Partnership Strategis | Learn With Andi — Akselerasi Penempatan Talenta',
  description: 'Kolaborasi bersama LWA untuk mempercepat tingkat serapan industri bagi lulusan program kamu. Dari kesiapan interview hingga strategi penyaluran, kami bantu talenta kamu tembus pintu pertama.',
  keywords: [
    'partnership career coaching',
    'kemitraan talent placement',
    'akselerasi penempatan talenta',
    'program persiapan karier',
    'kolaborasi edtech indonesia',
    'learn with andi partnership',
    'peningkatan serapan lulusan',
  ],
  alternates: {
    canonical: 'https://learnwithandi.com/partnership',
  },
  openGraph: {
    title: 'Partnership Strategis | Learn With Andi',
    description: 'Bantu lulusan program kamu tembus pintu pertama industri. LWA hadir sebagai mitra strategis untuk mengakselerasi tingkat penyerapan talenta kamu.',
    url: 'https://learnwithandi.com/partnership',
    siteName: 'Learn With Andi',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://learnwithandi.com/assets/logo/full-white.png',
        width: 800,
        height: 600,
        alt: 'Learn With Andi — Partnership Strategis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partnership Strategis | Learn With Andi',
    description: 'Bantu lulusan program kamu tembus pintu pertama industri. Kolaborasi bersama LWA sekarang.',
  },
};

export default function PartnershipPage() {
  return (
    <main className={styles.main}>
      <div className={styles.backgroundWrapper}>
        <GlobalBackground />
      </div>
      <Navbar />
      <div className={styles.content}>
        <PartnershipHero />
        <PastPartners />
        <PartnershipWhy />
        <PartnershipSolutions />
        <PartnershipInPerson />
        <PartnershipCta />
        <Footer />
      </div>
    </main>
  );
}
