import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import TestimonialSection from '@/components/TestimonialSection';
import CareerElementsSection from '@/components/CareerElementsSection';
import ProgramGallery from '@/components/ProgramGallery';
import QualificationSection from '@/components/QualificationSection';
import OfferSection from '@/components/OfferSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import PromoPopup from '@/components/PromoPopup';
import Navbar from '@/components/Navbar';
import GlobalBackground from '@/components/GlobalBackground';
import MentorsSection from '@/components/MentorsSection';
import SolutionSection from '@/components/SolutionSection';
import CtaSection from '@/components/CtaSection';
import CareerWinsSection from '@/components/CareerWinsSection';
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
