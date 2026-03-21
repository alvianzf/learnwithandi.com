"use client";

import Link from 'next/link';
import { content } from '@/data/content';
import styles from './CtaSection.module.css'; // Reusing styles for consistency
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnershipInPerson() {
  const { partnership } = content;
  const { inPerson } = partnership;

  return (
    <section className={styles.section} id="partnership-in-person" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '80px 0' }}>
      <div className={styles.container} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--color-accent-yellow)', borderRadius: '12px', marginBottom: '24px', color: 'black' }}>
            <MessageSquare size={32} />
          </div>
          
          <h2 className={styles.title} style={{ marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: inPerson.title }} />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent-blue)', marginBottom: '20px', fontWeight: '600' }}>{inPerson.subtitle}</h3>
          
          <p className={styles.subtext} style={{ marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.8)' }}>
            {inPerson.description}
          </p>

          <div className={styles.buttonGroup} style={{ justifyContent: 'center' }}>
            <Link 
              href={inPerson.link} 
              className={styles.primaryButton}
              target="_blank"
              style={{ background: 'var(--color-accent-yellow)', color: 'black', border: 'none' }}
            >
              <MessageSquare size={20} style={{ marginRight: '8px' }} />
              {inPerson.buttonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
