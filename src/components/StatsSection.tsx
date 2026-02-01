import { content } from '@/data/content';

export default function StatsSection() {
  const { stats } = content;

  return (
    <section style={{
      padding: '4rem 1.5rem',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.03)',
      borderTop: '1px solid #333',
      borderBottom: '1px solid #333'
    }}>
      <h2 style={{
        fontSize: '3rem',
        fontWeight: 800,
        color: '#fff',
        fontFamily: 'inherit'
      }}>
        {stats.text}
      </h2>
    </section>
  );
}
