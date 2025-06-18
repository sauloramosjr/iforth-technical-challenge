// src/services/authService.ts

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function login(email: string, password: string) {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) throw new Error('Invalid credentials');

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) throw new Error('Invalid credentials');

//   const token = generateToken(user.id);
//   return { user, token };
}

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}

export function refreshToken(oldToken: string) {
  const payload = verifyToken(oldToken);
  return generateToken(payload.userId);
}
