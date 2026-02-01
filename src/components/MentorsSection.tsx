"use client";

import { content } from '@/data/content';
import styles from './MentorsSection.module.css';
import { useState } from 'react';
import { User, Linkedin, ArrowUpRight } from 'lucide-react';

const MentorImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} ${styles.placeholderImage}`}>
        <User size={64} color="#555" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default function MentorsSection() {
  const { mentors } = content;

  if (!mentors) return null;

  return (
    <section className={styles.section} id="mentors">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{mentors.title}</h2>
          <p className={styles.subtitle}>{mentors.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {mentors.items.map((mentor, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <MentorImage
                  src={mentor.image}
                  alt={mentor.name}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <button className={styles.profileBtn}>
                    View Profile <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{mentor.name}</h3>
                <p className={styles.role}>{mentor.role}</p>
                <div className={styles.divider}></div>
                <p className={styles.description}>{mentor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
