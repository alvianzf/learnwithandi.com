import Link from 'next/link';
import { content } from '@/data/content';
import styles from './CtaSection.module.css';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const { finalCta } = content;

  return (
    <section id={finalCta.id} className={styles.section}>
      <h2 className={styles.title}>{finalCta.title}</h2>
      <p className={styles.subtext}>{finalCta.subtext}</p>

      <div className={styles.card}>
        <ul className={styles.valueList}>
          {finalCta.values.map((val, idx) => (
            <li key={idx} className={styles.valueItem}>✓ {val}</li>
          ))}
        </ul>

        <div className={styles.buttonGroup}>
          <Link href={finalCta.primaryCta.link} className={styles.primaryButton}>
            {finalCta.primaryCta.text} <ArrowRight size={20} />
          </Link>
          <Link href={finalCta.secondaryCta.link} className={styles.secondaryButton} target="_blank">
            <MessageCircle size={20} />
            {finalCta.secondaryCta.text}
          </Link>
        </div>
      </div>
    </section>
  );
}
