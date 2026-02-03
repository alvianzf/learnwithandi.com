"use client";

import { useState } from 'react';
import { content } from '@/data/content';
import styles from './FaqSection.module.css';

import { motion } from 'framer-motion';

export default function FaqSection() {
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id={faq.id} className={styles.section}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Yang Sering Ditanyain <span style={{ color: 'var(--color-accent-yellow)' }}>(FAQ)</span>
      </motion.h2>
      <motion.div
        className={styles.list}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {faq.items.map((faqItem, index) => (
          <motion.div key={index} className={styles.item} variants={item}>
            <button
              className={styles.question}
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              {faqItem.question}
              <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
            </button>
            <div
              className={`${styles.answerContainer} ${openIndex === index ? styles.open : ''}`}
            >
              <div
                className={styles.answer}
                dangerouslySetInnerHTML={{ __html: faqItem.answer }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
