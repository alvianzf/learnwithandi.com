
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizePhoneNumber } from '@/lib/utils';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    // Search logic: name, company, sector, city, etc.
    // Redaction logic: first 3 chars of name, last 3 chars of phone.

    // We fetch raw data then redact in memory (safer/easier than DB substrings for now)

    const alumnis = await prisma.alumni.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { company: { contains: query, mode: 'insensitive' } },
          { sector: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
          { graduationYear: { equals: parseInt(query) || undefined } }
        ]
      },
      take: 20, // Limit results
    });

    const redacted = alumnis.map(alum => {
      return {
        ...alum,
        name: alum.name.substring(0, 3) + '...', // Redact name
        whatsapp: '...' + alum.whatsapp.slice(-3), // Redact phone
        // Other fields visible? "It should return cards of results... The name, phone numbers, should be redacted".
        // Assuming other public info is fine.
      };
    });

    return NextResponse.json(redacted);

  } catch (error) {
    console.error('Search error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
