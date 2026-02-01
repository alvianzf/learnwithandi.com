import { content } from '@/data/content';
import styles from './OfferSection.module.css';
import { CheckCircle2, MessageCircle } from 'lucide-react';

import { motion } from 'framer-motion';

export default function OfferSection() {
  const { offer } = content;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id={offer.id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2
            className={styles.programName}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pilihan Investasi <span style={{ color: 'var(--color-accent-yellow)' }}>Karier</span>
          </motion.h2>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {offer.description}
          </motion.p>
        </div>

        <motion.div
          className={styles.plansGrid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {offer.plans?.map((plan, index) => (
            <motion.div
              key={index}
              className={`${styles.planCard} ${plan.popular ? styles.popularCard : ''} ${plan.highlight ? styles.highlightCard : ''}`}
              variants={item}
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
            </motion.div>
          ))}
        </motion.div>

        {offer.consultation && (
          <motion.div
            className={styles.consultationWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href={offer.consultation.link}
              className={styles.consultButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              {offer.consultation.text}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
