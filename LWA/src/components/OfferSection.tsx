import { content } from '@/data/content';
import styles from './OfferSection.module.css';

export default function OfferSection() {
  const { offer } = content;

  return (
    <section id={offer.id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.programName}>{offer.programName}</h2>
          <p className={styles.price}>{offer.price}</p>
          <p className={styles.description}>{offer.description}</p>

          <ul className={styles.benefits}>
            {offer.benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                <span className={styles.check}>✓</span> {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visuals}>
          {offer.images.slice(0, 2).map((img, i) => (
            <div key={i} className={styles.imageWrapper}>
              <img src={img} alt="Program preview" className={styles.image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
