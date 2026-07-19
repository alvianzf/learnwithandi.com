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
import { content } from '@/data/content';

// Generated from the same source the FAQ section renders, so the marked-up
// questions always match what is visibly on the page — Google requires that.
// The previous hand-written schema listed three questions that appeared
// nowhere on the site. It lives here rather than in the root layout so it is
// not also emitted on /partnership, which has no FAQ at all.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer.replace(/<[^>]*>/g, ''),
    },
  })),
};

export default function Home() {
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
