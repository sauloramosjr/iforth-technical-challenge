export const runtime = 'nodejs';
import { handleLogin } from '@/features/login/services/loginServerService';
import TLogin from '@/features/login/types/TLogin';
import { BadRequestError } from '@/lib/exceptions/http/BadRequestError';
import { UnauthorizedError } from '@/lib/exceptions/http/UnauthorizedError';
import validateBody from '@/lib/validations/attributesRequestValidation';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  (await cookies()).delete('auth_token');

  try {
    const body = (await req.json()) as TLogin;

    const validation = validateBody<TLogin>(body, ['name', 'password']);

    if (!validation.success) {
      if (!validation.success) {
        return NextResponse.json(
          { message: validation.message },
          { status: 400 }
        );
      }
    }

    const user = await handleLogin(body.name, body.password);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
