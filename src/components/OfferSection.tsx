import { content } from '@/data/content';
import styles from './OfferSection.module.css';
import { CheckCircle2 } from 'lucide-react';

export default function OfferSection() {
  const { offer } = content;

  return (
    <section id={offer.id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.programName}>{offer.programName}</h2>
          <p className={styles.description}>{offer.description}</p>
        </div>

        <div className={styles.plansGrid}>
          {offer.plans?.map((plan, index) => (
            <div
              key={index}
              className={`${styles.planCard} ${plan.popular ? styles.popularCard : ''} ${plan.highlight ? styles.highlightCard : ''}`}
            >
              {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
              {plan.highlight && <div className={styles.highlightBadge}>{plan.highlightText || 'Best Value'}</div>}
              <div className={styles.cardHeader}>
                <span className={styles.planName}>{plan.name}</span>
                <span className={styles.planBilling}>{plan.billing}</span>
              </div>
              <div className={styles.price}>{plan.price}</div>

              <ul className={styles.benefits}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={styles.benefitItem}>
                    <CheckCircle2 color="#FFD700" size={20} className={styles.check} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.cta.link}
                className={styles.ctaButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
