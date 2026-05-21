import csv
import json
from collections import defaultdict
from datetime import datetime

PARTNER_LOGOS = {
    "Koda": "/assets/partners/koda-academy.webp",
    "BatamOn Asia": "/assets/partners/batamon.png",
}

def process_placements():
    placements = []
    with open('Data LWA - Placement.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get('Name', '').strip()
            linkedin = row.get('LinkedIn', '').strip()
            role = row.get('Role', '').strip()
            # If Role is empty, use Grouped Role
            if not role:
                role = row.get('Grouped Role', '').strip()
            
            company = row.get('Company', '').strip()
            month_str = row.get('Month', '').strip()
            is_b2b_val = row.get('Is B2B', '').strip()
            
            if not name and not is_b2b_val:
                continue

            # Anonymization
            display_name = name
            is_anonymous = False
            if 'Hide' in name or 'hide' in name or name == 'Anonim' or 'Anonym' in name:
                display_name = "***"
                is_anonymous = True
                linkedin = ""
            
            is_b2b = False
            b2b_logo = ""
            if name == 'B2B' or is_b2b_val:
                is_b2b = True
                if name == 'B2B':
                    display_name = "Corporate Success"
                if is_b2b_val in PARTNER_LOGOS:
                    b2b_logo = PARTNER_LOGOS[is_b2b_val]

            # Date handling
            try:
                # Format is M/D/YYYY (D is always 1 in this CSV)
                dt = datetime.strptime(month_str, '%m/%d/%Y')
                month_name = dt.strftime('%B %Y')
                sort_key = dt.strftime('%Y-%m')
            except:
                month_name = "Other"
                sort_key = "0000-00"

            placements.append({
                "name": display_name,
                "linkedin": linkedin,
                "role": role,
                "company": company,
                "month": month_name,
                "sort_key": sort_key,
                "is_anonymous": is_anonymous,
                "is_b2b": is_b2b,
                "b2b_logo": b2b_logo,
                "partner_name": is_b2b_val
            })

    # Group by month
    grouped = defaultdict(list)
    for p in placements:
        grouped[p['month']].append(p)

    # Sort months descending
    sorted_months = sorted(grouped.keys(), key=lambda m: grouped[m][0]['sort_key'], reverse=True)
    
    final_data = []
    for month in sorted_months:
        final_data.append({
            "month": month,
            "items": grouped[month]
        })

    with open('src/data/placements.json', 'w') as f:
        json.dump(final_data, f, indent=2)

    print(f"Processed {len(placements)} placements into src/data/placements.json")

if __name__ == "__main__":
    process_placements()
