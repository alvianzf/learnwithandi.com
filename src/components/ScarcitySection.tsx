import { content } from '@/data/content';
import styles from './ScarcitySection.module.css';
import { AlertTriangle, Clock, ShieldAlert } from 'lucide-react';

export default function ScarcitySection() {
  const { scarcity } = content;

  return (
    <section id={scarcity.id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.glowBg}></div>
        <div className={styles.content}>
          <div className={styles.iconRow}>
            <Clock size={32} className={styles.icon} />
            <ShieldAlert size={32} className={styles.icon} />
          </div>
          <h2 className={styles.heading}>Important Notice</h2>
          <div className={styles.divider}></div>
          <div className={styles.messages}>
            {scarcity.messages.map((msg, index) => (
              <p key={index} className={styles.message}>{msg}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
