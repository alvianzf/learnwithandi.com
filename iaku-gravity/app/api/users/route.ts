
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

// Middleware for Admin check (could be abstracted)
async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  if (!token) return null;

  const payload = await verifyJWT(token.value);
  if (!payload || payload.role !== 'ADMIN') return null;
  return payload;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, username, role } = body;

    if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (role !== undefined) updateData.role = role;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: { id: true, username: true, role: true }
    });

    return NextResponse.json(user);

  } catch (e) {
    console.error(e);
    // Handle unique constraint violation for username
    if ((e as any).code === 'P2002') return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
