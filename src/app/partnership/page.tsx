import PartnershipHero from '@/components/sections/marketing/PartnershipHero';
import PartnershipSolutions from '@/components/sections/marketing/PartnershipSolutions';
import PartnershipCta from '@/components/sections/marketing/PartnershipCta';
import PastPartners from '@/components/sections/marketing/PastPartners';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import GlobalBackground from '@/components/layout/GlobalBackground';
import styles from '../(home)/page.module.css';

export const metadata = {
  title: 'Partnership | Learn With Andi',
  description: 'Berkolaborasi dengan Learn With Andi untuk mengakselerasi pertumbuhan karier dan performa tim Anda.',
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
        <PartnershipSolutions />
        <PartnershipCta />
        <Footer />
      </div>
    </main>
  );
}
