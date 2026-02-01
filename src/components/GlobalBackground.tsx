"use client";

import { useEffect, useState } from 'react';
import styles from './GlobalBackground.module.css';

export default function GlobalBackground() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <div
        className={styles.patternLayer}
        style={{ transform: `translateY(${-offsetY * 0.2}px)` }}
      />
      <div className={styles.overlay} />
    </div>
  );
}
