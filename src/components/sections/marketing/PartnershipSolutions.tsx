"use client";

import { content } from '@/data/content';
import styles from './PartnershipSolutions.module.css';
import { Briefcase, Target, MessageSquare, TrendingUp, FileCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnershipSolutions() {
  const { partnership } = content;
  const { solutions } = partnership;

  const icons = [Briefcase, Target, MessageSquare, TrendingUp, FileCheck, Users];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  return (
    <section className={styles.section} id="partnership-solutions">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: solutions.title }} />
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {solutions.items.map((sol, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div key={index} className={styles.card} variants={item}>
                <div className={styles.iconBox}>
                  <Icon size={32} color="var(--color-accent-yellow)" />
                </div>
                <h3 className={styles.cardTitle}>{sol.title}</h3>
                <p className={styles.cardDesc}>{sol.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
