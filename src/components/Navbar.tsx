"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { content } from '@/data/content';
import styles from './Navbar.module.css';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { global } = content;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problem', href: '#problem' },
    { name: 'Program', href: '#offer' },
    { name: 'Mentor', href: '#bio' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="#" className={styles.logoLink}>
          <img src={global.logo.white} alt={global.brandName} className={styles.logoImage} />
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.link}>
              {link.name}
            </Link>
          ))}
          <Link href="#offer" className={styles.ctaButton}>
            Join LWA
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X color="white" /> : <Menu color="white" />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#offer"
              className={styles.mobileCta}
              onClick={() => setIsOpen(false)}
            >
              Join LWA
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
