import { content } from '@/data/content';
import styles from './QualificationSection.module.css';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function QualificationSection() {
  const { qualification } = content;

  return (
    <section id={qualification.id} className={styles.section}>
      <h2 className={styles.mainHeading}>
        Kalau Mau <span style={{ color: 'var(--color-accent-yellow)' }}>JOIN</span>
        <br />Please banget pastiin:
      </h2>

      <div className={styles.grid}>
        {/* DO'S */}
        <div className={`${styles.column} ${styles.dos}`}>
          <h3 className={styles.heading}>{qualification.doTitle}</h3>
          <ul className={styles.list}>
            {qualification.dos.map((item, index) => (
              <li key={index} className={styles.item}>
                <CheckCircle2 size={24} color="#4ADE80" className={styles.icon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'TS */}
        <div className={`${styles.column} ${styles.donts}`}>
          <h3 className={styles.heading}>{qualification.dontTitle}</h3>
          <ul className={styles.list}>
            {qualification.donts.map((item, index) => (
              <li key={index} className={styles.item}>
                <XCircle size={24} color="#EF4444" className={styles.icon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
