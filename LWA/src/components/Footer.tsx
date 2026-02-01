import { content } from '@/data/content';
import styles from './Footer.module.css';

export default function Footer() {
  const { footer, global } = content;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <p className={styles.marketing}>{footer.marketing}</p>
          <p className={styles.copyright}>{footer.copyright}</p>
        </div>
        <div className={styles.contact}>
          <p>Email: <a href={`mailto:${global.email}`}>{global.email}</a></p>
        </div>
      </div>
    </footer>
  );
}
