#!/usr/bin/env node
// Converts the LWA placement CSV (semicolon-delimited) to placements.json

const fs = require('fs');
const path = require('path');

const CSV_PATH = process.argv[2] || path.join(__dirname, '../../Downloads/Data LWA - Placement (1).csv');
const OUT_PATH = path.join(__dirname, '../src/data/placements.json');

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PARTNER_LOGOS = {
  'Koda': '/assets/partners/koda-academy.webp',
  'BatamOn Asia': '/assets/partners/batamon.png',
  'Binar': '/assets/partners/binar.png',
  'Devshore': '/assets/partners/devshore.png',
  'Dicoding': '/assets/partners/dicoding.png',
  'Dumbways': '/assets/partners/Dumbways.png',
  'Skilldev': '/assets/partners/skilldev.webp',
  'Ruby Thalib': '/assets/partners/rubythalib.png',
  'Akal': '/assets/partners/koda-academy.webp', // fallback
};

const KNOWN_PARTNERS = Object.keys(PARTNER_LOGOS);
const WORK_TYPES = new Set(['Onsite', 'Remote', 'Hybrid']);

const NOTE_KEYWORDS = [
  '90 Days', 'Batch', 'Roasting', 'LIVING', 'No Matching Data',
  'Webinar', 'Dapat Kerja', 'Spill Bocoran', 'Event -', 'Exclusive',
  'Upgrade', 'Tanoto', 'Slow Growth', 'How to', 'CSR :', 'Premium :',
  'Basic Package', 'Monthly Subscription', 'Main di Upwork', 'Akal x LWA',
  'Premium KODA', 'Dari Konten', 'NO FULLTIME', 'Living your Dream',
];

function isNoteField(s) {
  if (!s) return true;
  return NOTE_KEYWORDS.some(k => s.includes(k));
}

function isSkipName(name) {
  if (!name) return true;
  const skip = [
    'B2B', 'Anonim', 'Unknown', 'Anonym', 'hide', 'Hide', 'HIDE',
    'Mas ', 'Mrs ', 'Mr ', 'Senior ', 'CTO', 'PE', 'RM',
    'mas ', 'hide B2B', 'Hide B2B', 'Senior HR', 'Senior PM',
    'Senior Dev', 'Mentor Bahasa', 'Mas A', 'Mas CB', 'Mas FM',
    'Mas Hatta', 'Mas Andi', 'iyan sofian', // incomplete entries
  ];
  if (name === 'iyan sofian') return true;
  return skip.some(s => name === s || name.startsWith(s)) ||
    name.toLowerCase().includes('minta dirahasiakan') ||
    name.toLowerCase().includes('minta di hide') ||
    name.includes('(') ||
    (name.length <= 3 && name === name.toUpperCase());
}

function parseDate(s) {
  // format: M/D/YYYY or M/1/YYYY
  const m = s.match(/^(\d{1,2})\/\d+\/(\d{4})$/);
  if (!m) return null;
  const month = parseInt(m[1], 10);
  const year = parseInt(m[2], 10);
  if (month < 1 || month > 12) return null;
  return {
    month: `${MONTH_NAMES[month]} ${year}`,
    sort_key: `${year}-${String(month).padStart(2, '0')}`,
  };
}

function parseLine(line) {
  // The CSV wraps rows containing commas in double quotes to protect commas in notes.
  // Since we split by semicolons (not commas), simply strip surrounding quotes.
  let raw = line.trim();
  if (raw.startsWith('"') && raw.endsWith('"')) {
    raw = raw.slice(1, -1);
  }

  const fields = raw.split(';').map(f => f.trim());

  // Remove trailing empty/comma fields
  while (fields.length && (fields[fields.length - 1] === '' || fields[fields.length - 1] === ',')) {
    fields.pop();
  }

  // Find date field index
  let dateIdx = -1;
  let dateInfo = null;
  for (let i = 0; i < fields.length; i++) {
    const d = parseDate(fields[i]);
    if (d) { dateIdx = i; dateInfo = d; break; }
  }
  if (dateIdx === -1) return null;

  let i = dateIdx + 1;

  // Name
  const name = fields[i++];
  if (!name || isSkipName(name)) return null;

  // LinkedIn (optional)
  let linkedin = '';
  if (fields[i] && (fields[i].startsWith('http') || fields[i].startsWith('linkedin'))) {
    linkedin = fields[i++];
    if (!linkedin.startsWith('http')) linkedin = 'https://' + linkedin;
  }

  // Partner (optional)
  let partner_name = '';
  let b2b_logo = '';
  let is_b2b = false;
  const potentialPartner = fields[i];
  if (potentialPartner && KNOWN_PARTNERS.includes(potentialPartner)) {
    partner_name = potentialPartner;
    b2b_logo = PARTNER_LOGOS[potentialPartner];
    is_b2b = true;
    i++;
  }

  // Role + grouped_role + company + type (all optional)
  let role = '';
  let company = '';

  if (fields[i] && !isNoteField(fields[i]) && !WORK_TYPES.has(fields[i])) {
    const potentialRole = fields[i];
    const potentialGrouped = fields[i + 1];
    const potentialCompany = fields[i + 2];
    const potentialType = fields[i + 3];

    // Confirm it's a role: grouped role should contain ' - ' or ' & ' or be similar
    const looksLikeGrouped = potentialGrouped &&
      !isNoteField(potentialGrouped) &&
      !WORK_TYPES.has(potentialGrouped);

    if (looksLikeGrouped) {
      role = potentialRole;
      i += 2; // skip role + grouped_role

      if (fields[i] && !isNoteField(fields[i]) && !WORK_TYPES.has(fields[i])) {
        company = fields[i++];
        // skip type (Onsite/Remote/Hybrid)
        if (fields[i] && WORK_TYPES.has(fields[i])) i++;
      }
    }
  }

  return {
    name,
    linkedin,
    role: role || 'Other',
    company,
    month: dateInfo.month,
    sort_key: dateInfo.sort_key,
    is_b2b,
    b2b_logo,
    partner_name,
  };
}

function convert(csvPath) {
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw.split('\n').map(l => l.replace(/\r$/, ''));

  const byMonth = new Map();
  // Track seen entries per month to avoid duplicates (same name+linkedin)
  const seen = new Map();

  for (const line of lines) {
    if (!line.trim() || line.startsWith('Placement;')) continue;

    const entry = parseLine(line);
    if (!entry) continue;

    const key = `${entry.sort_key}::${entry.name}::${entry.linkedin}::${entry.role}::${entry.company}`;
    if (seen.has(key)) continue;
    seen.set(key, true);

    if (!byMonth.has(entry.month)) {
      byMonth.set(entry.month, { month: entry.month, sort_key: entry.sort_key, items: [] });
    }
    const { sort_key, ...item } = entry; // eslint-disable-line no-unused-vars
    byMonth.get(entry.month).items.push({ ...item, sort_key: entry.sort_key });
  }

  // Sort months newest first
  const groups = Array.from(byMonth.values()).sort((a, b) => {
    return b.sort_key.localeCompare(a.sort_key);
  });

  // Add count
  const result = groups.map(g => ({
    month: g.month,
    count: g.items.length,
    items: g.items,
  }));

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
  console.log(`Converted ${lines.length} lines → ${result.length} months, ${result.reduce((s, g) => s + g.count, 0)} entries`);
  result.forEach(g => console.log(`  ${g.month}: ${g.count}`));
}

convert(CSV_PATH);
