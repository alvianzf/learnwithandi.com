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

  return (
    <section id={testimonials.id} className={styles.section}>
      <h2 className={styles.heading}>Apa Kata Mereka?</h2>

      <div className={styles.carouselContainer}>
        <button onClick={prevSlide} className={styles.navButton} aria-label="Previous testimony">←</button>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={testimonials.items[currentIndex].image}
              alt={testimonials.items[currentIndex].author}
              className={styles.image}
            />
          </div>
          <blockquote className={styles.quote}>
            "{testimonials.items[currentIndex].quote}"
          </blockquote>
          <p className={styles.author}>{testimonials.items[currentIndex].author}</p>
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
    </section>
  );
}
