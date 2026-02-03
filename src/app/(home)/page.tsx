import HeroSection from '@/components/sections/marketing/HeroSection';
import ProblemSection from '@/components/sections/marketing/ProblemSection';
import TestimonialSection from '@/components/sections/social-proof/TestimonialSection';
import CareerElementsSection from '@/components/sections/programs/CareerElementsSection';
import ProgramGallery from '@/components/sections/programs/ProgramGallery';
import QualificationSection from '@/components/sections/about/QualificationSection';
import OfferSection from '@/components/sections/marketing/OfferSection';
import FaqSection from '@/components/sections/support/FaqSection';
import Footer from '@/components/layout/Footer';
import PromoPopup from '@/components/ui/PromoPopup';
import Navbar from '@/components/layout/Navbar';
import GlobalBackground from '@/components/layout/GlobalBackground';
import MentorsSection from '@/components/sections/social-proof/MentorsSection';
import SolutionSection from '@/components/sections/programs/SolutionSection';
import CtaSection from '@/components/sections/marketing/CtaSection';
import CareerWinsSection from '@/components/sections/social-proof/CareerWinsSection';
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
        <TestimonialSection />
        <CareerElementsSection />
        <ProgramGallery />
        <MentorsSection />
        <QualificationSection />
        <OfferSection />
        <FaqSection />
        <CtaSection />
        <CareerWinsSection />
        <Footer />
      </div>
    </main>
  );
}
