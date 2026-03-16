"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './CtaSection.module.css'; // Reusing styles
import { MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnershipCta() {
  const { partnership } = content;
  const { cta } = partnership;

  return (
    <section className={styles.section} id="partnership-cta">
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {cta.title}
      </motion.h2>
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
          <Link href={cta.link} className={styles.primaryButton}>
            {cta.buttonText} <ArrowRight size={20} />
          </Link>
          <Link href="http://wa.me/6282164815973" className={styles.secondaryButton} target="_blank">
            <MessageCircle size={20} />
            Contact Support
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
