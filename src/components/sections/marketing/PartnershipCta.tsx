"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './CtaSection.module.css'; // Reusing styles
import { MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnershipCta() {
  const { partnership } = content;
  const { cta } = partnership;

  return (
    <section className={styles.section} id="partnership-cta">
      <motion.h2
        className={styles.title}
        style={{ color: 'var(--color-text)' }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        dangerouslySetInnerHTML={{ __html: cta.title }}
      />
      <motion.p
        className={styles.subtext}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {cta.subtitle}
      </motion.p>

      <motion.div
        className={styles.card}
        style={{ display: 'flex', justifyContent: 'center' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className={styles.buttonGroup}>
          <Link href={cta.link} className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
            {cta.buttonText} <ArrowRight size={20} />
          </Link>
          <Link href={partnership.booking.link} className={styles.secondaryButton} target="_blank">
            <MessageSquare size={20} style={{ marginRight: '8px' }} />
            {partnership.booking.text}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
