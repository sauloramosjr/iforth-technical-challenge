import TLogin from '@/features/login/types/TLogin';
import { generateToken } from '@/lib/auth';
import prisma from '@/lib/prisma';
import validateBody from '@/lib/validations/verifyAttributesRequest';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = (await req.json()) as TLogin;

  const validation = validateBody<TLogin>(body, ['name', 'password']);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: validation.message,
      },
      { status: 400 }
    );
  }

  const usuario = await prisma.user.findUnique({
    where: { name: body.name, password: body.password },
  });

  if (!usuario) {
    return
  }

  const isValidPassword = await bcrypt.compare(body.name, usuario.password);
  if (!isValidPassword) {
    return NextResponse.json(
      { message: 'Credenciais inválidas!' },
      { status: 401 }
    );
  }

  const token = generateToken(usuario.id);

  return NextResponse.json({ ...usuario, token }, { status: 201 });
}
