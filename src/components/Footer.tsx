"use client";

import { content } from '@/data/content';
import styles from './Footer.module.css';
import { Instagram, Linkedin, Youtube, MessageCircle, AtSign } from 'lucide-react';

import { useEffect } from 'react'; // Add import

export default function Footer() {
  const { footer, global } = content;

  useEffect(() => {
    console.log("%c Crafted by Alvian \n https://alvianzf.id ", "background: #222; color: #bada55; font-size:12px; padding:4px; border-radius: 4px;");
  }, []);

  return (
    <footer className={styles.footer}>
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
              const Icons: Record<string, any> = {
                instagram: Instagram,
                linkedin: Linkedin,
                youtube: Youtube,
                threads: AtSign,
                whatsapp: MessageCircle
              };
              const Icon = Icons[key];
              if (!Icon) return null;

              return (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
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
    </footer>
  );
}
