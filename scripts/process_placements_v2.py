import csv
import json
import io
from collections import defaultdict
from datetime import datetime

PARTNER_LOGOS = {
    "Koda": "/assets/partners/koda-academy.webp",
    "BatamOn Asia": "/assets/partners/batamon.png",
}

NOTE_KEYWORDS = [
    '90 Days Get Jobs', 'Batch', 'Webinar', 'Premium', 'Basic Package',
    'CSR :', 'Event -', 'LIVING', 'Roasting CV', 'Spill Bocoran',
    'Monthly Subscription', 'Exclusive Masterclass', 'How to Work in',
    'NO FULLTIME', 'Dapat Kerja', 'Slow Growth', 'Upgrade to Premium',
    'Tanoto CSR', 'How to Become', 'Main di Upwork',
]

SKIP_NAMES = {
    'B2B', 'hide B2B', 'Hide B2B', 'hide b2b', 'Senior HR', 'Senior PM',
    'Senior Dev', 'CTO', 'RM', 'PE', 'Mrs BI', 'Mr FSW', 'Mr AM',
    'Mas CB', 'Mas FM', 'Mas Hatta', 'Mas A', 'Anonim', 'Anonym',
    'Mas mas yang minta di Hide.', 'Mentor Bahasa Jepang',
}

ANON_PATTERNS = ['hide', 'minta dirahasiakan', 'anonym', 'lupa nama', '***']

def is_linkedin_url(val):
    return val.startswith('http://') or val.startswith('https://') or val.startswith('linkedin.com')

def is_partner(val):
    return val in PARTNER_LOGOS

def is_note(val):
    return any(kw in val for kw in NOTE_KEYWORDS)

def should_skip(name):
    lower = name.lower()
    if name in SKIP_NAMES:
        return True
    if lower.startswith('hide') or lower.startswith('b2b'):
        return True
    if 'minta dirahasiakan' in lower:
        return True
    return False

def should_anonymize(name):
    lower = name.lower()
    for pat in ANON_PATTERNS:
        if pat in lower:
            return True
    # Short coded names like "Mas X" where X is single uppercase letters
    parts = name.split()
    if len(parts) == 2 and parts[0] in ('Mas', 'Mrs', 'Mr') and len(parts[1]) <= 3 and parts[1].isupper():
        return True
    return False

def parse_month(s):
    try:
        dt = datetime.strptime(s.strip(), '%m/%d/%Y')
        return dt.strftime('%B %Y'), dt.strftime('%Y-%m')
    except Exception:
        return None, None

def parse_row_fields(cols_after_name):
    """
    cols_after_name = fields after [Name] column
    Structure: [LinkedIn?] [Partner?] [Role?] [GroupedRole?] [Company?] [Type?] [Note?...]
    LinkedIn and Partner are optional and detected by content.
    """
    rest = [c.strip() for c in cols_after_name if c.strip() and c.strip() != 'No Matching Data']

    linkedin = ''
    partner = ''
    role = ''
    company = ''

    i = 0

    # LinkedIn
    if i < len(rest) and is_linkedin_url(rest[i]):
        linkedin = rest[i]
        i += 1

    # Partner (Is B2B)
    if i < len(rest) and is_partner(rest[i]):
        partner = rest[i]
        i += 1

    # Role — take the next field if it's not a note
    if i < len(rest) and not is_note(rest[i]):
        role = rest[i]
        i += 1

    # Grouped Role — skip it (it's a category, not what we display)
    if i < len(rest) and not is_note(rest[i]):
        i += 1  # grouped role, skip

    # Company
    if i < len(rest) and not is_note(rest[i]):
        company = rest[i]
        i += 1

    # Type (Onsite/Remote/Hybrid) — skip
    if i < len(rest) and rest[i] in ('Onsite', 'Remote', 'Hybrid'):
        i += 1

    # Everything else is note — ignore

    # If role looks like a note, clear it
    if role and is_note(role):
        role = ''

    return linkedin, partner, role, company


def process():
    placements = []

    with open('Data LWA - Placement-2.csv', 'r', encoding='utf-8') as f:
        content = f.read()

    reader = csv.reader(io.StringIO(content), delimiter=';')
    header_seen = False

    for raw_row in reader:
        if not raw_row or all(c.strip() == '' for c in raw_row):
            continue

        row = [c.strip() for c in raw_row]

        # Skip header
        if not header_seen:
            if row[0] == 'Placement':
                header_seen = True
            continue

        # Detect format: does col2 look like a date? → Placement;No;Month;Name;...
        #                does col1 look like a date? → No;Month;Name;...
        month_str = None
        name = None
        rest_start = None

        if len(row) > 2 and '/' in row[2] and len(row[2]) >= 8:
            try:
                datetime.strptime(row[2], '%m/%d/%Y')
                # Full format: Placement;No;Month;Name;...
                month_str = row[2]
                name = row[3] if len(row) > 3 else ''
                rest_start = 4
            except ValueError:
                pass

        if month_str is None and len(row) > 1 and '/' in row[1] and len(row[1]) >= 8:
            try:
                datetime.strptime(row[1], '%m/%d/%Y')
                # Short format: No;Month;Name;...
                month_str = row[1]
                name = row[2] if len(row) > 2 else ''
                rest_start = 3
            except ValueError:
                pass

        if not month_str or not name:
            continue

        month_name, sort_key = parse_month(month_str)
        if not month_name:
            continue

        if should_skip(name):
            continue

        display_name = name
        if should_anonymize(name):
            display_name = '***'
            rest_cols = row[rest_start:] if rest_start else []
            placements.append({
                "name": display_name,
                "linkedin": "",
                "role": "Other",
                "company": "",
                "month": month_name,
                "is_b2b": False,
                "b2b_logo": "",
                "partner_name": "",
                "sort_key": sort_key,
            })
            continue

        rest_cols = row[rest_start:] if rest_start else []
        linkedin, partner, role, company = parse_row_fields(rest_cols)

        is_b2b = bool(partner)
        b2b_logo = PARTNER_LOGOS.get(partner, '')

        placements.append({
            "name": display_name,
            "linkedin": linkedin,
            "role": role if role else "Other",
            "company": company,
            "month": month_name,
            "is_b2b": is_b2b,
            "b2b_logo": b2b_logo,
            "partner_name": partner,
            "sort_key": sort_key,
        })

    # Group and sort by month descending
    grouped = defaultdict(list)
    for p in placements:
        grouped[p['month']].append(p)

    sorted_months = sorted(
        grouped.keys(),
        key=lambda m: grouped[m][0]['sort_key'],
        reverse=True
    )

    final = []
    for month in sorted_months:
        items = grouped[month]
        final.append({
            "month": month,
            "count": len(items),
            "items": items,
        })

    with open('src/data/placements.json', 'w', encoding='utf-8') as f:
        json.dump(final, f, indent=2, ensure_ascii=False)

    total = sum(len(g['items']) for g in final)
    print(f"Processed {total} placements across {len(final)} months")
    for g in final:
        print(f"  {g['month']}: {g['count']}")


if __name__ == '__main__':
    process()
