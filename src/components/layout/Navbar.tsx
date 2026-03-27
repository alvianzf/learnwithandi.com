"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { content } from '@/data/content';
import styles from './Navbar.module.css';
import { Menu, X, MessageSquare } from 'lucide-react';

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
    { name: 'PROBLEMS', href: '#problem' },
    { name: 'TESTIMONY', href: '#testimonials' },
    { name: 'PROGRAMS', href: '#program' },
    { name: 'MENTORS', href: '#mentors' },
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

          {isPartnership && (
            <Link 
              href={content.partnership.booking.link} 
              className={styles.ctaButton}
              target="_blank"
            >
              <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              {content.partnership.booking.text}
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
            {isPartnership && (
              <Link 
                href={content.partnership.booking.link} 
                className={styles.mobileCta}
                onClick={() => setIsOpen(false)}
                target="_blank"
              >
                <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                {content.partnership.booking.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
