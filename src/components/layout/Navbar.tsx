"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { content } from '@/data/content';
import styles from './Navbar.module.css';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { global } = content;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isPartnership = pathname === '/partnership';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const homeLinks = [
    { name: 'Problem', href: '#problem' },
    { name: 'Why LWA?', href: '#solution' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'Program', href: '#program' },
    { name: 'Mentor', href: '#mentors' },
    { name: 'Pricing', href: '#offer' },
  ];

  const partnershipLinks = [
    { name: 'Partners', href: '#past-partners' },
    { name: 'Solusi', href: '#partnership-solutions' },
    { name: 'Kontak', href: '#partnership-cta' },
  ];

  const navLinks = isPartnership ? partnershipLinks : homeLinks;

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logoLink}
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img src={global.logo.white} alt={global.brandName} className={styles.logoImage} />
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.link}>
              {link.name}
            </Link>
          ))}
          
          {!isPartnership && (
            <Link href="/partnership" className={styles.ctaButton}>
              Partnership
            </Link>
          )}
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
            {!isPartnership && (
              <Link 
                href="/partnership" 
                className={styles.mobileCta}
                onClick={() => setIsOpen(false)}
              >
                Partnership
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
