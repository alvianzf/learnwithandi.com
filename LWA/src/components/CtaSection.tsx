import Link from 'next/link';
import { content } from '@/data/content';
import styles from './CtaSection.module.css';

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

        <Link href={finalCta.link} className={styles.button}>
          {finalCta.buttonText}
        </Link>
      </div>
    </section>
  );
}
