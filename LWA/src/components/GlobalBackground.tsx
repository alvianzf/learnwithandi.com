"use client";

import { SquigglyBackground } from '@alvianzf/squiggly-lines-go-brrr';

export default function GlobalBackground() {
  return (
    <SquigglyBackground
      count={50}
      minStrokeWidth={1}
      maxStrokeWidth={4}
      colors={['rgba(255, 215, 0, 0.4)', 'rgba(128, 128, 128, 0.4)']}
      variant="worms"
    />
  );
}
