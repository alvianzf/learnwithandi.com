"use client";

import { content } from '@/data/content';
import styles from './CareerElementsSection.module.css';

import { motion } from 'framer-motion';

export default function CareerElementsSection() {
  const { careerElements } = content;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.section}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Elemen Penting Upgrade <span style={{ color: 'var(--color-accent-yellow)' }}>Karier</span>
      </motion.h2>
      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {careerElements.items.map((el, index) => (
          <motion.div key={index} className={styles.card} variants={item}>
            <div className={styles.number}>0{index + 1}</div>
            <h3 className={styles.title}>{el.title}</h3>
            <p className={styles.description}>{el.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
