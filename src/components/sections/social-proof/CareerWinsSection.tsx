"use client";

import { content } from '@/data/content';
import placementsData from '@/data/placements.json';
import styles from './CareerWinsSection.module.css';
import { motion, useAnimationControls } from 'framer-motion';
import { Linkedin, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface Placement {
  name: string;
  linkedin: string;
  role: string;
  company: string;
  month: string;
  is_b2b: boolean;
  b2b_logo: string;
  partner_name: string;
}

interface MonthGroup {
  month: string;
  count: number;
  items: Placement[];
}

export default function CareerWinsSection() {
  const { careerWins } = content;
  const placements = placementsData as MonthGroup[];
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement>(null);

  // Doubling the list for infinite marquee effect
  const displayPlacements = [...placements, ...placements];

  const startMarquee = () => {
    controls.start({
      x: '-50%',
      transition: {
        duration: 80, // Slower for readability and better control feel
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (!isPaused) {
      startMarquee();
    } else {
      controls.stop();
    }
  }, [isPaused]);

  const handlePrev = () => {
    setIsPaused(true);
    controls.start({
      x: "+=340", // Skip one card width (approx)
      transition: { duration: 0.5, ease: "easeOut" }
    });
    // Resume auto-play after 3 seconds of inactivity
    setTimeout(() => setIsPaused(false), 3000);
  };

  const handleNext = () => {
    setIsPaused(true);
    controls.start({
      x: "-=340", // Skip one card width (approx)
      transition: { duration: 0.5, ease: "easeOut" }
    });
    // Resume auto-play after 3 seconds of inactivity
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section className={styles.section} id={careerWins.id}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.header}
        >
          <span className={styles.eyebrow}>{careerWins.title}</span>
          <h2 className={styles.title}>{careerWins.subtitle}</h2>
          <p className={styles.body}>{careerWins.body}</p>
        </motion.div>

        <div className={styles.marqueeWrapper}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`} 
            onClick={handlePrev}
            aria-label="Previous Month"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            className={styles.marqueeContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div 
              className={styles.marqueeTrack}
              animate={controls}
              initial={{ x: 0 }}
              ref={trackRef}
            >
              {displayPlacements.map((group, idx) => (
                <div key={`${group.month}-${idx}`} className={styles.monthCard}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.monthTitle}>{group.month}</h3>
                    <span className={styles.placementsCount}>{group.count} placements</span>
                  </div>
                  
                  <div className={styles.itemsList}>
                    {group.items.map((item, i) => (
                      <div key={`${item.name}-${i}`} className={styles.placementItem}>
                        <div className={styles.itemMain}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemRole}>{item.role}</span>
                        </div>
                        <div className={styles.itemMeta}>
                          {item.linkedin && (
                            <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                              <Linkedin size={12} />
                            </a>
                          )}
                          {item.is_b2b && item.b2b_logo && (
                            <img 
                              src={item.b2b_logo} 
                              alt={item.partner_name} 
                              className={styles.partnerIcon} 
                              data-partner={item.partner_name}
                            />
                          )}
                          {item.is_b2b && !item.b2b_logo && (
                            <Briefcase size={16} className={styles.partnerIcon} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={handleNext}
            aria-label="Next Month"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
