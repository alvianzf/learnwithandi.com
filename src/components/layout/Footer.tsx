"use client";

import { content } from '@/data/content';
import styles from './Footer.module.css';
import { Instagram, Linkedin, Youtube, MessageCircle, AtSign, type LucideIcon } from 'lucide-react';

// Module scope: this was rebuilt on every iteration of the render loop, and the
// `any` typing meant a typo in a `socials` key silently dropped the link.
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  threads: AtSign,
  whatsapp: MessageCircle,
};

import { useEffect } from 'react'; // Add import

import { motion } from 'framer-motion';

export default function Footer() {
  const { footer, global } = content;

  useEffect(() => {
    console.log("%c Crafted by Alvian Zachry Faturrahman \n https://www.linkedin.com/in/alvianzf/ ", "background: #222; color: #bada55; font-size:12px; padding:4px; border-radius: 4px;");
  }, []);

  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        {/* Left Column: Brand & Tagline */}
        <div className={styles.leftColumn}>
          <div className={styles.logoWrapper}>
            <img src={global.logo.white} alt={global.brandName} className={styles.logoImage} />
          </div>
          <p className={styles.tagline}>{footer.title}</p>
          <p className={styles.copyright}>{footer.copyright}</p>
        </div>

        {/* Navigation Column Removed */}

        {/* Right Column: Socials & Powered By */}
        <div className={styles.rightColumn}>
          <div className={styles.socials}>
            {Object.entries(global.socials).map(([key, url]) => {
              if (!url) return null;
              const Icon = SOCIAL_ICONS[key];
              if (!Icon) return null;

              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${global.brandName} on ${key}`}
                  className={styles.socialLink}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>

          <div className={styles.poweredSection}>
            <a href="https://alvianzf.id/" target="_blank" rel="noopener noreferrer" className={styles.hiddenLink}>
              {footer.subtitle}
            </a>
            <p className={styles.poweredName}>{footer.name}</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
