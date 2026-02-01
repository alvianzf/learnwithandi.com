import { content } from '@/data/content';
import styles from './SolutionSection.module.css';
import { Target, Users, Zap, Briefcase, CheckCircle } from 'lucide-react';

export default function SolutionSection() {
  const { solution } = content;

  return (
    <section id={solution.id} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>Why LWA?</span>
        <h2 className={styles.heading}>Learn With Andi<br />Hadir untuk Kamu</h2>
      </div>

      <div className={styles.grid}>
        {/* Core Messages */}
        <div className={styles.coreWrapper}>
          {solution.coreMessages.map((msg, index) => {
            const icons = [Users, Target, Zap, Briefcase]; // Custom mapping
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconBox}>
                  <Icon size={24} color="#FFD700" />
                </div>
                <p className={styles.cardText}>{msg}</p>
              </div>
            );
          })}
        </div>

        {/* Practical Elements */}
        <div className={styles.practicalWrapper}>
          <div className={styles.practicalContent}>
            <h3 className={styles.subHeading}>Apa yang kamu dapatkan?</h3>
            <div className={styles.checkList}>
              {solution.practicalElements.map((el, index) => (
                <div key={index} className={styles.checkItem}>
                  <CheckCircle size={20} className={styles.checkIcon} />
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
