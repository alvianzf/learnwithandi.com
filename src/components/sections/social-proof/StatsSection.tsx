import { content } from '@/data/content';
import styles from './StatsSection.module.css';

export default function StatsSection() {
  const { stats } = content;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        {stats.text}
      </h2>
    </section>
  );
}
