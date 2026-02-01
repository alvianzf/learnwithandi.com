"use client";

import { content } from '@/data/content';
import styles from './CareerWinsSection.module.css';

export default function CareerWinsSection() {
  const { careerWins } = content;

  return (
    <section className={styles.section} id={careerWins.id}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>{careerWins.title}</span>
        <h2 className={styles.title}>{careerWins.subtitle}</h2>
        <p className={styles.body}>{careerWins.body}</p>
      </div>
    </section>
  );
}
