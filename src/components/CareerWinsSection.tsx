"use client";

import { content } from '@/data/content';
import styles from './CareerWinsSection.module.css';
import { motion } from 'framer-motion';

export default function CareerWinsSection() {
  const { careerWins } = content;

  return (
    <section className={styles.section} id={careerWins.id}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {careerWins.title}
        </motion.span>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {careerWins.subtitle}
        </motion.h2>
        <motion.p
          className={styles.body}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {careerWins.body}
        </motion.p>
      </motion.div>
    </section>
  );
}
