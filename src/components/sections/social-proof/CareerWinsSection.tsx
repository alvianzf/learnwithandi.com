"use client";

import { content } from '@/data/content';
import placementsData from '@/data/placements.json';
import styles from './CareerWinsSection.module.css';
import { motion, animate, useInView } from 'framer-motion';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  
  const isHovered = useRef(false);
  const isManualScrolling = useRef(false);
  const manualTimeout = useRef<NodeJS.Timeout | null>(null);
  const reqRef = useRef<number>(0);

  // Doubling the list for infinite continuous effect
  const displayPlacements = [...placements, ...placements];

  useEffect(() => {
    if (isInView) {
      const animation = animate(0, 450, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCount(Math.round(latest));
        }
      });
      return animation.stop;
    }
  }, [isInView]);

  // Continuous slow scroll loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollSpeed = 1; // 1 pixel per frame for slow continuous scroll
    
    const loop = () => {
      if (!isHovered.current && !isManualScrolling.current && trackRef.current) {
        trackRef.current.scrollLeft += scrollSpeed;
        
        // Infinite loop: if we scroll past the first set, instantly jump back
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (trackRef.current.scrollLeft >= halfWidth) {
          trackRef.current.scrollLeft -= halfWidth;
        }
      }
      reqRef.current = requestAnimationFrame(loop);
    };
    
    reqRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  const getClosestPhysicalIndex = () => {
    if (!trackRef.current) return 0;
    const track = trackRef.current;
    const children = Array.from(track.children);
    let closestIndex = 0;
    let minDistance = Infinity;
    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const containerRect = track.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    return closestIndex;
  };

  useEffect(() => {
    const handleScroll = () => {
      const closestPhysicalIndex = getClosestPhysicalIndex();
      setActiveIndex(closestPhysicalIndex % placements.length);
    };

    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => track?.removeEventListener('scroll', handleScroll);
  }, [placements.length]);

  const scrollToPhysicalCard = (index: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const targetChild = track.children[index] as HTMLElement;
    if (targetChild) {
      isManualScrolling.current = true;
      const scrollPos = targetChild.offsetLeft - (track.children[0] as HTMLElement).offsetLeft;
      track.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
      
      // Pause continuous scroll for 2 seconds after manual interaction
      if (manualTimeout.current) clearTimeout(manualTimeout.current);
      manualTimeout.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 2000);
    }
  };

  const handlePrev = () => {
    const currentIdx = getClosestPhysicalIndex();
    let targetIdx = currentIdx - 1;
    // If we try to scroll backwards past the beginning, instantly jump to the second set to loop seamlessly
    if (targetIdx < 0 && trackRef.current) {
      trackRef.current.scrollLeft += trackRef.current.scrollWidth / 2;
      targetIdx += placements.length;
    }
    scrollToPhysicalCard(targetIdx);
  };

  const handleNext = () => {
    const currentIdx = getClosestPhysicalIndex();
    let targetIdx = currentIdx + 1;
    // If we try to scroll forwards past the end, instantly jump to the first set to loop seamlessly
    if (targetIdx >= displayPlacements.length && trackRef.current) {
      trackRef.current.scrollLeft -= trackRef.current.scrollWidth / 2;
      targetIdx -= placements.length;
    }
    scrollToPhysicalCard(targetIdx);
  };

  const handleDotClick = (index: number) => {
    const currentIdx = getClosestPhysicalIndex();
    // Choose the physical dot (set 1 or set 2) closest to where we currently are to avoid giant rewind scrolls
    const isSecondSet = currentIdx >= placements.length;
    const targetIdx = index + (isSecondSet ? placements.length : 0);
    scrollToPhysicalCard(targetIdx);
  };

  return (
    <section className={styles.section} id={careerWins.id}>
      <div className={styles.container}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.header}
        >
          <span className={styles.eyebrow}>{careerWins.title}</span>
          <h2 className={styles.title}>{careerWins.subtitle}</h2>
          <p className={styles.body}>{careerWins.body}</p>
          
          <div className={styles.counterWrapper}>
            <span className={styles.counterNumber}>{count}+</span>
            <span className={styles.counterLabel}>Total Placements</span>
          </div>
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
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
          >
            <div 
              className={styles.marqueeTrack}
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
            </div>
          </div>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={handleNext}
            aria-label="Next Month"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={styles.dotsContainer}>
          {placements.map((_, index) => (
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
