"use client";

import { content } from '@/data/content';
import styles from './ProblemSection.module.css';
import { FileQuestion, Ghost, UserX, MessageSquareWarning, Wallet, Compass, Linkedin, MessageSquare } from 'lucide-react';

import { motion } from 'framer-motion';

export default function ProblemSection() {
  const { problem } = content;

  // Icon mapping:
  // 0: Jarang dipanggil -> FileQuestion
  // 1: Ghosting -> Ghost
  // 2: LinkedIn sepi -> Linkedin (NEW)
  // 3: Interview blank -> MessageSquare (NEW)
  // 4: Takut rugi -> Wallet
  // 5: Bingung -> Compass
  const icons = [
    FileQuestion,
    Ghost,
    Linkedin,
    MessageSquare,
    Wallet,
    Compass
  ];

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id={problem.id} className={styles.section}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Pernah ngerasain posisi kayak gini?
      </motion.h2>
      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {problem.painPoints.map((point, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <motion.div key={index} className={styles.card} variants={item}>
              <div className={styles.iconWrapper}>
                <IconComponent size={32} color="#FFD700" />
              </div>
              <p className={styles.text}>{point}</p>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.p
        className={styles.closingQuote}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {problem.closingQuote}
      </motion.p>
    </section>
  );
}
