
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const pwd = process.env.ADMIN_PASSWORD || '';
    const hashedPassword = await hashPassword(pwd);

    const admin = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {
        password: hashedPassword
      },
      create: {
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ success: true, message: 'Admin user ensured with secure hash' });

  } catch (error) {
    console.error('Setup error', error);
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
  }
}
