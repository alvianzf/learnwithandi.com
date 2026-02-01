import { content } from '@/data/content';
import styles from './ProblemSection.module.css';
import { FileQuestion, Ghost, UserX, MessageSquareWarning, Wallet, Compass, Linkedin, MessageSquare } from 'lucide-react';

export default function ProblemSection() {
  const { problem } = content;

  // Icon mapping:
  // 0: Jarang dipanggil -> FileQuestion
  // 1: Ghosting -> Ghost
  // 2: LinkedIn sepi -> Linkedin (NEW)
  // 3: Interview blank -> MessageSquare (NEW)
  // 4: Takut rugi -> Wallet
  // 5: Bingung -> Compass
  const icons = [
    FileQuestion,
    Ghost,
    Linkedin,
    MessageSquare,
    Wallet,
    Compass
  ];

  return (
    <section id={problem.id} className={styles.section}>
      <h2 className={styles.heading}>Apakah kamu merasakan ini?</h2>
      <div className={styles.grid}>
        {problem.painPoints.map((point, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <IconComponent size={32} color="#FFD700" />
              </div>
              <p className={styles.text}>{point}</p>
            </div>
          );
        })}
      </div>
      <p className={styles.closingQuote}>{problem.closingQuote}</p>
    </section>
  );
}
