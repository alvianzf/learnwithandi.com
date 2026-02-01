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
import Navbar from '@/components/Navbar';
import GlobalBackground from '@/components/GlobalBackground';
import ProgramGallery from '@/components/ProgramGallery';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.backgroundWrapper}>
        <GlobalBackground />
      </div>
      <Navbar />
      <div className={styles.content}>
        <PromoPopup />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <OfferSection />
        <ProgramGallery />
        <BioSection />
        <TestimonialSection />
        <ScarcitySection />
        <FaqSection />
        <CtaSection />
        <Footer />
      </div>
    </main>
  );
}
