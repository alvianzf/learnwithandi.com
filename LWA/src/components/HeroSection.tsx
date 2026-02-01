import Link from 'next/link';
import { content } from '@/data/content';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const { hero, global } = content;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.logoContainer}>
        <img src={global.logo.white} alt={global.brandName} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.headline}>{hero.headline}</h1>
        <p className={styles.subHeadline}>{hero.subHeadline}</p>
        <div className={styles.ctaContainer}>
          <Link href={hero.ctaLink} className={styles.ctaButton}>
            {hero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
