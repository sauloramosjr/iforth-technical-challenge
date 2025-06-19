import { verifyToken } from '@/lib/auth';
import orm from '@/lib/orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const token = req.headers.get('x-api-key');
  if (!token) {
    return;
  }
  const validatedToken = await verifyToken(token);

  if (!validatedToken) {
    return;
  }

  const permissions = await orm.userPermission.findMany({
    where: { userId: validatedToken.userId },
  });
  return NextResponse.json(permissions);
}
