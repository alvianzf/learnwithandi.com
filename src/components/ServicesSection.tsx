import { content } from '@/data/content';
import styles from './ServicesSection.module.css';
import {
  FileText, // Resume
  Linkedin, // LinkedIn
  MessageSquare, // Interview
  DollarSign, // Salary
  Globe, // Remote
  Award // Winning
} from 'lucide-react';

export default function ServicesSection() {
  const { services } = content;

  const icons = [FileText, Linkedin, MessageSquare, DollarSign, Globe, Award];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{services.title}</h2>
          <p className={styles.subtitle}>{services.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {services.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} color="#FFD700" />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
