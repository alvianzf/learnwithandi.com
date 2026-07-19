/**
 * Horizontal overflow check.
 *
 * `body { overflow-x: hidden }` in globals.css clips overflow, so it never shows
 * up in scrollWidth. This unclips the page, then walks every element looking for
 * boxes that stick out past the viewport. Elements clipped by a genuine scroll
 * container (marquee tracks, carousels) are ignored — only real page-level
 * overflow is reported.
 *
 * Usage: node scripts/check-overflow.mjs [baseUrl]
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3000';
const PATHS = ['/', '/partnership'];
const WIDTHS = [320, 360, 390, 414, 768, 820, 1024, 1280, 1440, 1920];
const TOLERANCE = 1; // sub-pixel rounding

const findOverflow = (tolerance) => {
  document.documentElement.style.overflowX = 'visible';
  document.body.style.overflowX = 'visible';
  document.documentElement.style.maxWidth = 'none';
  document.body.style.maxWidth = 'none';

  const vw = window.innerWidth;
  const clipped = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'hidden' || ox === 'auto' || ox === 'scroll' || ox === 'clip') return true;
    }
    return false;
  };
  const describe = (el) => {
    const cls = (el.className || '').toString().trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    return el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (cls ? `.${cls}` : '');
  };

  const hits = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const over = Math.max(r.right - vw, -r.left);
    if (over > tolerance && !clipped(el)) {
      hits.push({ el: describe(el), overflowPx: Math.round(over), width: Math.round(r.width) });
    }
  }
  // Deepest elements repeat their parent's overflow; keep the worst few distinct ones.
  const seen = new Set();
  return hits
    .sort((a, b) => b.overflowPx - a.overflowPx)
    .filter((h) => !seen.has(h.el) && seen.add(h.el))
    .slice(0, 8);
};

const browser = await chromium.launch();
const failures = [];

for (const path of PATHS) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE + path, { waitUntil: 'networkidle' });

    // Sections animate in with framer-motion `whileInView` and start life
    // translated (x: -50 / y: 50). They are `once: true`, so walking the page in
    // viewport-sized steps settles every one of them at its final position —
    // without this, untriggered sections read as false-positive overflow.
    const steps = await page.evaluate(() =>
      Math.ceil(document.body.scrollHeight / window.innerHeight)
    );
    for (let s = 0; s <= steps; s++) {
      await page.evaluate((i) => window.scrollTo(0, i * window.innerHeight), s);
      await page.waitForTimeout(250);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const hits = await page.evaluate(findOverflow, TOLERANCE);
    const label = `${path} @ ${width}px`;
    if (hits.length) {
      failures.push({ label, hits });
      console.log(`FAIL  ${label}`);
      for (const h of hits) console.log(`        +${h.overflowPx}px  ${h.el}  (w=${h.width})`);
    } else {
      console.log(`ok    ${label}`);
    }
    await page.close();
  }
}

await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} viewport/page combination(s) overflow horizontally.`);
  process.exit(1);
}
console.log('\nNo horizontal overflow at any tested viewport.');
