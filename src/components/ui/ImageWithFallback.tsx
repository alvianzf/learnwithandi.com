"use client";

import { useState, type ReactNode } from 'react';

/**
 * An <img> that swaps in a placeholder instead of showing a broken-image icon.
 * The member and mentor photo sets are maintained as hardcoded index ranges, so
 * gaps happen in practice — TestimonialSection carries a "Missing 2.webp" note.
 */
export default function ImageWithFallback({
  src,
  alt,
  className,
  fallback,
  loading,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback: ReactNode;
  loading?: 'lazy' | 'eager';
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
