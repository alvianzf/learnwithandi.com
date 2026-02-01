"use client";

import { useState } from 'react';
import { content } from '@/data/content';
import styles from './ProgramGallery.module.css';
import { X } from 'lucide-react';

export default function ProgramGallery() {
  const { offer } = content;
  const [selectedItem, setSelectedItem] = useState<null | typeof offer.programDetails[0]>(null);

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {offer.programDetails.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => setSelectedItem(item)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${item.title}`}
          >
            <div className={styles.imageWrapper}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedItem && (
        <div className={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
            >
              <X size={24} color="#fff" />
            </button>
            <div className={styles.modalImageWrapper}>
              <img src={selectedItem.image} alt={selectedItem.title} className={styles.modalImage} />
            </div>
            <div className={styles.modalDetails}>
              <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
              <p className={styles.modalDescription}>{selectedItem.description}</p>
              <a href="#offer" className={styles.modalCta} onClick={() => setSelectedItem(null)}>
                Daftar Program Ini
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
