"use client";

import { useState } from 'react';
import { content } from '@/data/content';
import styles from './TestimonialSection.module.css';

export default function TestimonialSection() {
  const { testimonials } = content;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length);
  };

  const currentItem = testimonials.items[currentIndex];

  return (
    <section id={testimonials.id} className={styles.section}>
      <div className={styles.statsBanner}>
        <h2 className={styles.statsText}>{content.stats.text}</h2>
      </div>

      <div className={styles.container}>
        <h2 className={styles.heading}>Apa Kata Mereka?</h2>

        <div className={styles.sliderWrapper}>
          <button onClick={prevSlide} className={styles.navButton} aria-label="Previous testimony">←</button>

          <div className={styles.slideContent}>
            {/* Full image/screenshot container */}
            <div className={styles.imageContainer}>
              <img
                src={currentItem.image}
                alt={`${currentItem.author} testimony`}
                className={styles.image}
              />
            </div>

            {/* Caption below if needed, though screenshot usually contains text */}
            <div className={styles.caption}>
              <p className={styles.author}>{currentItem.author}</p>
              {/* Optional quote rendering if image doesn't say it all, keeping it minimal as per "full picture" request */}
              <p className={styles.quote}>"{currentItem.quote}"</p>
            </div>
          </div>

          <button onClick={nextSlide} className={styles.navButton} aria-label="Next testimony">→</button>
        </div>

        <div className={styles.dots}>
          {testimonials.items.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
