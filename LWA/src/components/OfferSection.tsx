import { content } from '@/data/content';
import styles from './OfferSection.module.css';
import { CheckCircle2 } from 'lucide-react';

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
                <CheckCircle2 color="#FFD700" size={24} className={styles.check} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Images removed from here, moving to separate Gallery Section */}
      </div>
    </section>
  );
}
