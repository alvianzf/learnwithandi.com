import PartnershipHero from '@/components/sections/marketing/PartnershipHero';
import PartnershipSolutions from '@/components/sections/marketing/PartnershipSolutions';
import PartnershipCta from '@/components/sections/marketing/PartnershipCta';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import GlobalBackground from '@/components/layout/GlobalBackground';
import styles from '../(home)/page.module.css';

export const metadata = {
  title: 'Partnership | Learn With Andi',
  description: 'Collaborate with Learn With Andi to accelerate your team\'s career growth and performance.',
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
        <PartnershipSolutions />
        <PartnershipCta />
        <Footer />
      </div>
    </main>
  );
}
