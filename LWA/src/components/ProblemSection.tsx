import { content } from '@/data/content';
import styles from './ProblemSection.module.css';
import { CloudRain, UserX, Linkedin, MessageSquare, BookX } from 'lucide-react';

export default function ProblemSection() {
  const { problem } = content;

  // Icon mapping based on index or content logic
  const icons = [
    CloudRain, // "Jarang dipanggil"
    UserX, // "Di-ghosting"
    Linkedin, // "LinkedIn sepi"
    MessageSquare, // "Interview blank"
    BookX // "Takut belajar"
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
