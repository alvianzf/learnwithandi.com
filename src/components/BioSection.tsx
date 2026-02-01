import { content } from '@/data/content';
import styles from './BioSection.module.css';

export default function BioSection() {
  const { bio } = content;

  return (
    <section id={bio.id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <img src={bio.image} alt={bio.name} className={styles.image} />
          </div>
        </div>
        <div className={styles.textCol}>
          <h2 className={styles.heading}>Why Learn With Andi?</h2>
          <h3 className={styles.name}>{bio.name}</h3>
          <p className={styles.description}>{bio.description}</p>

          <div className={styles.philosophyContainer}>
            <h4 className={styles.philosophyTitle}>Philosophy:</h4>
            <ul className={styles.philosophyList}>
              {bio.philosophy.map((item, idx) => (
                <li key={idx} className={styles.philosophyItem}>"{item}"</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
