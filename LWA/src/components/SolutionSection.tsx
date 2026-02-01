import { content } from '@/data/content';
import styles from './SolutionSection.module.css';

export default function SolutionSection() {
  const { solution } = content;

  return (
    <section id={solution.id} className={styles.section}>
      <h2 className={styles.heading}>Learn With Andi Hadir untuk Kamu</h2>

      <div className={styles.grid}>
        <div className={styles.coreParams}>
          {solution.coreMessages.map((msg, index) => (
            <div key={index} className={styles.coreCard}>
              <p>{msg}</p>
            </div>
          ))}
        </div>

        <div className={styles.practical}>
          <h3 className={styles.subHeading}>Apa yang kamu dapatkan?</h3>
          <ul className={styles.practicalList}>
            {solution.practicalElements.map((el, index) => (
              <li key={index} className={styles.practicalItem}>✅ {el}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
