"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './HeroSection.module.css';
import { MessageCircle } from 'lucide-react';

export default function HeroSection() {
  const { hero, global } = content;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.contentCol}>
          {/* Logo removed from here, moved to Navbar */}
          <h1 className={styles.headline}>
            <span style={{ color: 'var(--color-accent-yellow)' }}>STOP</span>
            {hero.headline.substring(4)}
          </h1>
          <p className={styles.subHeadline}>{hero.subHeadline}</p>

          <div className={styles.ctaContainer}>
            <Link href={hero.primaryCta.link} className={styles.primaryCta}>
              {hero.primaryCta.text}
            </Link>
            <Link href={hero.secondaryCta.link} className={styles.secondaryCta} target="_blank">
              <MessageCircle size={20} className={styles.icon} />
              {hero.secondaryCta.text}
            </Link>
          </div>
        </div>

        <div className={styles.imageCol}>
          {/* Use next/image in production, standard img for now as directed */}
          <div className={styles.imageWrapper}>
            <img src={hero.image} alt="Andi Satriawan" className={styles.heroImage} />
          </div>
        </div>
      </div>
    </section>
  );
}
