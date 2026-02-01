import { content } from '@/data/content';
import styles from './ProblemSection.module.css';

export default function ProblemSection() {
  const { problem } = content;

  return (
    <section id={problem.id} className={styles.section}>
      <h2 className={styles.heading}>Apakah kamu merasakan ini?</h2>
      <ul className={styles.painList}>
        {problem.painPoints.map((point, index) => (
          <li key={index} className={styles.painItem}>
            <span className={styles.icon}>⚠️</span>
            <p className={styles.text}>{point}</p>
          </li>
        ))}
      </ul>
      <p className={styles.closingQuote}>{problem.closingQuote}</p>
    </section>
  );
}
