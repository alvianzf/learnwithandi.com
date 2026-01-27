
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizePhoneNumber } from '@/lib/utils';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token.value);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, graduationYear, whatsapp, company, position, sector, city } = body;

    if (!name || !graduationYear || !whatsapp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedWa = normalizePhoneNumber(whatsapp);

    const alumni = await prisma.alumni.create({
      data: {
        name,
        graduationYear: parseInt(graduationYear),
        whatsapp: normalizedWa,
        company,
        position,
        sector,
        city
      }
    });

    return NextResponse.json({ success: true, id: alumni.id });

  } catch (error) {
    console.error('Create error', error);
    if ((error as any).code === 'P2002') {
      return NextResponse.json({ error: 'Whatsapp number already registered' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
