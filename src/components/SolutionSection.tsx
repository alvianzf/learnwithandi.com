import { content } from '@/data/content';
import styles from './SolutionSection.module.css';
import { Target, Users, Zap, Briefcase, CheckCircle } from 'lucide-react';

import { motion } from 'framer-motion';

export default function SolutionSection() {
  const { solution } = content;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id={solution.id} className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.badge}>Kenapa harus LWA?</span>
        <h2 className={styles.heading}>
          Learn With Andi<br />
          <span style={{ color: 'var(--color-accent-yellow)' }}>Hadir Buat Bantu Kamu</span>
        </h2>
      </motion.div>

      <div className={styles.grid}>
        {/* Core Messages */}
        <motion.div
          className={styles.coreWrapper}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {solution.coreMessages.map((msg, index) => {
            const icons = [Users, Target, Zap, Briefcase]; // Custom mapping
            const Icon = icons[index % icons.length];
            return (
              <motion.div key={index} className={styles.card} variants={item}>
                <div className={styles.iconBox}>
                  <Icon size={24} color="#FFD700" />
                </div>
                <p className={styles.cardText}>{msg}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Practical Elements */}
        <motion.div
          className={styles.practicalWrapper}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.practicalContent}>
            <h3 className={styles.subHeading}>Terus, dapet apa aja di LWA?</h3>
            <div className={styles.checkList}>
              {solution.practicalElements.map((el, index) => (
                <div key={index} className={styles.checkItem}>
                  <CheckCircle size={20} className={styles.checkIcon} />
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
