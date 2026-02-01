"use client";

import { content } from '@/data/content';
import styles from './TestimonialSection.module.css';

// Define the two rows of images
// Missing 2.webp
const row1Images = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const row2Images = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function TestimonialSection() {
  const { testimonials } = content;

  return (
    <section id={testimonials.id} className={styles.section}>
      <div className={styles.statsBanner}>
        <h2 className={styles.statsText}>{content.stats.text}</h2>
      </div>

      <div className={styles.container}>


        <div className={styles.marqueeContainer}>
          {/* Row 1 - Scrolling Left */}
          <div className={`${styles.marqueeRow} ${styles.marqueeToLeft}`}>
            {[...row1Images, ...row1Images].map((num, idx) => (
              <img
                key={`r1-${idx}`}
                src={`/assets/members/${num}.webp`}
                alt={`Member testimony ${num}`}
                className={styles.imageItem}
                loading="lazy"
              />
            ))}
          </div>

          {/* Row 2 - Scrolling Right */}
          <div className={`${styles.marqueeRow} ${styles.marqueeToRight}`}>
            {[...row2Images, ...row2Images].map((num, idx) => (
              <img
                key={`r2-${idx}`}
                src={`/assets/members/${num}.webp`}
                alt={`Member testimony ${num}`}
                className={styles.imageItem}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
