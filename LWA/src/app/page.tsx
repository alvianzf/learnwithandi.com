import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import OfferSection from '@/components/OfferSection';
import BioSection from '@/components/BioSection';
import TestimonialSection from '@/components/TestimonialSection';
import ScarcitySection from '@/components/ScarcitySection';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import PromoPopup from '@/components/PromoPopup';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <PromoPopup />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <OfferSection />
      <BioSection />
      <TestimonialSection />
      <ScarcitySection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
