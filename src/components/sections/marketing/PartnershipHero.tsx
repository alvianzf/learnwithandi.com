"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './HeroSection.module.css'; // Reusing styles for consistency
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnershipHero() {
  const { partnership } = content;
  const { hero } = partnership;

  return (
    <section className={styles.hero} id="partnership-hero">
      <div className={styles.container}>
        <motion.div
          className={styles.contentCol}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.badge}>
            {hero.badge}
          </div>
          <h1 
            className={styles.headline}
            dangerouslySetInnerHTML={{ __html: hero.headline }}
          />
          <h2 className={styles.subHeadlineMain}>{hero.subHeadline}</h2>
          <p className={styles.description}>{hero.description}</p>

          <div className={styles.ctaContainer}>
            <Link href={hero.primaryCta.link} className={styles.primaryCta}>
              {hero.primaryCta.text} <ArrowRight size={20} />
            </Link>
            <Link href={hero.secondaryCta.link} className={styles.secondaryCta}>
              {hero.secondaryCta.text}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <img src={hero.image} alt="Partnership with Learn With Andi" className={styles.heroImage} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
