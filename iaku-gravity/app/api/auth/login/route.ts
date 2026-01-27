
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizePhoneNumber } from '@/lib/utils';
import { cookies } from 'next/headers';
import { comparePassword, signJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    // Normalize logic
    let searchUsername = username;
    const isPhone = /^\d+$/.test(username.replace('+', ''));
    if (isPhone || username.startsWith('+')) {
      searchUsername = normalizePhoneNumber(username);
    }

    const user = await prisma.user.findUnique({
      where: { username: searchUsername },
    });

    if (!user) {
      if (username === 'admin') {
        const adminUser = await prisma.user.findUnique({ where: { username: 'admin' } });
        if (adminUser) {
          const isValid = await comparePassword(password, adminUser.password);
          if (isValid) {
            const token = await signJWT({ id: adminUser.id, role: 'ADMIN', username: 'admin' });
            (await cookies()).set('auth_token', token, { httpOnly: true });
            return NextResponse.json({ success: true, role: 'ADMIN' });
          }
        }
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password hash
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign JWT
    const token = await signJWT({ id: user.id, role: user.role, username: user.username });
    (await cookies()).set('auth_token', token, { httpOnly: true });

    return NextResponse.json({ success: true, role: user.role });

  } catch (error) {
    console.error('Login error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
