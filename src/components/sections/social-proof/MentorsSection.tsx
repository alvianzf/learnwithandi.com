"use client";

import { content } from '@/data/content';
import styles from './MentorsSection.module.css';
import { useState } from 'react';
import { User, Linkedin, ArrowUpRight, Globe } from 'lucide-react';

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

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function MentorsSection() {
  const { mentors } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sliderRef.current || window.innerWidth > 768) return;
      const children = Array.from(sliderRef.current.children);
      let closestIndex = 0;
      let minDistance = Infinity;
      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const containerRect = sliderRef.current!.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      // init
      handleScroll();
    }
    return () => slider?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Auto slide every 2 seconds
    const interval = setInterval(() => {
      if (window.innerWidth > 768 || !sliderRef.current) return;
      const slider = sliderRef.current;
      const totalItems = mentors?.items.length || 0;
      let nextIndex = activeIndex + 1;
      if (nextIndex >= totalItems) {
        nextIndex = 0;
      }
      const targetChild = slider.children[nextIndex] as HTMLElement;
      if (targetChild) {
        slider.scrollTo({
          left: targetChild.offsetLeft - slider.offsetLeft,
          behavior: 'smooth'
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, mentors?.items.length]);

  if (!mentors) return null;

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

  const handleDotClick = (index: number) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const targetChild = slider.children[index] as HTMLElement;
    if (targetChild) {
      slider.scrollTo({
        left: targetChild.offsetLeft - slider.offsetLeft,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className={styles.section} id="mentors">
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Kenalan sama <span style={{ color: 'var(--color-accent-yellow)' }}>Mentor Kamu</span>
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {mentors.subtitle}
          </motion.p>
        </div>

        <motion.div
          ref={sliderRef}
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {mentors.items.map((mentor, index) => (
            <motion.div key={index} className={styles.card} variants={item}>
              <div className={styles.imageWrapper}>
                <MentorImage
                  src={mentor.image}
                  alt={mentor.name}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  {mentor.linkedin ? (
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.profileBtn}
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      View Profile <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <button className={styles.profileBtn}>
                      View Profile <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{mentor.name}</h3>
                <p className={styles.role}>{mentor.role}</p>
                <div className={styles.divider}></div>
                <p className={styles.description}>{mentor.description}</p>

                <div className={styles.socialLinks}>
                  {mentor.linkedin && (
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      aria-label={`${mentor.name} LinkedIn`}
                    >
                      <Linkedin size={24} />
                    </a>
                  )}
                  {mentor.website && (
                    <a
                      href={mentor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      aria-label={`${mentor.name} Website`}
                    >
                      <Globe size={24} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.dotsContainer}>
          {mentors.items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`${styles.dot} ${activeIndex === index ? styles.dotActive : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
