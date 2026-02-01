import { content } from '@/data/content';
import styles from './CareerElementsSection.module.css';

export default function CareerElementsSection() {
  const { careerElements } = content;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Elemen Penting Upgrade <span style={{ color: 'var(--color-accent-yellow)' }}>Karier</span>
      </h2>
      <div className={styles.grid}>
        {careerElements.items.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.number}>0{index + 1}</div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
