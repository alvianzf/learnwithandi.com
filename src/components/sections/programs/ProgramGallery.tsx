"use client";

import { content } from '@/data/content';
import styles from './ProgramGallery.module.css';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

import { motion } from 'framer-motion';

export default function ProgramGallery() {
  const { offer } = content;
  // Fallback if programSteps is not defined yet
  const steps = offer.programSteps || [];

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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.section} id="program">
      <div className={styles.header}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Intip Program Belajar <span style={{ color: 'var(--color-accent-yellow)' }}>LWA</span>
        </motion.h2>
      </div>

      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {steps.map((step, index) => (
          <motion.div key={index} className={styles.card} variants={item}>
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
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className={styles.ctaWrapper}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <a href="#offer" className={styles.ctaButton}>
          Join Sekarang <ArrowRight size={20} />
        </a>
        {offer.consultation && (
          <a
            href={offer.consultation.link}
            className={styles.consultButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} />
            {offer.consultation.text}
          </a>
        )}
      </motion.div>
    </section>
  );
}
