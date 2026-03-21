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
          dangerouslySetInnerHTML={{ __html: pastPartners.title }}
        />

        <div className={styles.grid}>
          {pastPartners.logos.map((partner, index) => {
            const useBorder = partner.name.toLowerCase().includes('koda') || partner.name.toLowerCase().includes('devshore');
            return (
            <motion.div 
              key={index} 
              className={`${styles.logoWrapper} ${useBorder ? styles.borderWhite : styles.bgWhite}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.2, transition: { duration: 0.2, delay: 0 } }}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
