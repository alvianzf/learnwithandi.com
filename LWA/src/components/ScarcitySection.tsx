import { content } from '@/data/content';
import styles from './ScarcitySection.module.css';

export default function ScarcitySection() {
  const { scarcity } = content;

  return (
    <section id={scarcity.id} className={styles.section}>
      <div className={styles.container}>
        <span className={styles.icon}>⚠️</span>
        <div className={styles.messages}>
          {scarcity.messages.map((msg, index) => (
            <p key={index} className={styles.message}>{msg}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
