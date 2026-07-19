"use client";

import { content } from '@/data/content';
import styles from './PartnershipWhy.module.css';
import { motion } from 'framer-motion';
import { Crosshair, Briefcase, TrendingUp } from 'lucide-react';

export default function PartnershipWhy() {
  // content is a static literal, so `why` is always present and typed by
  // inference. The previous `as { why: any }` cast defeated exactly the check
  // that would catch a rename in content.ts before it reached the page.
  const { why } = content.partnership;

  const icons = [Crosshair, Briefcase, TrendingUp];

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
    <section className={styles.section} id="partnership-why">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: why.title }} />
          <p className={styles.description}>{why.description}</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {why.points.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div key={index} className={styles.card} variants={item}>
                <div className={styles.iconBox}>
                  <Icon size={32} color="var(--color-accent-yellow)" />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{point.title}</h3>
                  <p className={styles.cardDesc}>{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
