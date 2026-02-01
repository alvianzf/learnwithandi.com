"use client";

import { content } from '@/data/content';
import styles from './ProgramGallery.module.css';
import { CheckCircle2 } from 'lucide-react';

export default function ProgramGallery() {
  const { offer } = content;
  // Fallback if programSteps is not defined yet
  const steps = offer.programSteps || [];

  return (
    <section className={styles.section} id="program">
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Learn With Andi's <span style={{ color: 'var(--color-accent-yellow)' }}>Program</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {steps.map((step, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={step.image} alt={step.title} className={styles.cardImage} />
              <div className={styles.numberBadge}>{step.number}</div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.subtitle}>{step.subtitle}</p>
              <p className={styles.description}>{step.description}</p>

              <ul className={styles.pointsList}>
                {step.points?.map((point, idx) => (
                  <li key={idx} className={styles.pointItem}>
                    <CheckCircle2 size={16} className={styles.pointIcon} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
