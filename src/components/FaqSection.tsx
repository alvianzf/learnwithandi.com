"use client";

import { useState } from 'react';
import { content } from '@/data/content';
import styles from './FaqSection.module.css';

export default function FaqSection() {
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={faq.id} className={styles.section}>
      <h2 className={styles.heading}>Yang Sering Ditanyain <span style={{ color: 'var(--color-accent-yellow)' }}>(FAQ)</span></h2>
      <div className={styles.list}>
        {faq.items.map((item, index) => (
          <div key={index} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
            </button>
            <div
              className={`${styles.answerContainer} ${openIndex === index ? styles.open : ''}`}
            >
              <div
                className={styles.answer}
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
