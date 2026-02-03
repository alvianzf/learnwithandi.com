"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { content } from '@/data/content';
import styles from './PromoPopup.module.css';

export default function PromoPopup() {
  const { promoPopup } = content;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a delay, but check if enabled
    if (promoPopup.show) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // 2 second delay
      return () => clearTimeout(timer);
    }
  }, [promoPopup.show]);

  if (!isOpen || !promoPopup.show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button
          className={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close promo"
        >
          &times;
        </button>
        <div className={styles.imageContainer}>
          {/* Using standard img tag for simplicity with user assets, could use Next Image if width/height known */}
          <img src={promoPopup.image} alt={promoPopup.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{promoPopup.title}</h3>
          <p className={styles.text}>{promoPopup.text}</p>
          <Link href={promoPopup.cta.link} className={styles.cta} onClick={() => setIsOpen(false)}>
            {promoPopup.cta.text}
          </Link>
        </div>
      </div>
    </div>
  );
}
