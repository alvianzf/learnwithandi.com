"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './HeroSection.module.css';
import { MessageCircle, ArrowRight } from 'lucide-react';

import { motion } from 'framer-motion';

export default function HeroSection() {
  const { hero, global } = content;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <motion.div
          className={styles.contentCol}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo removed from here, moved to Navbar */}
          <div className={styles.badge}>
            {hero.badge?.replace('Indonesia', '')} <span style={{ color: '#EF4444' }}>Indonesia</span>
          </div>
          <h1 className={styles.headline}>
            <span style={{ color: 'var(--color-accent-yellow)' }}>STOP</span> Cari Kerja Sendiri.
          </h1>
          <h2 className={styles.subHeadlineMain}>{hero.subHeadline}</h2>
          <p className={styles.description}>{hero.description}</p>

          <div className={styles.ctaContainer}>
            <Link href={hero.primaryCta.link} className={styles.primaryCta}>
              {hero.primaryCta.text} <ArrowRight size={20} />
            </Link>
            <Link href={hero.secondaryCta.link} className={styles.secondaryCta} target="_blank">
              <MessageCircle size={20} className={styles.icon} />
              {hero.secondaryCta.text}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Use next/image in production, standard img for now as directed */}
          <div className={styles.imageWrapper}>
            <img src={hero.image} alt="Andi Satriawan Lubis - Founder Learn With Andi" className={styles.heroImage} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
