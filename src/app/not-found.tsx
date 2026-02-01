import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.heading}>Wah, Nyasar Ya?</h2>
        <p className={styles.description}>
          Kayaknya halaman yang kamu cari lagi nggak ada di tempatnya atau mungkin udah pindah jalur. <br />
          Tenang aja, kita balikin kamu ke jalur karier yang benar.
        </p>
        <Link href="/" className={styles.cta}>
          <Home size={20} />
          Balik ke Beranda
        </Link>
      </div>
    </div>
  );
}
