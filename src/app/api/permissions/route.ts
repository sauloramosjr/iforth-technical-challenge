import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const token = req.headers.get('x-api-key');
  if (!token) {
    return;
  }
  const validatedToken = verifyToken(token);

  if (!validatedToken) {
    return;
  }

  const permissions = await prisma.userPermission.findMany({
    where: { userId: validatedToken.userId },
  });
  return NextResponse.json(permissions);
}
