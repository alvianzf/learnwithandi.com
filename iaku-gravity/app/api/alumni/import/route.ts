
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Papa from 'papaparse';
import { normalizePhoneNumber } from '@/lib/utils';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

// ... interfaces ...
interface CSVRow {
  "Nama Lengkap": string;
  "Angkatan\n(19xx, 20xx)"?: string;
  "Perusahaan Tempat Bekerja/Nama Wirausaha"?: string;
  "Jabatan"?: string;
  "Bidang Pekerjaan/Wirausaha\n(Cth: Manufaktur, Telekomunikasi, Kuliner, dll)"?: string;
  "Whatsapp"?: string;
  "Domisili\n(Kota/Kab.)"?: string;
  "Subbidang Pekerjaan/Wirausaha\n(Cth: Cat, Farmasi, Otomotif, Alat Kimia, dll)"?: string;
  "Domisili\n(Provinsi)"?: string;
  "Angkatan"?: string;
  "Perusahaan"?: string;
  "Bidang"?: string;
  "Domisili Kota"?: string;
  "Domisili Provinsi"?: string;
  "Whatsapp Number"?: string;
  [key: string]: string | undefined;
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('auth_token');

    if (!tokenCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyJWT(tokenCookie.value);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const text = await file.text();

    const { data, errors } = Papa.parse<CSVRow>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });

    if (errors.length > 0) {
      console.warn('CSV Parse errors', errors);
    }

    let successCount = 0;
    let failCount = 0;

    for (const row of data) {
      const name = row['Nama Lengkap'];

      const yearKey = Object.keys(row).find(k => k.includes('Angkatan'));
      const yearStr = yearKey ? row[yearKey] : undefined;
      const graduationYear = parseInt(yearStr || '0');

      if (!name || !graduationYear) {
        failCount++;
        continue;
      }

      const waKey = Object.keys(row).find(k => k.toLowerCase().includes('whatsapp'));
      const rawWa = waKey ? row[waKey] : '';
      const whatsapp = rawWa ? normalizePhoneNumber(rawWa) : '';

      if (!whatsapp) {
        failCount++;
        continue;
      }

      const companyKey = Object.keys(row).find(k => k.includes('Perusahaan'));
      const positionKey = Object.keys(row).find(k => k.includes('Jabatan'));
      const sectorKey = Object.keys(row).find(k => k.includes('Bidang') && !k.includes('Subbidang'));
      const subSectorKey = Object.keys(row).find(k => k.includes('Subbidang'));
      const cityKey = Object.keys(row).find(k => k.includes('Domisili') && (k.includes('Kota') || k.includes('Kab')));
      const provinceKey = Object.keys(row).find(k => k.includes('Domisili') && k.includes('Provinsi'));

      try {
        await prisma.alumni.upsert({
          where: { whatsapp },
          update: {
            name,
            graduationYear,
            company: companyKey ? row[companyKey] : undefined,
            position: positionKey ? row[positionKey] : undefined,
            sector: sectorKey ? row[sectorKey] : undefined,
            subSector: subSectorKey ? row[subSectorKey] : undefined,
            city: cityKey ? row[cityKey] : undefined,
            province: provinceKey ? row[provinceKey] : undefined,
          },
          create: {
            name,
            graduationYear,
            whatsapp,
            company: companyKey ? row[companyKey] : undefined,
            position: positionKey ? row[positionKey] : undefined,
            sector: sectorKey ? row[sectorKey] : undefined,
            subSector: subSectorKey ? row[subSectorKey] : undefined,
            city: cityKey ? row[cityKey] : undefined,
            province: provinceKey ? row[provinceKey] : undefined,
          }
        });
        successCount++;
      } catch (e) {
        failCount++;
      }
    }

    return NextResponse.json({ success: true, count: successCount, failed: failCount });

  } catch (error) {
    console.error('Import error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
