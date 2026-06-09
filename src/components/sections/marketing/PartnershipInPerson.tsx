"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './PartnershipInPerson.module.css';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnershipInPerson() {
  const { partnership } = content;
  const { inPerson } = partnership;

  return (
    <section className={styles.section} id="partnership-in-person">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.iconWrapper}>
            <MessageSquare size={32} />
          </div>

          <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: inPerson.title }} />
          <h3 className={styles.subtitle}>{inPerson.subtitle}</h3>

          <p className={styles.description}>
            {inPerson.description}
          </p>

          <div className={styles.buttonGroup}>
            <Link
              href={inPerson.link}
              className={styles.primaryButton}
              target="_blank"
            >
              <MessageSquare size={20} />
              {inPerson.buttonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
