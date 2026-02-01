"use client";

import { content } from '@/data/content';
import styles from './QualificationSection.module.css';
import { CheckCircle2, XCircle } from 'lucide-react';

import { motion } from 'framer-motion';

export default function QualificationSection() {
  const { qualification } = content;

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const listItemRight = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section id={qualification.id} className={styles.section}>
      <motion.h2
        className={styles.mainHeading}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Kalau Mau <span style={{ color: 'var(--color-accent-yellow)' }}>JOIN</span>
        <br />Please banget pastiin:
      </motion.h2>

      <div className={styles.grid}>
        {/* DO'S */}
        <motion.div
          className={`${styles.column} ${styles.dos}`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.heading}>{qualification.doTitle}</h3>
          <motion.ul
            className={styles.list}
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {qualification.dos.map((item, index) => (
              <motion.li key={index} className={styles.item} variants={listItem}>
                <CheckCircle2 size={24} color="#4ADE80" className={styles.icon} />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* DON'TS */}
        <motion.div
          className={`${styles.column} ${styles.donts}`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={styles.heading}>{qualification.dontTitle}</h3>
          <motion.ul
            className={styles.list}
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {qualification.donts.map((item, index) => (
              <motion.li key={index} className={styles.item} variants={listItemRight}>
                <XCircle size={24} color="#EF4444" className={styles.icon} />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
