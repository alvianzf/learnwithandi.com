
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalAlumni = await prisma.alumni.count();

    // Group by sector
    const sectorStats = await prisma.alumni.groupBy({
      by: ['sector'],
      _count: {
        sector: true,
      },
      orderBy: {
        _count: {
          sector: 'desc',
        },
      },
      take: 10,
    });

    // Group by graduation year
    const yearStats = await prisma.alumni.groupBy({
      by: ['graduationYear'],
      _count: {
        graduationYear: true,
      },
      orderBy: {
        graduationYear: 'asc',
      },
    });

    return NextResponse.json({
      total: totalAlumni,
      bySector: sectorStats.map(s => ({ name: s.sector || 'Unknown', count: s._count.sector })),
      byYear: yearStats.map(y => ({ name: y.graduationYear.toString(), count: y._count.graduationYear })),
    });

  } catch (error) {
    console.error('Stats error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
