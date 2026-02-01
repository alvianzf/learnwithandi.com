"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './CtaSection.module.css';
import { MessageCircle, ArrowRight, Compass, Users, Wallet, Briefcase } from 'lucide-react';

import { motion } from 'framer-motion';

export default function CtaSection() {
  const { finalCta } = content;

  const icons = [Compass, Users, Wallet, Briefcase];

  return (
    <section id={finalCta.id} className={styles.section}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {finalCta.title}
      </motion.h2>
      <motion.p
        className={styles.subtext}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {finalCta.subtext}
      </motion.p>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ul className={styles.valueList}>
          {finalCta.values.map((val, idx) => {
            const Icon = icons[idx] || Compass;
            return (
              <li key={idx} className={styles.valueItem}>
                <Icon size={24} className={styles.icon} />
                <span>{val}</span>
              </li>
            );
          })}
        </ul>

        <div className={styles.buttonGroup}>
          <Link href={finalCta.primaryCta.link} className={styles.primaryButton}>
            {finalCta.primaryCta.text} <ArrowRight size={20} />
          </Link>
          <Link href={finalCta.secondaryCta.link} className={styles.secondaryButton} target="_blank">
            <MessageCircle size={20} />
            {finalCta.secondaryCta.text}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
