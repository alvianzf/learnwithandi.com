"use client";

import { content } from '@/data/content';
import styles from './PastPartners.module.css';
import { motion } from 'framer-motion';

export default function PastPartners() {
  const { partnership } = content;
  const { pastPartners } = partnership;

  if (!pastPartners) return null;

  return (
    <section className={styles.section} id="past-partners">
      <div className={styles.container}>
        <motion.h3 
          className={styles.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {pastPartners.title}
        </motion.h3>

        <div className={styles.grid}>
          {pastPartners.logos.map((partner, index) => (
            <motion.div 
              key={index} 
              className={styles.logoWrapper}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <img 
                src={partner.image} 
                alt={partner.name} 
                className={styles.logo}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
