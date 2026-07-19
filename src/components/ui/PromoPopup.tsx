"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { content } from '@/data/content';
import styles from './PromoPopup.module.css';

const DISMISSED_KEY = 'lwa:promoDismissed';

export default function PromoPopup() {
  const { promoPopup } = content;
  const [isOpen, setIsOpen] = useState(false);

  const dismiss = useCallback(() => {
    // Persisted, otherwise closing it only lasts until the next page load, so
    // navigating / -> /partnership re-showed the popup two seconds later.
    try {
      window.localStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      // Private mode / storage disabled: degrade to per-session dismissal.
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!promoPopup.show) return;

    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISSED_KEY) === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, [promoPopup.show]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, dismiss]);

  if (!isOpen || !promoPopup.show) return null;

  return (
    <div className={styles.overlay} onClick={dismiss}>
      <div
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={dismiss}
          aria-label="Close promo"
        >
          &times;
        </button>
        <div className={styles.imageContainer}>
          {/* Using standard img tag for simplicity with user assets, could use Next Image if width/height known */}
          <img src={promoPopup.image} alt={promoPopup.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 id="promo-title" className={styles.title}>{promoPopup.title}</h3>
          <p className={styles.text}>{promoPopup.text}</p>
          <Link href={promoPopup.cta.link} className={styles.cta} onClick={dismiss}>
            {promoPopup.cta.text}
          </Link>
        </div>
      </div>
    </div>
  );
}
